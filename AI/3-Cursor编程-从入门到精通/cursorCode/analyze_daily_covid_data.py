import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
from datetime import datetime
import glob
import platform

# 根据操作系统设置中文字体
def setup_chinese_font():
    """设置中文字体"""
    system = platform.system()
    
    if system == "Darwin":  # macOS
        plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'PingFang HK', 'Hiragino Sans GB']
    elif system == "Windows":
        plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun']
    else:  # Linux
        plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'WenQuanYi Micro Hei', 'Noto Sans CJK SC']
    
    plt.rcParams['axes.unicode_minus'] = False
    
    # 设置字体大小
    plt.rcParams['font.size'] = 10
    plt.rcParams['axes.titlesize'] = 12
    plt.rcParams['axes.labelsize'] = 10
    plt.rcParams['xtick.labelsize'] = 9
    plt.rcParams['ytick.labelsize'] = 9
    plt.rcParams['legend.fontsize'] = 9

# 设置中文字体
setup_chinese_font()

def find_excel_file():
    """
    查找香港疫情数据Excel文件
    """
    # 获取脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"脚本所在目录: {script_dir}")
    
    # 在脚本所在目录查找Excel文件
    excel_files = glob.glob(os.path.join(script_dir, "*.xlsx"))
    print(f"脚本目录下的Excel文件: {excel_files}")
    
    # 查找包含"香港"和"疫情"的文件
    target_file = None
    for file in excel_files:
        if "香港" in file and "疫情" in file:
            target_file = file
            break
    
    if target_file is None:
        # 如果没找到，尝试直接使用文件名
        target_file = os.path.join(script_dir, "香港各区疫情数据_20250322.xlsx")
    
    return target_file

def read_and_process_data():
    """
    读取并处理香港疫情数据
    """
    try:
        print("=" * 60)
        print("香港疫情数据按天统计分析")
        print("=" * 60)
        
        # 查找目标文件
        target_file = find_excel_file()
        print(f"目标文件: {target_file}")
        
        # 检查文件是否存在
        if not os.path.exists(target_file):
            print(f"❌ 文件不存在: {target_file}")
            return None
        
        print(f"✅ 正在读取文件: {target_file}")
        
        # 读取Excel文件
        df = pd.read_excel(target_file)
        
        print(f"📊 原始数据信息:")
        print(f"   总行数: {df.shape[0]}")
        print(f"   总列数: {df.shape[1]}")
        print(f"   列名: {list(df.columns)}")
        
        # 转换报告日期为日期类型
        df['报告日期'] = pd.to_datetime(df['报告日期'])
        
        # 按日期分组，计算每日汇总数据
        daily_stats = df.groupby('报告日期').agg({
            '新增确诊': 'sum',
            '累计确诊': 'sum',
            '现存确诊': 'sum',
            '新增康复': 'sum',
            '累计康复': 'sum',
            '新增死亡': 'sum',
            '累计死亡': 'sum'
        }).reset_index()
        
        print(f"\n📈 按天统计后数据信息:")
        print(f"   总天数: {len(daily_stats)}")
        print(f"   日期范围: {daily_stats['报告日期'].min()} 到 {daily_stats['报告日期'].max()}")
        
        # 显示前10天的数据
        print(f"\n📋 前10天统计数据:")
        print("=" * 60)
        print(daily_stats.head(10))
        
        return daily_stats
        
    except Exception as e:
        print(f"❌ 读取文件时发生错误: {e}")
        print(f"错误类型: {type(e).__name__}")
        import traceback
        print(f"详细错误信息: {traceback.format_exc()}")
        return None

