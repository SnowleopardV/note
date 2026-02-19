import pandas as pd
import os
from datetime import datetime

def read_excel_data():
    """
    读取员工基本信息表和绩效表数据
    """
    base_path = "3-Cursor编程-从入门到精通/CASE-Excel_merge"
    employee_info_file = os.path.join(base_path, "员工基本信息表.xlsx")
    performance_file = os.path.join(base_path, "员工绩效表.xlsx")
    
    try:
        # 读取员工基本信息表
        print("正在读取员工基本信息表...")
        df_info = pd.read_excel(employee_info_file)
        print(f"员工基本信息表数据形状: {df_info.shape}")
        print("列名:", list(df_info.columns))
        print("前3行数据:")
        print(df_info.head(3))
        
        # 读取员工绩效表
        print("\n正在读取员工绩效表...")
        df_performance = pd.read_excel(performance_file)
        print(f"员工绩效表数据形状: {df_performance.shape}")
        print("列名:", list(df_performance.columns))
        print("前3行数据:")
        print(df_performance.head(3))
        
        return df_info, df_performance
        
    except Exception as e:
        print(f"读取文件时发生错误: {e}")
        return None, None

def filter_q4_performance(df_performance):
    """从绩效表中筛选出2024年第4季度的绩效数据"""
    print("\n正在筛选2024年第4季度绩效数据...")
    
    # 查看绩效表的时间相关列
    time_columns = [col for col in df_performance.columns if any(keyword in col for keyword in ['时间', '日期', '季度', '月份', '年', '月'])]
    print(f"发现时间相关列: {time_columns}")
    
    # 如果没有明确的时间列，尝试从其他列推断
    if not time_columns:
        print("未找到明确的时间列，将使用所有绩效数据")
        return df_performance
    
    # 尝试筛选2024年第4季度的数据
    q4_data = pd.DataFrame()  # 初始化为空DataFrame
    
    for col in time_columns:
        print(f"检查列 '{col}' 的数据:")
        unique_values = df_performance[col].value_counts().head(10)
        print(unique_values)
        
        # 如果列包含季度信息
        if '季度' in col:
            # 更精确地匹配第4季度
            q4_patterns = ['2024.*4', '4.*2024', 'Q4', '第四季度', '4季度', '4季', '4Q', '四季度']
            for pattern in q4_patterns:
                q4_mask = df_performance[col].astype(str).str.contains(pattern, na=False, case=False)
                if q4_mask.any():
                    q4_data = df_performance[q4_mask]
                    print(f"使用模式 '{pattern}' 找到 {q4_data.shape[0]} 条第4季度数据")
                    break
            if not q4_data.empty:
                break
        
        # 如果列包含月份信息，筛选10-12月的数据
        elif '月' in col and '年' not in col:
            month_patterns = ['10|11|12', '十月|十一月|十二月', '10月|11月|12月']
            for pattern in month_patterns:
                month_mask = df_performance[col].astype(str).str.contains(pattern, na=False, case=False)
                if month_mask.any():
                    q4_data = df_performance[month_mask]
                    print(f"使用月份模式 '{pattern}' 找到 {q4_data.shape[0]} 条第4季度月份数据")
                    break
            if not q4_data.empty:
                break
        
        # 如果列包含年份信息，需要进一步筛选
        elif '年' in col:
            year_mask = df_performance[col].astype(str).str.contains('2024', na=False)
            if year_mask.any():
                year_data = df_performance[year_mask]
                print(f"找到 {year_data.shape[0]} 条2024年数据")
                
                # 尝试从年份数据中进一步筛选第4季度
                # 检查是否有其他列可以帮助识别季度
                for other_col in df_performance.columns:
                    if other_col != col and any(keyword in other_col for keyword in ['季度', '月']):
                        print(f"尝试使用列 '{other_col}' 进一步筛选第4季度")
                        other_unique = year_data[other_col].value_counts().head(5)
                        print(f"列 '{other_col}' 的唯一值: {other_unique}")
                        
                        # 如果这个列包含季度信息
                        if '季度' in other_col:
                            q4_patterns = ['4', 'Q4', '第四季度', '4季度', '4季', '4Q', '四季度']
                            for pattern in q4_patterns:
                                q4_mask = year_data[other_col].astype(str).str.contains(pattern, na=False, case=False)
                                if q4_mask.any():
                                    q4_data = year_data[q4_mask]
                                    print(f"使用列 '{other_col}' 和模式 '{pattern}' 找到 {q4_data.shape[0]} 条第4季度数据")
                                    break
                            if not q4_data.empty:
                                break
                        
                        # 如果这个列包含月份信息
                        elif '月' in other_col:
                            month_patterns = ['10|11|12', '十月|十一月|十二月', '10月|11月|12月']
                            for pattern in month_patterns:
                                month_mask = year_data[other_col].astype(str).str.contains(pattern, na=False, case=False)
                                if month_mask.any():
                                    q4_data = year_data[month_mask]
                                    print(f"使用列 '{other_col}' 和月份模式 '{pattern}' 找到 {q4_data.shape[0]} 条第4季度数据")
                                    break
                            if not q4_data.empty:
                                break
                
                # 如果没有找到更精确的筛选，使用年份数据
                if q4_data.empty:
                    print("无法进一步筛选第4季度，将使用2024年所有数据")
                    q4_data = year_data
                break
    
    if q4_data.empty:
        print("未找到明确的第4季度数据，将使用所有绩效数据")
        return df_performance
    
    print(f"最终筛选出 {q4_data.shape[0]} 条第4季度绩效数据")
    print("第4季度数据预览:")
    print(q4_data.head())
    
    return q4_data

