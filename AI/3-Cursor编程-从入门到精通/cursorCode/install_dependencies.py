import subprocess
import sys
import os

def install_packages_with_tsinghua_mirror():
    """
    使用清华源镜像安装Python包
    """
    print("=" * 50)
    print("使用清华源镜像安装Python依赖包")
    print("=" * 50)
    
    # 需要安装的包列表
    packages = [
        "pandas>=1.3.0",
        "openpyxl>=3.0.0", 
        "xlrd>=2.0.0"
    ]
    
    # 清华源镜像URL
    tsinghua_mirror = "https://pypi.tuna.tsinghua.edu.cn/simple"
    
    try:
        for package in packages:
            print(f"正在安装 {package}...")
            
            # 使用清华源镜像安装包
            cmd = [
                sys.executable, "-m", "pip", "install", 
                package, "-i", tsinghua_mirror, "--trusted-host", "pypi.tuna.tsinghua.edu.cn"
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ {package} 安装成功")
            else:
                print(f"❌ {package} 安装失败")
                print(f"错误信息: {result.stderr}")
        
        print("\n" + "=" * 50)
        print("✅ 所有依赖包安装完成！")
        print("=" * 50)
        
    except Exception as e:
        print(f"❌ 安装过程中发生错误: {e}")

def check_packages():
    """
    检查已安装的包
    """
    print("\n检查已安装的包:")
    print("-" * 30)
    
    packages_to_check = ["pandas", "openpyxl", "xlrd"]
    
    for package in packages_to_check:
        try:
            __import__(package)
            print(f"✅ {package} 已安装")
        except ImportError:
            print(f"❌ {package} 未安装")

if __name__ == "__main__":
    # 安装依赖包
    install_packages_with_tsinghua_mirror()
    
    # 检查安装结果
    check_packages() 