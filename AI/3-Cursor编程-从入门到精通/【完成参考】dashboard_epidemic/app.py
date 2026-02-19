from flask import Flask, render_template, jsonify, make_response, send_from_directory, request
import pandas as pd
import json
from datetime import datetime
import numpy as np
import time
from functools import wraps
import os

app = Flask(__name__)

# 禁用浏览器缓存的装饰器
def no_cache(view):
    @wraps(view)
    def no_cache_impl(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response
    return no_cache_impl

# 添加静态文件路由
@app.route('/static/<path:filename>')
def serve_static(filename):
    """处理静态文件请求"""
    return send_from_directory('static', filename)

# 数据文件路径
DATA_FILE = "香港各区疫情数据_20250322.xlsx"

# 加载和处理数据
def load_data():
    """加载并处理Excel数据，返回处理后的数据集"""
    try:
        df = pd.read_excel(DATA_FILE)
        df['报告日期'] = pd.to_datetime(df['报告日期'])
        return df
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return None

def prepare_daily_data(df):
    """计算每日新增和累计确诊病例数等统计数据"""
    # 按日期分组并计算每日总新增确诊和累计确诊
    daily_summary = df.groupby('报告日期').agg({
        '新增确诊': 'sum',
        '累计确诊': 'max',
        '新增康复': 'sum',
        '累计康复': 'max',
        '新增死亡': 'sum',
        '累计死亡': 'max'
    }).reset_index()
    
    # 排序数据
    daily_summary = daily_summary.sort_values('报告日期')
    
    # 计算7日滑动平均
    daily_summary['7日移动平均_新增确诊'] = daily_summary['新增确诊'].rolling(window=7, min_periods=1).mean().round(2)
    
    # 计算增长率 (相对于前一天)
    daily_summary['确诊增长率'] = daily_summary['新增确诊'].pct_change().fillna(0) * 100
    
    # 计算当前活跃病例数 (累计确诊 - 累计康复 - 累计死亡)
    daily_summary['活跃病例'] = daily_summary['累计确诊'] - daily_summary['累计康复'] - daily_summary['累计死亡']
    
    return daily_summary

def prepare_region_data(df):
    """计算各地区的疫情数据统计"""
    # 获取最后一天的数据
    last_date = df['报告日期'].max()
    last_day_data = df[df['报告日期'] == last_date]
    
    # 按地区分组统计
    region_summary = last_day_data.groupby('地区名称').agg({
        '新增确诊': 'sum',
        '累计确诊': 'max',
        '现存确诊': 'sum',
        '人口': 'first',
        '风险等级': 'first'
    }).reset_index()
    
    # 计算每10万人口的确诊病例数
    region_summary['每10万人口确诊数'] = (region_summary['累计确诊'] / region_summary['人口']) * 100000
    
    # 按累计确诊排序
    region_summary = region_summary.sort_values('累计确诊', ascending=False)
    
    return region_summary

# 路由设置
@app.route('/')
@no_cache
def index():
    """渲染主页面"""
    try:
        df = load_data()
        if df is not None:
            # 计算关键指标
            daily_data = prepare_daily_data(df)
            last_day_data = daily_data.iloc[-1]
            today_data = {
                'new_cases': int(last_day_data['新增确诊']),
                'total_cases': int(last_day_data['累计确诊']),
                'active_cases': int(last_day_data['活跃病例']),
                'recovered': int(last_day_data['累计康复']),
                'deaths': int(last_day_data['累计死亡']),
                'last_update': last_day_data['报告日期'].strftime('%Y-%m-%d')
            }
            # 添加时间戳防止缓存
            timestamp = int(time.time())
            return render_template('index.html', today_data=today_data, timestamp=timestamp)
        else:
            return "数据加载失败，请检查数据文件是否存在。"
    except Exception as e:
        print(f"渲染页面时出错: {e}")
        return f"发生错误: {str(e)}"

@app.route('/api/daily_data')
@no_cache
def api_daily_data():
    """提供每日新增和累计确诊数据的API接口"""
    try:
        df = load_data()
        if df is not None:
            daily_data = prepare_daily_data(df)
            # 转换数据为JSON格式
            result = {
                'dates': daily_data['报告日期'].dt.strftime('%Y-%m-%d').tolist(),
                'daily_new': daily_data['新增确诊'].tolist(),
                'daily_avg': daily_data['7日移动平均_新增确诊'].tolist(),
                'total_cases': daily_data['累计确诊'].tolist(),
                'growth_rate': daily_data['确诊增长率'].tolist(),
                'active_cases': daily_data['活跃病例'].tolist()
            }
            return jsonify(result)
        else:
            return jsonify({'error': '数据加载失败'})
    except Exception as e:
        print(f"获取每日数据时出错: {e}")
        return jsonify({'error': str(e)})

@app.route('/api/region_data')
@no_cache
def api_region_data():
    """提供各地区疫情数据的API接口"""
    try:
        df = load_data()
        if df is not None:
            region_data = prepare_region_data(df)
            # 转换数据为JSON格式
            result = {
                'regions': region_data['地区名称'].tolist(),
                'total_cases': region_data['累计确诊'].tolist(),
                'new_cases': region_data['新增确诊'].tolist(),
                'active_cases': region_data['现存确诊'].tolist(),
                'per_100k': region_data['每10万人口确诊数'].tolist(),
                'risk_levels': region_data['风险等级'].tolist(),
                'population': region_data['人口'].tolist()
            }
            return jsonify(result)
        else:
            return jsonify({'error': '数据加载失败'})
    except Exception as e:
        print(f"获取地区数据时出错: {e}")
        return jsonify({'error': str(e)})

@app.route('/api/summary')
@no_cache
def api_summary():
    """提供疫情数据总结的API接口"""
    try:
        df = load_data()
        if df is not None:
            daily_data = prepare_daily_data(df)
            last_day = daily_data.iloc[-1]
            max_daily = daily_data['新增确诊'].max()
            max_daily_date = daily_data.loc[daily_data['新增确诊'].idxmax(), '报告日期'].strftime('%Y-%m-%d')
            
            # 计算风险等级统计
            region_data = prepare_region_data(df)
            risk_counts = region_data['风险等级'].value_counts().to_dict()
            
            result = {
                'last_update': last_day['报告日期'].strftime('%Y-%m-%d'),
                'total_cases': int(last_day['累计确诊']),
                'total_recovered': int(last_day['累计康复']),
                'total_deaths': int(last_day['累计死亡']),
                'active_cases': int(last_day['活跃病例']),
                'max_daily_cases': int(max_daily),
                'max_daily_date': max_daily_date,
                'risk_levels': risk_counts
            }
            return jsonify(result)
        else:
            return jsonify({'error': '数据加载失败'})
    except Exception as e:
        print(f"获取总结数据时出错: {e}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # 禁用静态文件缓存
    app.run(debug=True, host='0.0.0.0', port=5000) 