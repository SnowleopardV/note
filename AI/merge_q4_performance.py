import pandas as pd
import os
from datetime import datetime

def read_excel_data():
    """读取员工基本信息表和绩效表数据"""
    base_path = "3-Cursor编程-从入门到精通/CASE-Excel_merge"
    employee_info_file = os.path.join(base_path, "员工基本信息表.xlsx")
    performance_file = os.path.join(base_path, "员工绩效表.xlsx")
    
    try:
        # 读取员工基本信息表
        print("正在读取员工基本信息表...")
        df_info = pd.read_excel(employee_info_file)
        print(f"员工基本信息表数据形状: {df_info.shape}")
        print("列名:", list(df_info.columns))
        
        # 读取员工绩效表
        print("\n正在读取员工绩效表...")
        df_performance = pd.read_excel(performance_file)
        print(f"员工绩效表数据形状: {df_performance.shape}")
        print("列名:", list(df_performance.columns))
        
        return df_info, df_performance
        
    except Exception as e:
        print(f"读取文件时发生错误: {e}")
        return None, None

def filter_q4_performance_simple(df_performance):
    """简单筛选第4季度绩效数据"""
    print("\n正在筛选第4季度绩效数据...")
    
    # 查找可能包含季度信息的列
    quarter_columns = [col for col in df_performance.columns if '季度' in col]
    time_columns = [col for col in df_performance.columns if any(keyword in col for keyword in ['时间', '日期', '月份', '年', '月'])]
    
    print(f"季度相关列: {quarter_columns}")
    print(f"时间相关列: {time_columns}")
    
    # 显示所有列的唯一值，帮助用户识别
    print("\n各列的唯一值:")
    for col in df_performance.columns:
        unique_vals = df_performance[col].value_counts().head(5)
        print(f"{col}: {list(unique_vals.index)}")
    
    # 尝试自动筛选第4季度
    q4_data = pd.DataFrame()
    
    # 方法1: 直接查找包含"4"或"Q4"的季度列
    for col in quarter_columns:
        q4_mask = df_performance[col].astype(str).str.contains('4|Q4|第四季度|四季度', na=False, case=False)
        if q4_mask.any():
            q4_data = df_performance[q4_mask]
            print(f"在列 '{col}' 中找到 {len(q4_data)} 条第4季度数据")
            break
    
    # 方法2: 如果季度列没找到，尝试月份列（10-12月）
    if q4_data.empty:
        for col in time_columns:
            if '月' in col:
                month_mask = df_performance[col].astype(str).str.contains('10|11|12|十月|十一月|十二月', na=False, case=False)
                if month_mask.any():
                    q4_data = df_performance[month_mask]
                    print(f"在列 '{col}' 中找到 {len(q4_data)} 条第4季度月份数据")
                    break
    
    # 方法3: 如果还是没找到，让用户手动选择
    if q4_data.empty:
        print("\n⚠️  无法自动识别第4季度数据")
        print("请手动指定筛选条件:")
        
        # 显示所有列供用户选择
        for i, col in enumerate(df_performance.columns):
            print(f"{i+1}. {col}")
        
        try:
            col_choice = input("\n请选择包含季度信息的列号 (或按回车使用所有数据): ").strip()
            if col_choice:
                col_idx = int(col_choice) - 1
                if 0 <= col_idx < len(df_performance.columns):
                    selected_col = df_performance.columns[col_idx]
                    print(f"选择的列: {selected_col}")
                    
                    # 显示该列的唯一值
                    unique_vals = df_performance[selected_col].value_counts()
                    print(f"该列的唯一值: {list(unique_vals.index)}")
                    
                    # 让用户输入筛选条件
                    filter_value = input("请输入第4季度的值 (如: 4, Q4, 第四季度等): ").strip()
                    if filter_value:
                        q4_mask = df_performance[selected_col].astype(str).str.contains(filter_value, na=False, case=False)
                        if q4_mask.any():
                            q4_data = df_performance[q4_mask]
                            print(f"找到 {len(q4_data)} 条匹配数据")
                        else:
                            print("未找到匹配数据")
        except (ValueError, IndexError):
            print("输入无效，将使用所有绩效数据")
    
    if q4_data.empty:
        print("将使用所有绩效数据")
        return df_performance
    
    print(f"\n✅ 成功筛选出 {len(q4_data)} 条第4季度绩效数据")
    return q4_data

def merge_and_save(df_info, df_q4_performance):
    """合并数据并保存"""
    print("\n正在合并数据...")
    
    # 查找ID列
    info_id_col = None
    perf_id_col = None
    
    for col in ['员工ID', '工号', 'ID', '编号']:
        if col in df_info.columns:
            info_id_col = col
            break
    
    for col in ['员工ID', '工号', 'ID', '编号', '员工编号']:
        if col in df_q4_performance.columns:
            perf_id_col = col
            break
    
    print(f"基本信息表ID列: {info_id_col}")
    print(f"绩效表ID列: {perf_id_col}")
    
    if not info_id_col or not perf_id_col:
        print("❌ 无法找到匹配的ID列")
        return None
    
    # 合并数据
    merged_df = pd.merge(df_info, df_q4_performance, 
                        left_on=info_id_col, 
                        right_on=perf_id_col, 
                        how='left',
                        suffixes=('', '_绩效'))
    
    print(f"合并后数据形状: {merged_df.shape}")
    
    # 保存到Excel
    output_dir = "3-Cursor编程-从入门到精通/CASE-Excel_merge/output"
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = os.path.join(output_dir, f"员工信息与Q4绩效合并表_{timestamp}.xlsx")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        merged_df.to_excel(writer, sheet_name='员工信息与Q4绩效合并', index=False)
        df_q4_performance.to_excel(writer, sheet_name='Q4绩效数据', index=False)
    
    print(f"✅ 数据已保存到: {output_file}")
    return output_file

def main():
    """主函数"""
    print("=" * 50)
    print("员工信息与第4季度绩效数据合并工具")
    print("=" * 50)
    
    # 读取数据
    df_info, df_performance = read_excel_data()
    if df_info is None or df_performance is None:
        return
    
    # 筛选第4季度数据
    df_q4_performance = filter_q4_performance_simple(df_performance)
    
    # 合并并保存
    output_file = merge_and_save(df_info, df_q4_performance)
    
    if output_file:
        print(f"\n处理完成！")
        print(f"员工基本信息记录数: {len(df_info)}")
        print(f"第4季度绩效记录数: {len(df_q4_performance)}")
        print(f"输出文件: {output_file}")
    else:
        print("❌ 合并失败")

if __name__ == "__main__":
    main() 