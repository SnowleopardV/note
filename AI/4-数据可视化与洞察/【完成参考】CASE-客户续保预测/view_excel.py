import pandas as pd

# 读取Excel文件
data = pd.read_excel('policy_data.xlsx')

# 打印列名（字段含义）
print("字段含义（列名）:")
for col in data.columns:
    print(f"- {col}")

print(data.head())