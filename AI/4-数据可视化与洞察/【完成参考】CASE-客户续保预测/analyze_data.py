import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# 设置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

# 读取Excel文件
data = pd.read_excel('policy_data.xlsx')

# 1. 年龄分布分析
print("1. 年龄分布分析")
print("年龄统计描述：")
print(data['age'].describe())

# 创建年龄分布直方图
plt.figure(figsize=(10, 6))
plt.hist(data['age'], bins=20, edgecolor='black')
plt.title('客户年龄分布')
plt.xlabel('年龄')
plt.ylabel('频数')
plt.savefig('age_distribution.png')
plt.close()

# 2. 性别差异分析
print("\n2. 性别差异分析")
gender_counts = data['gender'].value_counts()
print("性别分布：")
print(gender_counts)
print("\n性别比例：")
print(gender_counts / gender_counts.sum() * 100)

# 创建性别分布饼图
plt.figure(figsize=(8, 8))
plt.pie(gender_counts, labels=gender_counts.index, autopct='%1.1f%%', startangle=90)
plt.title('客户性别分布')
plt.savefig('gender_distribution.png')
plt.close()

# 按性别分析年龄分布
print("\n不同性别的年龄分布：")
print(data.groupby('gender')['age'].describe())

# 创建按性别分组的年龄箱线图
plt.figure(figsize=(10, 6))
sns.boxplot(x='gender', y='age', data=data)
plt.title('不同性别的年龄分布')
plt.xlabel('性别')
plt.ylabel('年龄')
plt.savefig('gender_age_boxplot.png')
plt.close()

# 3. 出生地区与投保所在地区的关联分析
print("\n3. 出生地区与投保所在地区的关联分析")
# 统计出生地区分布
birth_region_counts = data['birth_region'].value_counts().head(10)
print("出生地区分布（前10名）：")
print(birth_region_counts)

# 统计投保所在地区分布
insurance_region_counts = data['insurance_region'].value_counts().head(10)
print("\n投保所在地区分布（前10名）：")
print(insurance_region_counts)

# 创建地区关联热力图数据
region_crosstab = pd.crosstab(data['birth_region'], data['insurance_region'])
# 选择前10个出生地区和前10个投保地区进行可视化
top_birth_regions = birth_region_counts.index.tolist()
top_insurance_regions = insurance_region_counts.index.tolist()
region_crosstab_filtered = region_crosstab.loc[top_birth_regions[:5], top_insurance_regions[:5]]

# 计算同地区投保比例
print("\n同地区投保比例：")
same_region_count = sum(data['birth_region'] == data['insurance_region'])
total_count = len(data)
same_region_percentage = same_region_count / total_count * 100
print(f"同地区投保人数: {same_region_count}")
print(f"总人数: {total_count}")
print(f"同地区投保比例: {same_region_percentage:.2f}%")

# 创建地区关联热力图
plt.figure(figsize=(12, 8))
sns.heatmap(region_crosstab_filtered, annot=True, cmap="YlGnBu", fmt='d')
plt.title('出生地区与投保所在地区关联热力图（前5名地区）')
plt.xlabel('投保所在地区')
plt.ylabel('出生地区')
plt.savefig('region_correlation.png')
plt.close()

print("\n分析完成，图表已保存。") 