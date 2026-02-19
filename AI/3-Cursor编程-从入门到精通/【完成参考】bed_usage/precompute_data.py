#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import os
import pickle
import hashlib
import time
import json
import logging
from datetime import datetime

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# 常量定义
EXCEL_FILE = 'hospital_bed_usage_data.xlsx'
DATA_DIR = 'data_cache'
CACHE_FILE = os.path.join(DATA_DIR, 'data_cache.pkl')
METADATA_FILE = os.path.join(DATA_DIR, 'metadata.json')

# 确保数据目录存在
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

def get_file_md5(filepath):
    """计算文件的MD5哈希值"""
    try:
        md5_hash = hashlib.md5()
        with open(filepath, "rb") as f:
            # 读取文件块并更新哈希
            for byte_block in iter(lambda: f.read(4096), b""):
                md5_hash.update(byte_block)
        return md5_hash.hexdigest()
    except Exception as e:
        logger.error(f"计算MD5异常: {e}")
        return ""

def save_metadata(excel_md5, excel_last_modified):
    """保存元数据到JSON文件"""
    metadata = {
        'excel_md5': excel_md5,
        'excel_last_modified': excel_last_modified,
        'computation_time': time.time(),
        'formatted_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    try:
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        logger.info(f"元数据已保存到 {METADATA_FILE}")
    except Exception as e:
        logger.error(f"保存元数据异常: {e}")

def precompute_all_data():
    """预计算所有所需的聚合数据并保存到文件"""
    start_time = time.time()
    logger.info(f"开始预计算数据...")
    
    try:
        # 获取Excel文件信息
        if not os.path.exists(EXCEL_FILE):
            logger.error(f"Excel文件 {EXCEL_FILE} 不存在!")
            return False
        
        excel_last_modified = os.path.getmtime(EXCEL_FILE)
        excel_md5 = get_file_md5(EXCEL_FILE)
        
        # 读取Excel数据
        logger.info(f"读取Excel文件: {EXCEL_FILE}")
        df = pd.read_excel(EXCEL_FILE)
        logger.info(f"Excel文件读取完成，共 {len(df)} 行数据")
        
        # 检查数据是否符合预期格式
        required_columns = ['hospital_name', 'department_name', 'total_beds', 'occupied_beds', 'available_beds']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            logger.error(f"Excel数据缺少必要列: {missing_columns}")
            return False
        
        # 创建缓存目录
        if not os.path.exists(DATA_DIR):
            os.makedirs(DATA_DIR)
            logger.info(f"创建缓存目录: {DATA_DIR}")
        
        # 创建缓存字典
        cache_data = {}
        
        # 1. 计算医院使用率数据
        logger.info("计算医院使用率数据...")
        hospital_usage = df.groupby(['hospital_name']).agg({
            'occupied_beds': 'sum',
            'total_beds': 'sum',
            'available_beds': 'sum'
        }).reset_index()
        
        hospital_usage['occupancy_rate'] = (hospital_usage['occupied_beds'] / hospital_usage['total_beds'] * 100).round(2)
        hospital_usage = hospital_usage.sort_values(by='occupancy_rate', ascending=False)
        
        cache_data['hospital_usage'] = {
            'hospital': hospital_usage['hospital_name'].tolist(),
            'occupancy_rate': hospital_usage['occupancy_rate'].tolist(),
            'available_beds': hospital_usage['available_beds'].tolist(),
            'total_beds': hospital_usage['total_beds'].tolist()
        }
        
        # 2. 计算科室使用率数据
        logger.info("计算科室使用率数据...")
        dept_usage = df.groupby(['department_name']).agg({
            'occupied_beds': 'sum',
            'total_beds': 'sum',
            'available_beds': 'sum'
        }).reset_index()
        
        dept_usage['occupancy_rate'] = (dept_usage['occupied_beds'] / dept_usage['total_beds'] * 100).round(2)
        main_depts = dept_usage.sort_values(by='total_beds', ascending=False).head(10)
        
        cache_data['department_usage'] = {
            'department': main_depts['department_name'].tolist(),
            'occupancy_rate': main_depts['occupancy_rate'].tolist(),
            'available_beds': main_depts['available_beds'].tolist(),
            'total_beds': main_depts['total_beds'].tolist()
        }
        
        # 3. 计算概览数据
        logger.info("计算概览数据...")
        total_beds = df['total_beds'].sum()
        occupied_beds = df['occupied_beds'].sum()
        available_beds = df['available_beds'].sum()
        overall_occupancy_rate = (occupied_beds / total_beds * 100).round(2)
        
        dept_free_beds = df.groupby('department_name')['available_beds'].sum().reset_index()
        top_free_beds_depts = dept_free_beds.sort_values(by='available_beds', ascending=False).head(5)
        
        cache_data['summary_data'] = {
            'total_beds': int(total_beds),
            'occupied_beds': int(occupied_beds),
            'available_beds': int(available_beds),
            'occupancy_rate': float(overall_occupancy_rate),
            'top_departments': {
                'names': top_free_beds_depts['department_name'].tolist(),
                'values': top_free_beds_depts['available_beds'].tolist()
            }
        }
        
        # 4. 计算热力图数据（最耗时的操作）
        logger.info("计算热力图数据...")
        hospital_dept_usage = df.groupby(['hospital_name', 'department_name']).agg({
            'occupied_beds': 'sum',
            'total_beds': 'sum'
        }).reset_index()
        
        hospital_dept_usage['occupancy_rate'] = (hospital_dept_usage['occupied_beds'] / hospital_dept_usage['total_beds'] * 100).round(2)
        
        top_hospitals = df.groupby('hospital_name')['total_beds'].sum().nlargest(8).index.tolist()
        common_depts = ['内科', '外科', '儿科', '妇产科', '骨科', '康复科', '神经科']
        
        filtered_data = hospital_dept_usage[
            (hospital_dept_usage['hospital_name'].isin(top_hospitals)) & 
            (hospital_dept_usage['department_name'].isin(common_depts))
        ]
        
        heatmap_data = []
        for _, row in filtered_data.iterrows():
            if row['hospital_name'] in top_hospitals and row['department_name'] in common_depts:
                heatmap_data.append([
                    top_hospitals.index(row['hospital_name']), 
                    common_depts.index(row['department_name']), 
                    row['occupancy_rate']
                ])
        
        cache_data['heatmap_data'] = {
            'hospitals': top_hospitals,
            'departments': common_depts,
            'data': heatmap_data
        }
        
        # 5. 添加时间戳和文件信息
        cache_data['timestamp'] = time.time()
        cache_data['excel_last_modified'] = excel_last_modified
        cache_data['excel_md5'] = excel_md5
        
        # 保存缓存数据到文件
        try:
            with open(CACHE_FILE, 'wb') as f:
                pickle.dump(cache_data, f)
            logger.info(f"缓存数据已保存到 {CACHE_FILE}")
        except Exception as e:
            logger.error(f"保存缓存数据异常: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return False
        
        # 保存元数据
        save_metadata(excel_md5, excel_last_modified)
        
        end_time = time.time()
        logger.info(f"数据预计算完成，耗时: {end_time - start_time:.2f} 秒")
        return True
    except Exception as e:
        logger.error(f"预计算过程出错: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return False

if __name__ == "__main__":
    success = precompute_all_data()
    if success:
        print("数据预计算完成，请运行 app.py 查看结果")
    else:
        print("数据预计算失败，请检查日志获取详细信息") 