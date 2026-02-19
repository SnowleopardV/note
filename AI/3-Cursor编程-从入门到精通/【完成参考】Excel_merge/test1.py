import pandas as pd

# 读取员工基本信息表
basic_info_df = pd.read_excel('员工基本信息表.xlsx')
# 读取员工绩效表
performance_df = pd.read_excel('员工绩效表.xlsx')

# 查看基本信息表的字段和前5行记录
print("员工基本信息表字段：")
print(basic_info_df.columns)
print("\n前5行记录：")
print(basic_info_df.head())

# 查看绩效表的字段和前5行记录
print("\n员工绩效表字段：")
print(performance_df.columns)
print("\n前5行记录：")
print(performance_df.head())

# 筛选出2024年第四季度的绩效数据
q4_2024_perf = performance_df[(performance_df['年度'] == 2024) & (performance_df['季度'] == 4)]

# 合并表格
merged_df = pd.merge(basic_info_df, 
                    q4_2024_perf[['员工ID', '绩效评分']], 
                    on='员工ID', 
                    how='left')

# 重命名绩效评分为Q4_2024
merged_df = merged_df.rename(columns={'绩效评分': 'Q4_2024'})

# 查看合并后的结果
print("\n合并后的表格字段：")
print(merged_df.columns)
print("\n合并后的前5行记录：")
print(merged_df.head())

# 将合并后的结果保存到新文件
merged_df.to_excel('员工信息与绩效合并表.xlsx', index=False)