def merge_employee_data(df_info, df_performance):
    """合并员工基本信息和绩效数据"""
    print("\n正在合并员工基本信息和绩效数据...")
    
    # 确定员工ID列名
    info_id_column = None
    perf_id_column = None
    
    # 在基本信息表中查找ID列
    for col in ['员工ID', '工号', 'ID', '编号']:
        if col in df_info.columns:
            info_id_column = col
            break
    
    # 在绩效表中查找ID列
    for col in ['员工ID', '工号', 'ID', '编号', '员工编号']:
        if col in df_performance.columns:
            perf_id_column = col
            break
    
    print(f"基本信息表ID列: {info_id_column}")
    print(f"绩效表ID列: {perf_id_column}")
    
    if info_id_column is None:
        print("警告：未找到员工基本信息表的ID列")
        return None
    
    if perf_id_column is None:
        print("警告：未找到绩效表的ID列")
        return None
    
    # 合并数据
    merged_df = pd.merge(df_info, df_performance, 
                        left_on=info_id_column, 
                        right_on=perf_id_column, 
                        how='left',
                        suffixes=('', '_绩效'))
    
    print(f"合并后数据形状: {merged_df.shape}")
    print("合并后的列名:", list(merged_df.columns))
    
    return merged_df

def save_to_excel(merged_df, df_performance):
    """保存合并后的数据到新的Excel文件"""
    # 创建输出目录
    output_dir = "3-Cursor编程-从入门到精通/CASE-Excel_merge/output"
    os.makedirs(output_dir, exist_ok=True)
    
    # 生成带时间戳的文件名
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = os.path.join(output_dir, f"员工信息与绩效合并表_{timestamp}.xlsx")
    
    try:
        # 创建ExcelWriter对象
        with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
            # 保存合并后的完整数据
            merged_df.to_excel(writer, sheet_name='员工信息与绩效合并', index=False)
            
            # 保存原始绩效数据到单独的工作表
            df_performance.to_excel(writer, sheet_name='原始绩效数据', index=False)
            
            # 保存原始员工基本信息（用于对比）
            info_columns = [col for col in merged_df.columns if not col.endswith('_绩效')]
            df_info_only = merged_df[info_columns].drop_duplicates()
            df_info_only.to_excel(writer, sheet_name='原始员工信息', index=False)
        
        print(f"\n✅ 数据已成功保存到: {output_file}")
        print(f"文件包含以下工作表:")
        print("1. 员工信息与绩效合并 - 完整的合并数据")
        print("2. 原始绩效数据 - 原始绩效表数据")
        print("3. 原始员工信息 - 原始基本信息")
        
        return output_file
        
    except Exception as e:
        print(f"保存文件时发生错误: {e}")
        return None

def main():
    """
    主函数
    """
    print("=" * 60)
    print("员工信息与绩效数据合并工具")
    print("=" * 60)
    
    # 1. 读取原始数据
    df_info, df_performance = read_excel_data()
    
    if df_info is None or df_performance is None:
        print("❌ 无法读取Excel文件，程序退出")
        return
    
    # 2. 筛选2024年第4季度绩效数据
    df_q4_performance = filter_q4_performance(df_performance)
    
    # 3. 合并数据
    merged_df = merge_employee_data(df_info, df_q4_performance)
    
    if merged_df is None:
        print("❌ 合并数据失败")
        return
    
    # 4. 保存到新的Excel文件
    output_file = save_to_excel(merged_df, df_q4_performance)
    
    if output_file:
        print("\n" + "=" * 60)
        print("处理完成！")
        print("=" * 60)
        print(f"输出文件: {output_file}")
        print(f"员工基本信息记录数: {len(df_info)}")
        print(f"绩效记录数: {len(df_q4_performance)}")
        print(f"合并后记录数: {len(merged_df)}")
    else:
        print("\n❌ 保存文件失败")

if __name__ == "__main__":
    main() 