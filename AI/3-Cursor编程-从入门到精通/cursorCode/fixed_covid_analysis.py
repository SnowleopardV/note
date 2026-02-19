# -*- coding: utf-8 -*-
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import os
from datetime import datetime
import glob
import platform

def setup_chinese_font():
    """设置中文字体 - 使用与fix_chinese_font.py相同的方法"""
    system = platform.system()
    print(f"操作系统: {system}")
    
    # 方法1: 使用系统字体
    if system == "Darwin":  # macOS
        font_paths = [
            '/System/Library/Fonts/PingFang.ttc',
            '/System/Library/Fonts/STHeiti Light.ttc',
            '/System/Library/Fonts/Arial Unicode MS.ttf'
        ]
    else:
        font_paths = []
    
    # 尝试加载系统字体
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                custom_font = fm.FontProperties(fname=font_path)
                plt.rcParams['font.family'] = custom_font.get_name()
                print(f"✅ 成功加载字体: {font_path}")
                return True
            except:
                continue
    
    # 方法2: 使用matplotlib内置字体
    plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial Unicode MS', 'SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    print("✅ 使用matplotlib内置字体")
    
    return True

def read_data():
    """读取香港疫情数据"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    excel_files = glob.glob(os.path.join(script_dir, "*.xlsx"))
    
    for file in excel_files:
        if "香港" in file and "疫情" in file:
            print(f"找到文件: {file}")
            df = pd.read_excel(file)
            df['报告日期'] = pd.to_datetime(df['报告日期'])
            
            # 按日期分组统计
            daily_stats = df.groupby('报告日期').agg({
                '新增确诊': 'sum',
                '累计确诊': 'sum',
                '现存确诊': 'sum',
                '新增康复': 'sum',
                '累计康复': 'sum',
                '新增死亡': 'sum',
                '累计死亡': 'sum'
            }).reset_index()
            
            print(f"数据统计完成，总天数: {len(daily_stats)}")
            return daily_stats
    
    return None

def create_charts(daily_stats):
    """创建图表 - 使用普通字符串，不使用Unicode前缀"""
    if daily_stats is None:
        return
    
    # 设置中文字体
    setup_chinese_font()
    
    # 创建图表
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    
    # 主标题 - 使用普通字符串
    fig.suptitle('香港疫情数据每日统计图表', fontsize=16, fontweight='bold')
    
    # 1. 每日新增确诊
    axes[0, 0].plot(daily_stats['报告日期'], daily_stats['新增确诊'], 
                   color='red', linewidth=2, marker='o', markersize=3)
    axes[0, 0].set_title('每日新增确诊趋势', fontsize=14, fontweight='bold')
    axes[0, 0].set_xlabel('日期')
    axes[0, 0].set_ylabel('新增确诊数')
    axes[0, 0].grid(True, alpha=0.3)
    axes[0, 0].tick_params(axis='x', rotation=45)
    
    # 2. 每日累计确诊
    axes[0, 1].plot(daily_stats['报告日期'], daily_stats['累计确诊'], 
                   color='blue', linewidth=2, marker='s', markersize=3)
    axes[0, 1].set_title('每日累计确诊趋势', fontsize=14, fontweight='bold')
    axes[0, 1].set_xlabel('日期')
    axes[0, 1].set_ylabel('累计确诊数')
    axes[0, 1].grid(True, alpha=0.3)
    axes[0, 1].tick_params(axis='x', rotation=45)
    
    # 3. 新增确诊和累计确诊对比
    ax1 = axes[1, 0]
    ax2 = ax1.twinx()
    
    line1 = ax1.plot(daily_stats['报告日期'], daily_stats['新增确诊'], 
                    color='red', linewidth=2, label='新增确诊')
    line2 = ax2.plot(daily_stats['报告日期'], daily_stats['累计确诊'], 
                    color='blue', linewidth=2, label='累计确诊')
    
    ax1.set_xlabel('日期')
    ax1.set_ylabel('新增确诊数', color='red')
    ax2.set_ylabel('累计确诊数', color='blue')
    ax1.set_title('新增确诊与累计确诊对比', fontsize=14, fontweight='bold')
    ax1.grid(True, alpha=0.3)
    ax1.tick_params(axis='x', rotation=45)
    
    # 合并图例
    lines = line1 + line2
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper left')
    
    # 4. 新增康复和新增死亡
    axes[1, 1].plot(daily_stats['报告日期'], daily_stats['新增康复'], 
                   color='green', linewidth=2, marker='^', markersize=3, label='新增康复')
    axes[1, 1].plot(daily_stats['报告日期'], daily_stats['新增死亡'], 
                   color='black', linewidth=2, marker='v', markersize=3, label='新增死亡')
    axes[1, 1].set_title('每日新增康复与新增死亡趋势', fontsize=14, fontweight='bold')
    axes[1, 1].set_xlabel('日期')
    axes[1, 1].set_ylabel('人数')
    axes[1, 1].grid(True, alpha=0.3)
    axes[1, 1].legend()
    axes[1, 1].tick_params(axis='x', rotation=45)
    
    # 调整布局
    plt.tight_layout()
    
    # 保存图表
    script_dir = os.path.dirname(os.path.abspath(__file__))
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    chart_file = os.path.join(script_dir, f"香港疫情每日统计图表_修复版_{timestamp}.png")
    plt.savefig(chart_file, dpi=300, bbox_inches='tight')
    print(f"✅ 图表已保存到: {chart_file}")
    
    # 显示图表
    plt.show()
    
    return chart_file

def main():
    """主函数"""
    print("=" * 60)
    print("香港疫情数据每日统计分析（修复版）")
    print("=" * 60)
    
    # 读取数据
    daily_stats = read_data()
    
    if daily_stats is not None:
        # 创建图表
        chart_file = create_charts(daily_stats)
        
        print("\n" + "=" * 60)
        print("✅ 数据分析完成！")
        print("=" * 60)
        if chart_file:
            print(f"📊 图表文件: {chart_file}")
    else:
        print("\n❌ 数据读取失败")

if __name__ == "__main__":
    main() 