import pandas as pd
import os
from datetime import datetime
import glob

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

def read_hongkong_covid_data():
    """
    读取香港各区疫情数据文件的前20行数据
    """
    
    try:
        print("=" * 60)
        print("香港各区疫情数据分析工具")
        print("=" * 60)
        
        # 查找目标文件
        target_file = find_excel_file()
        print(f"目标文件: {target_file}")
        
        # 检查文件是否存在
        if not os.path.exists(target_file):
            print(f"❌ 文件不存在: {target_file}")
            print(f"当前工作目录: {os.getcwd()}")
            print(f"脚本目录: {os.path.dirname(os.path.abspath(__file__))}")
            print(f"脚本目录内容: {os.listdir(os.path.dirname(os.path.abspath(__file__)))}")
            return None
        
        print(f"✅ 正在读取文件: {target_file}")
        
        # 读取Excel文件
        df = pd.read_excel(target_file)
        
        print(f"📊 数据基本信息:")
        print(f"   总行数: {df.shape[0]}")
        print(f"   总列数: {df.shape[1]}")
        print(f"   列名: {list(df.columns)}")
        
        # 显示前20行数据
        print(f"\n📋 前20行数据:")
        print("=" * 60)
        print(df.head(20))
        
        # 显示数据类型信息
        print(f"\n📈 数据类型信息:")
        print("=" * 60)
        print(df.dtypes)
        
        # 显示基本统计信息
        print(f"\n📊 数值列统计信息:")
        print("=" * 60)
        numeric_columns = df.select_dtypes(include=['number']).columns
        if len(numeric_columns) > 0:
            print(df[numeric_columns].describe())
        else:
            print("没有数值类型的列")
        
        # 显示每列的非空值数量
        print(f"\n📝 每列非空值数量:")
        print("=" * 60)
        print(df.count())
        
        return df
        
    except Exception as e:
        print(f"❌ 读取文件时发生错误: {e}")
        print(f"错误类型: {type(e).__name__}")
        import traceback
        print(f"详细错误信息: {traceback.format_exc()}")
        return None

def save_data_summary(df):
    """
    保存数据摘要到文件
    """
    if df is None:
        return
    
    try:
        # 获取脚本所在目录
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # 创建输出文件名
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = os.path.join(script_dir, f"香港疫情数据摘要_{timestamp}.txt")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("香港各区疫情数据摘要报告\n")
            f.write("=" * 50 + "\n")
            f.write(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"数据文件: 香港各区疫情数据_20250322.xlsx\n")
            f.write(f"总行数: {df.shape[0]}\n")
            f.write(f"总列数: {df.shape[1]}\n\n")
            
            f.write("列名信息:\n")
            f.write("-" * 30 + "\n")
            for i, col in enumerate(df.columns, 1):
                f.write(f"{i}. {col}\n")
            
            f.write(f"\n前20行数据:\n")
            f.write("-" * 30 + "\n")
            f.write(df.head(20).to_string())
            
            f.write(f"\n\n数据类型:\n")
            f.write("-" * 30 + "\n")
            f.write(df.dtypes.to_string())
            
            f.write(f"\n\n每列非空值数量:\n")
            f.write("-" * 30 + "\n")
            f.write(df.count().to_string())
        
        print(f"✅ 数据摘要已保存到: {output_file}")
        
    except Exception as e:
        print(f"❌ 保存摘要时发生错误: {e}")

def main():
    """
    主函数
    """
    print("开始读取香港各区疫情数据...")
    
    # 读取数据
    df = read_hongkong_covid_data()
    
    if df is not None:
        # 保存数据摘要
        save_data_summary(df)
        
        print("\n" + "=" * 60)
        print("✅ 数据处理完成！")
        print("=" * 60)
    else:
        print("\n❌ 数据处理失败")

if __name__ == "__main__":
    main()