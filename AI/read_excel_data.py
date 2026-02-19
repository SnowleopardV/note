import pandas as pd
import os

def read_excel_files():
    """
    读取员工基本信息表和员工绩效表的前5行数据
    """
    
    # 定义文件路径
    base_path = "3-Cursor编程-从入门到精通/CASE-Excel_merge"
    employee_info_file = os.path.join(base_path, "员工基本信息表.xlsx")
    performance_file = os.path.join(base_path, "员工绩效表.xlsx")
    
    try:
        # 读取员工基本信息表
        print("=" * 50)
        print("员工基本信息表 - 前5行数据:")
        print("=" * 50)
        
        if os.path.exists(employee_info_file):
            df_info = pd.read_excel(employee_info_file)
            print("数据形状:", df_info.shape)
            print("\n前5行数据:")
            print(df_info.head())
            print("\n列名:", list(df_info.columns))
        else:
            print(f"文件不存在: {employee_info_file}")
        
        print("\n" + "=" * 50)
        print("员工绩效表 - 前5行数据:")
        print("=" * 50)
        
        # 读取员工绩效表
        if os.path.exists(performance_file):
            df_performance = pd.read_excel(performance_file)
            print("数据形状:", df_performance.shape)
            print("\n前5行数据:")
            print(df_performance.head())
            print("\n列名:", list(df_performance.columns))
        else:
            print(f"文件不存在: {performance_file}")
            
    except Exception as e:
        print(f"读取文件时发生错误: {e}")

def read_excel_with_sheet_info():
    """
    读取Excel文件并显示工作表信息
    """
    
    base_path = "3-Cursor编程-从入门到精通/CASE-Excel_merge"
    employee_info_file = os.path.join(base_path, "员工基本信息表.xlsx")
    performance_file = os.path.join(base_path, "员工绩效表.xlsx")
    
    try:
        # 读取员工基本信息表的所有工作表
        print("=" * 60)
        print("员工基本信息表详细信息:")
        print("=" * 60)
        
        if os.path.exists(employee_info_file):
            excel_file = pd.ExcelFile(employee_info_file)
            print(f"工作表名称: {excel_file.sheet_names}")
            
            for sheet_name in excel_file.sheet_names:
                print(f"\n工作表: {sheet_name}")
                df = pd.read_excel(employee_info_file, sheet_name=sheet_name)
                print(f"数据形状: {df.shape}")
                print("前5行数据:")
                print(df.head())
                print("-" * 40)
        else:
            print(f"文件不存在: {employee_info_file}")
        
        # 读取员工绩效表的所有工作表
        print("\n" + "=" * 60)
        print("员工绩效表详细信息:")
        print("=" * 60)
        
        if os.path.exists(performance_file):
            excel_file = pd.ExcelFile(performance_file)
            print(f"工作表名称: {excel_file.sheet_names}")
            
            for sheet_name in excel_file.sheet_names:
                print(f"\n工作表: {sheet_name}")
                df = pd.read_excel(performance_file, sheet_name=sheet_name)
                print(f"数据形状: {df.shape}")
                print("前5行数据:")
                print(df.head())
                print("-" * 40)
        else:
            print(f"文件不存在: {performance_file}")
            
    except Exception as e:
        print(f"读取文件时发生错误: {e}")

if __name__ == "__main__":
    print("开始读取Excel文件...")
    print()
    
    # 方法1: 简单读取前5行
    read_excel_files()
    
    print("\n" + "=" * 80)
    print("详细工作表信息:")
    print("=" * 80)
    
    # 方法2: 读取所有工作表的前5行
    read_excel_with_sheet_info() 