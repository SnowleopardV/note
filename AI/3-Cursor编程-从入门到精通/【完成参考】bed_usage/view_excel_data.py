import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
from matplotlib.font_manager import FontProperties

# 配置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

# 读取Excel文件
try:
    # 读取Excel文件
    df = pd.read_excel('hospital_bed_usage_data.xlsx')
    
    # 显示字段名称（列名）
    print("=== 数据字段名称 ===")
    for i, column in enumerate(df.columns):
        print(f"{i+1}. {column}")
    
    # 显示前20行数据
    print("\n=== 前20行数据 ===")
    print(df.head(20))
    
    # 计算各医院及科室病床使用率
    print("\n=== 各医院及科室病床使用率 ===")
    
    # 根据实际字段名映射
    hospital_col = 'hospital_name'  # 医院名称
    dept_col = 'department_name'    # 科室名称
    used_beds_col = 'occupied_beds' # 已用病床数
    total_beds_col = 'total_beds'   # 总病床数
    
    # 如果已有occupancy_rate字段，直接使用；否则计算病床使用率
    if 'occupancy_rate' in df.columns:
        # 按医院和科室分组计算平均病床使用率
        bed_usage = df.groupby([hospital_col, dept_col]).agg({
            used_beds_col: 'sum',
            total_beds_col: 'sum',
            'occupancy_rate': 'mean'  # 使用已有的使用率字段计算平均值
        }).reset_index()
        
        # 重新计算每个医院和科室的整体使用率
        bed_usage['计算病床使用率'] = (bed_usage[used_beds_col] / bed_usage[total_beds_col] * 100).round(2)
        
        # 打印结果
        print(bed_usage[[hospital_col, dept_col, 'occupancy_rate', '计算病床使用率']])
    else:
        # 添加病床使用率列
        df['病床使用率'] = (df[used_beds_col] / df[total_beds_col] * 100).round(2)
        
        # 按医院和科室分组计算
        bed_usage = df.groupby([hospital_col, dept_col]).agg({
            used_beds_col: 'sum',
            total_beds_col: 'sum',
            '病床使用率': 'mean'
        }).reset_index()
        
        # 重新计算每个医院和科室的整体使用率
        bed_usage['整体病床使用率'] = (bed_usage[used_beds_col] / bed_usage[total_beds_col] * 100).round(2)
        
        # 打印结果
        print(bed_usage[[hospital_col, dept_col, '整体病床使用率']])
    
    # 按医院分组计算病床使用率
    print("\n=== 各医院病床使用率 ===")
    hospital_usage = df.groupby([hospital_col]).agg({
        used_beds_col: 'sum',
        total_beds_col: 'sum'
    }).reset_index()
    
    hospital_usage['病床使用率'] = (hospital_usage[used_beds_col] / hospital_usage[total_beds_col] * 100).round(2)
    print(hospital_usage[[hospital_col, used_beds_col, total_beds_col, '病床使用率']])
    
    
    # 创建可视化图表目录
    charts_dir = 'charts'
    if not os.path.exists(charts_dir):
        os.makedirs(charts_dir)
    
    print("\n=== 生成可视化图表 ===")
    
    # 1. 各医院病床使用率条形图
    plt.figure(figsize=(12, 8))
    hospital_usage_sorted = hospital_usage.sort_values(by='病床使用率', ascending=False)
    ax = sns.barplot(x='病床使用率', y=hospital_col, data=hospital_usage_sorted, palette='viridis')
    
    # 在条形图上添加数值标签
    for i, v in enumerate(hospital_usage_sorted['病床使用率']):
        ax.text(v + 0.5, i, f"{v}%", va='center')
    
    plt.title('各医院病床使用率', fontsize=16)
    plt.xlabel('使用率 (%)', fontsize=12)
    plt.ylabel('医院', fontsize=12)
    plt.xlim(0, 100)  # 设置x轴范围从0到100
    plt.tight_layout()
    plt.savefig(f"{charts_dir}/各医院病床使用率.png", dpi=300, bbox_inches='tight')
    plt.close()
    
    # 2. 提取科室TOP10最高和最低病床使用率
    # 假设使用的是计算病床使用率字段
    rate_col = '计算病床使用率' if '计算病床使用率' in bed_usage.columns else '整体病床使用率'
    
    # TOP10最高使用率科室
    top_10_dept = bed_usage.sort_values(by=rate_col, ascending=False).head(10)
    plt.figure(figsize=(12, 8))
    ax = sns.barplot(x=rate_col, y=dept_col, hue=hospital_col, data=top_10_dept, palette='viridis')
    plt.title('使用率最高的10个科室', fontsize=16)
    plt.xlabel('使用率 (%)', fontsize=12)
    plt.ylabel('科室', fontsize=12)
    plt.xlim(0, 100)
    plt.legend(title='医院', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.savefig(f"{charts_dir}/TOP10最高使用率科室.png", dpi=300, bbox_inches='tight')
    plt.close()
    
    # TOP10最低使用率科室
    bottom_10_dept = bed_usage.sort_values(by=rate_col, ascending=True).head(10)
    plt.figure(figsize=(12, 8))
    ax = sns.barplot(x=rate_col, y=dept_col, hue=hospital_col, data=bottom_10_dept, palette='viridis')
    plt.title('使用率最低的10个科室', fontsize=16)
    plt.xlabel('使用率 (%)', fontsize=12)
    plt.ylabel('科室', fontsize=12)
    plt.xlim(0, 100)
    plt.legend(title='医院', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.savefig(f"{charts_dir}/TOP10最低使用率科室.png", dpi=300, bbox_inches='tight')
    plt.close()
    
    # 3. 医院和科室的热力图
    # 创建医院和科室交叉表
    pivot_table = pd.pivot_table(bed_usage, values=rate_col, 
                                index=hospital_col, columns=dept_col, 
                                fill_value=0)
    
    # 选择常见科室进行展示（为了保持图表可读性）
    common_depts = ['内科', '外科', '儿科', '妇产科', '骨科', '康复科', '神经科', '心脏科']
    common_depts = [dept for dept in common_depts if dept in pivot_table.columns]
    
    if len(common_depts) > 0:
        plt.figure(figsize=(14, 10))
        pivot_subset = pivot_table[common_depts]
        sns.heatmap(pivot_subset, annot=True, cmap='YlOrRd', fmt='.1f', linewidths=.5)
        plt.title('医院各科室病床使用率热力图 (%)', fontsize=16)
        plt.ylabel('医院', fontsize=12)
        plt.xlabel('科室', fontsize=12)
        plt.tight_layout()
        plt.savefig(f"{charts_dir}/医院科室使用率热力图.png", dpi=300, bbox_inches='tight')
        plt.close()
    
    # 4. 病床数量与使用率关系散点图
    plt.figure(figsize=(12, 8))
    sns.scatterplot(x=total_beds_col, y='病床使用率', hue=hospital_col, 
                   size=used_beds_col, sizes=(100, 1000), 
                   data=hospital_usage, alpha=0.7)
    plt.title('病床数量与使用率关系', fontsize=16)
    plt.xlabel('总病床数', fontsize=12)
    plt.ylabel('使用率 (%)', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.legend(title='医院', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.savefig(f"{charts_dir}/病床数量与使用率关系.png", dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"已生成图表保存在 {charts_dir} 目录中")
    
except Exception as e:
    print(f"读取文件或生成图表时出错: {e}") 