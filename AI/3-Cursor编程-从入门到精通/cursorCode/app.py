from flask import Flask, render_template, jsonify
import pandas as pd
import os
import glob
from datetime import datetime
import json

app = Flask(__name__)

def load_covid_data():
    """加载香港疫情数据"""
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        excel_files = glob.glob(os.path.join(script_dir, "*.xlsx"))
        
        for file in excel_files:
            if "香港" in file and "疫情" in file:
                print(f"加载数据文件: {file}")
                df = pd.read_excel(file)
                df['报告日期'] = pd.to_datetime(df['报告日期'])
                
                # 按日期分组统计
                daily_stats = df.groupby('报告日期').agg({
                    '新增确诊': 'sum',
                    '累计确诊': 'sum',
                    '现存确诊': 'sum',
                    '新增康复': 'sum',
                    '累计康复': 'sum',
                    '新增死亡': 'sum',
                    '累计死亡': 'sum'
                }).reset_index()
                
                # 按地区统计最新数据
                latest_date = df['报告日期'].max()
                latest_data = df[df['报告日期'] == latest_date]
                
                return daily_stats, latest_data, latest_date
                
    except Exception as e:
        print(f"数据加载错误: {e}")
        return None, None, None

@app.route('/')
def index():
    """主页面"""
    return render_template('index.html')

@app.route('/api/daily_stats')
def get_daily_stats():
    """获取每日统计数据"""
    daily_stats, _, _ = load_covid_data()
    
    if daily_stats is not None:
        # 格式化数据为ECharts所需格式
        dates = daily_stats['报告日期'].dt.strftime('%Y-%m-%d').tolist()
        
        data = {
            'dates': dates,
            'new_cases': daily_stats['新增确诊'].tolist(),
            'cumulative_cases': daily_stats['累计确诊'].tolist(),
            'current_cases': daily_stats['现存确诊'].tolist(),
            'new_recovered': daily_stats['新增康复'].tolist(),
            'new_deaths': daily_stats['新增死亡'].tolist()
        }
        
        return jsonify(data)
    else:
        return jsonify({'error': '数据加载失败'})

@app.route('/api/district_stats')
def get_district_stats():
    """获取地区统计数据"""
    _, latest_data, latest_date = load_covid_data()
    
    if latest_data is not None and latest_date is not None:
        # 按地区统计
        district_data = latest_data.groupby('地区名称').agg({
            '新增确诊': 'sum',
            '累计确诊': 'sum',
            '现存确诊': 'sum',
            '人口': 'first'
        }).reset_index()
        
        # 计算发病率
        district_data['发病率'] = (district_data['累计确诊'] / district_data['人口'] * 100000).round(2)
        
        # 格式化数据
        districts = district_data['地区名称'].tolist()
        new_cases = district_data['新增确诊'].tolist()
        cumulative_cases = district_data['累计确诊'].tolist()
        current_cases = district_data['现存确诊'].tolist()
        incidence_rate = district_data['发病率'].tolist()
        
        data = {
            'districts': districts,
            'new_cases': new_cases,
            'cumulative_cases': cumulative_cases,
            'current_cases': current_cases,
            'incidence_rate': incidence_rate,
            'latest_date': latest_date.strftime('%Y-%m-%d')
        }
        
        return jsonify(data)
    else:
        return jsonify({'error': '数据加载失败'})

@app.route('/api/summary_stats')
def get_summary_stats():
    """获取汇总统计数据"""
    daily_stats, _, latest_date = load_covid_data()
    
    if daily_stats is not None and latest_date is not None:
        latest_stats = daily_stats.iloc[-1]
        
        summary = {
            'total_new_cases': int(daily_stats['新增确诊'].sum()),
            'total_cumulative_cases': int(latest_stats['累计确诊']),
            'current_cases': int(latest_stats['现存确诊']),
            'total_recovered': int(latest_stats['累计康复']),
            'total_deaths': int(latest_stats['累计死亡']),
            'latest_date': latest_date.strftime('%Y-%m-%d'),
            'data_days': len(daily_stats)
        }
        
        return jsonify(summary)
    else:
        return jsonify({'error': '数据加载失败'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080) 