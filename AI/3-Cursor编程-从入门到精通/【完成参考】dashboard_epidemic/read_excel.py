import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np
import matplotlib as mpl

# 设置全局字体，解决中文显示问题
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun', 'Arial Unicode MS']  # 优先使用的字体列表
plt.rcParams['axes.unicode_minus'] = False  # 正确显示负号

def read_excel_data(file_path):
    """
    读取Excel文件，显示字段和前20行数据
    
    Args:
        file_path: Excel文件路径
    """
    try:
        # 读取Excel文件
        df = pd.read_excel(file_path)
        
        # 显示数据基本信息
        print("=" * 80)
        print(f"文件名: {file_path}")
        print(f"总行数: {len(df)}")
        print("=" * 80)
        
        # 显示字段信息
        print("\n字段列表:")
        for i, column in enumerate(df.columns):
            print(f"{i+1}. {column}")
        
        # 设置显示选项，以便更好地显示数据
        pd.set_option('display.max_columns', None)  # 显示所有列
        pd.set_option('display.width', 1000)  # 设置显示宽度
        pd.set_option('display.unicode.east_asian_width', True)  # 处理中文宽度
        pd.set_option('display.max_colwidth', 30)  # 列宽度限制
        
        # 显示前20行数据
        print("\n前20行数据:")
        print(df.head(20))
        
        return df
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return None

def calculate_daily_cases(df):
    """
    计算每日新增和累计确诊病例数
    
    Args:
        df: 包含疫情数据的DataFrame
    """
    # 确保报告日期列为日期类型
    df['报告日期'] = pd.to_datetime(df['报告日期'])
    
    # 按日期分组并计算每日总新增确诊和累计确诊
    daily_summary = df.groupby('报告日期').agg({
        '新增确诊': 'sum',
        '累计确诊': 'max',  # 使用最大值，因为累计确诊在同一天的所有地区应该是相同的或递增的
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
    
    # 显示计算结果
    print("\n" + "=" * 80)
    print("每日新增与累计确诊数据统计")
    print("=" * 80)
    print(daily_summary)
    
    # 显示基本统计数据
    print("\n" + "=" * 80)
    print("基本统计数据")
    print("=" * 80)
    print(f"总确诊病例数: {daily_summary['累计确诊'].max()}")
    print(f"总康复病例数: {daily_summary['累计康复'].max()}")
    print(f"总死亡病例数: {daily_summary['累计死亡'].max()}")
    print(f"当前活跃病例数: {daily_summary['活跃病例'].iloc[-1]}")
    print(f"单日最高确诊病例数: {daily_summary['新增确诊'].max()} (日期: {daily_summary.loc[daily_summary['新增确诊'].idxmax(), '报告日期'].strftime('%Y-%m-%d')})")
    print(f"单日最高康复病例数: {daily_summary['新增康复'].max()} (日期: {daily_summary.loc[daily_summary['新增康复'].idxmax(), '报告日期'].strftime('%Y-%m-%d')})")
    print(f"单日最高死亡病例数: {daily_summary['新增死亡'].max()} (日期: {daily_summary.loc[daily_summary['新增死亡'].idxmax(), '报告日期'].strftime('%Y-%m-%d')})")
    
    return daily_summary

def plot_daily_cases(daily_data):
    """
    绘制每日新增和累计确诊病例数曲线图
    
    Args:
        daily_data: 包含每日确诊数据的DataFrame
    """
    plt.figure(figsize=(15, 8))
    
    # 创建两个Y轴
    ax1 = plt.gca()
    ax2 = ax1.twinx()
    
    # 绘制每日新增确诊曲线
    ax1.bar(daily_data['报告日期'], daily_data['新增确诊'], alpha=0.7, color='skyblue', label='每日新增确诊')
    ax1.plot(daily_data['报告日期'], daily_data['7日移动平均_新增确诊'], color='blue', linewidth=2, label='7日移动平均')
    ax1.set_ylabel('每日新增确诊数', fontsize=12)
    ax1.grid(True, linestyle='--', alpha=0.5)
    
    # 绘制累计确诊曲线
    ax2.plot(daily_data['报告日期'], daily_data['累计确诊'], color='red', linewidth=2, label='累计确诊')
    ax2.set_ylabel('累计确诊数', fontsize=12)
    
    # 设置图表标题和标签
    plt.title('香港疫情每日新增与累计确诊数据', fontsize=16)
    plt.xlabel('日期', fontsize=12)
    
    # 添加图例
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left')
    
    # 优化日期显示
    plt.xticks(rotation=45)
    
    # 自动调整布局
    plt.tight_layout()
    
    # 保存图表
    plt.savefig('每日确诊数据统计图.png', dpi=300)
    print("\n确诊数据图表已保存为: 每日确诊数据统计图.png")
    
    # 绘制活跃病例图
    plt.figure(figsize=(15, 8))
    plt.plot(daily_data['报告日期'], daily_data['活跃病例'], color='orange', linewidth=2)
    plt.title('香港疫情活跃病例数据', fontsize=16)
    plt.xlabel('日期', fontsize=12)
    plt.ylabel('活跃病例数', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('活跃病例数据统计图.png', dpi=300)
    print("活跃病例图表已保存为: 活跃病例数据统计图.png")

def plot_region_cases(df):
    """
    绘制各地区确诊病例数据对比图
    
    Args:
        df: 包含疫情数据的DataFrame
    """
    # 确保报告日期列为日期类型
    df['报告日期'] = pd.to_datetime(df['报告日期'])
    
    # 获取最后一天的数据
    last_date = df['报告日期'].max()
    last_day_data = df[df['报告日期'] == last_date]
    
    # 按地区分组统计累计确诊
    region_summary = last_day_data.groupby('地区名称').agg({
        '累计确诊': 'max',
        '人口': 'first'  # 每个地区的人口应该是相同的
    }).reset_index()
    
    # 计算每10万人口的确诊病例数
    region_summary['每10万人口确诊数'] = (region_summary['累计确诊'] / region_summary['人口']) * 100000
    
    # 按累计确诊排序
    region_summary = region_summary.sort_values('累计确诊', ascending=False)
    
    # 绘制地区累计确诊对比图
    plt.figure(figsize=(14, 10))
    bars = plt.barh(region_summary['地区名称'], region_summary['累计确诊'], color='steelblue')
    plt.title('香港各地区累计确诊病例对比', fontsize=16)
    plt.xlabel('累计确诊病例数', fontsize=12)
    plt.ylabel('地区', fontsize=12)
    plt.grid(axis='x', linestyle='--', alpha=0.7)
    
    # 在条形图上显示数字
    for bar in bars:
        width = bar.get_width()
        plt.text(width + 5, bar.get_y() + bar.get_height()/2, f'{int(width):,}', 
                 va='center', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('各地区确诊病例对比图.png', dpi=300)
    print("\n地区对比图表已保存为: 各地区确诊病例对比图.png")

if __name__ == "__main__":
    # Excel文件路径
    file_path = "香港各区疫情数据_20250322.xlsx"
    
    # 读取并显示数据
    df = read_excel_data(file_path)
    
    if df is not None:
        # 计算每日新增和累计确诊数据
        daily_cases = calculate_daily_cases(df)
        
        # 绘制时间趋势图表
        plot_daily_cases(daily_cases)
        
        # 绘制地区对比图表
        plot_region_cases(df) 