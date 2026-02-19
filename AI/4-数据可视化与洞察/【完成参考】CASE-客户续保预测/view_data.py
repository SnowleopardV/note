import pandas as pd
# 读取Excel文件
data = pd.read_excel('policy_data.xlsx')
# 打印前5行数据
print("\n前5行数据:")
for i in range(5):
    print(f"\n行 {i+1}:")
    row = data.iloc[i]
    for col in data.columns:
        print(f"{col}: {row[col]}")