def create_daily_charts(daily_stats):
    """
    创建每日疫情数据折线图
    """
    if daily_stats is None:
        return
    
    try:
        print("\n🎨 正在生成折线图...")
        
        # 重新设置字体
        setup_chinese_font()
        
        # 设置图表样式
        plt.style.use('default')  # 使用默认样式避免字体冲突
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle('香港疫情数据按天统计图表', fontsize=16, fontweight='bold')
        
        # 1. 每日新增确诊折线图
        axes[0, 0].plot(daily_stats['报告日期'], daily_stats['新增确诊'], 
                       color='red', linewidth=2, marker='o', markersize=4)
        axes[0, 0].set_title('每日新增确诊趋势', fontsize=14, fontweight='bold')
        axes[0, 0].set_xlabel('日期')
        axes[0, 0].set_ylabel('新增确诊数')
        axes[0, 0].grid(True, alpha=0.3)
        axes[0, 0].tick_params(axis='x', rotation=45)
        
        # 2. 每日累计确诊折线图
        axes[0, 1].plot(daily_stats['报告日期'], daily_stats['累计确诊'], 
                       color='blue', linewidth=2, marker='s', markersize=4)
        axes[0, 1].set_title('每日累计确诊趋势', fontsize=14, fontweight='bold')
        axes[0, 1].set_xlabel('日期')
        axes[0, 1].set_ylabel('累计确诊数')
        axes[0, 1].grid(True, alpha=0.3)
        axes[0, 1].tick_params(axis='x', rotation=45)
        
        # 3. 新增确诊和累计确诊对比图
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
        
        # 4. 每日新增康复和新增死亡对比图
        axes[1, 1].plot(daily_stats['报告日期'], daily_stats['新增康复'], 
                       color='green', linewidth=2, marker='^', markersize=4, label='新增康复')
        axes[1, 1].plot(daily_stats['报告日期'], daily_stats['新增死亡'], 
                       color='black', linewidth=2, marker='v', markersize=4, label='新增死亡')
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
        chart_file = os.path.join(script_dir, f"香港疫情每日统计图表_{timestamp}.png")
        plt.savefig(chart_file, dpi=300, bbox_inches='tight')
        print(f"✅ 图表已保存到: {chart_file}")
        
        # 显示图表
        plt.show()
        
        return chart_file
        
    except Exception as e:
        print(f"❌ 生成图表时发生错误: {e}")
        print(f"错误类型: {type(e).__name__}")
        import traceback
        print(f"详细错误信息: {traceback.format_exc()}")
        return None

def create_summary_report(daily_stats):
    """
    创建数据摘要报告
    """
    if daily_stats is None:
        return
    
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = os.path.join(script_dir, f"香港疫情每日统计报告_{timestamp}.txt")
        
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("香港疫情数据每日统计报告\n")
            f.write("=" * 50 + "\n")
            f.write(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"数据文件: 香港各区疫情数据_20250322.xlsx\n")
            f.write(f"统计天数: {len(daily_stats)}\n")
            f.write(f"日期范围: {daily_stats['报告日期'].min()} 到 {daily_stats['报告日期'].max()}\n\n")
            
            # 统计信息
            f.write("总体统计信息:\n")
            f.write("-" * 30 + "\n")
            f.write(f"总新增确诊: {daily_stats['新增确诊'].sum():,}\n")
            f.write(f"总累计确诊: {daily_stats['累计确诊'].max():,}\n")
            f.write(f"总新增康复: {daily_stats['新增康复'].sum():,}\n")
            f.write(f"总新增死亡: {daily_stats['新增死亡'].sum():,}\n")
            f.write(f"最高单日新增: {daily_stats['新增确诊'].max():,}\n")
            f.write(f"平均每日新增: {daily_stats['新增确诊'].mean():.1f}\n\n")
            
            # 前20天数据
            f.write("前20天详细数据:\n")
            f.write("-" * 30 + "\n")
            f.write(daily_stats.head(20).to_string(index=False))
            
            # 后20天数据
            f.write(f"\n\n后20天详细数据:\n")
            f.write("-" * 30 + "\n")
            f.write(daily_stats.tail(20).to_string(index=False))
        
        print(f"✅ 统计报告已保存到: {report_file}")
        return report_file
        
    except Exception as e:
        print(f"❌ 保存报告时发生错误: {e}")
        return None

def main():
    """
    主函数
    """
    print("开始分析香港疫情每日数据...")
    
    # 读取并处理数据
    daily_stats = read_and_process_data()
    
    if daily_stats is not None:
        # 创建图表
        chart_file = create_daily_charts(daily_stats)
        
        # 创建报告
        report_file = create_summary_report(daily_stats)
        
        print("\n" + "=" * 60)
        print("✅ 数据分析完成！")
        print("=" * 60)
        if chart_file:
            print(f"📊 图表文件: {chart_file}")
        if report_file:
            print(f"📄 报告文件: {report_file}")
    else:
        print("\n❌ 数据分析失败")

if __name__ == "__main__":
    main() 