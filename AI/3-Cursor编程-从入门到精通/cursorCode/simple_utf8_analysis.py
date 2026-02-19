# -*- coding: utf-8 -*-
import pandas as pd
import matplotlib.pyplot as plt
import os
from datetime import datetime
import glob

def setup_utf8():
    """设置UTF-8编码"""
    plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial Unicode MS']
    plt.rcParams['axes.unicode_minus'] = False

def read_data():
    """读取数据"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    excel_files = glob.glob(os.path.join(script_dir, "*.xlsx"))
    
    for file in excel_files:
        if "香港" in file and "疫情" in file:
            df = pd.read_excel(file)
            df['报告日期'] = pd.to_datetime(df['报告日期'])
            daily_stats = df.groupby('报告日期').agg({
                '新增确诊': 'sum',
                '累计确诊': 'sum'
            }).reset_index()
            return daily_stats
    return None

def create_chart(daily_stats):
    """创建图表"""
    setup_utf8()
    
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))
    
    # 新增确诊
    ax1.plot(daily_stats['报告日期'], daily_stats['新增确诊'], 
             color='red', linewidth=2, marker='o', markersize=3)
    ax1.set_title(u'每日新增确诊趋势', fontsize=14)
    ax1.set_xlabel(u'日期')
    ax1.set_ylabel(u'新增确诊数')
    ax1.grid(True, alpha=0.3)
    
    # 累计确诊
    ax2.plot(daily_stats['报告日期'], daily_stats['累计确诊'], 
             color='blue', linewidth=2, marker='s', markersize=3)
    ax2.set_title(u'每日累计确诊趋势', fontsize=14)
    ax2.set_xlabel(u'日期')
    ax2.set_ylabel(u'累计确诊数')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # 保存
    script_dir = os.path.dirname(os.path.abspath(__file__))
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    chart_file = os.path.join(script_dir, f"香港疫情图表_UTF8_{timestamp}.png")
    plt.savefig(chart_file, dpi=300, bbox_inches='tight')
    print(f"✅ 图表已保存: {chart_file}")
    
    plt.show()

def main():
    """主函数"""
    print("开始分析香港疫情数据...")
    daily_stats = read_data()
    
    if daily_stats is not None:
        create_chart(daily_stats)
        print("✅ 分析完成")
    else:
        print("❌ 数据读取失败")

if __name__ == "__main__":
    main() 