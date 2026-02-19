#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import sys
import os

def install_requirements():
    """安装依赖包"""
    print("=" * 50)
    print("安装Flask应用依赖包")
    print("=" * 50)
    
    try:
        # 使用清华源安装依赖
        cmd = [
            sys.executable, "-m", "pip", "install", 
            "-r", "requirements_flask.txt",
            "-i", "https://pypi.tuna.tsinghua.edu.cn/simple",
            "--trusted-host", "pypi.tuna.tsinghua.edu.cn"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ 依赖包安装成功")
            return True
        else:
            print(f"❌ 依赖包安装失败: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ 安装过程中发生错误: {e}")
        return False

def check_data_file():
    """检查数据文件是否存在"""
    print("🔍 检查数据文件...")
    
    # 获取当前脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"📁 当前目录: {script_dir}")
    
    # 列出所有Excel文件
    excel_files = [f for f in os.listdir(script_dir) if f.endswith('.xlsx')]
    print(f"📄 找到Excel文件: {excel_files}")
    
    # 查找香港疫情数据文件
    covid_files = [f for f in excel_files if '香港' in f and '疫情' in f]
    
    if covid_files:
        print(f"✅ 找到香港疫情数据文件: {covid_files[0]}")
        return True
    else:
        print("❌ 未找到香港疫情数据文件")
        print("请确保文件名包含'香港'和'疫情'关键词")
        print(f"当前目录下的Excel文件: {excel_files}")
        return False

def run_flask_app():
    """运行Flask应用"""
    print("\n" + "=" * 50)
    print("启动香港疫情数据可视化大屏")
    print("=" * 50)
    
    try:
        # 导入并运行Flask应用
        from app import app
        
        print("🌐 应用启动中...")
        print("📊 访问地址: http://localhost:8080")
        print("🔄 按 Ctrl+C 停止应用")
        print("-" * 50)
        
        app.run(debug=True, host='0.0.0.0', port=8080)
        
    except ImportError as e:
        print(f"❌ 导入Flask应用失败: {e}")
        print("请确保已安装所有依赖包")
    except Exception as e:
        print(f"❌ 启动应用失败: {e}")

def main():
    """主函数"""
    print("香港疫情数据可视化大屏启动器")
    print("=" * 50)
    
    # 检查数据文件
    if not check_data_file():
        return
    
    # 安装依赖
    if not install_requirements():
        print("⚠️ 依赖安装失败，尝试直接启动应用...")
    
    # 运行Flask应用
    run_flask_app()

if __name__ == "__main__":
    main() 