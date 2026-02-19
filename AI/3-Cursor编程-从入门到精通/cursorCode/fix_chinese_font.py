import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import platform
import os

def fix_chinese_font():
    """修复中文字体问题"""
    print("=" * 50)
    print("修复中文字体问题")
    print("=" * 50)
    
    system = platform.system()
    print(f"操作系统: {system}")
    
    # 方法1: 使用系统字体
    if system == "Darwin":  # macOS
        font_paths = [
            '/System/Library/Fonts/PingFang.ttc',
            '/System/Library/Fonts/STHeiti Light.ttc',
            '/System/Library/Fonts/Arial Unicode MS.ttf'
        ]
    else:
        font_paths = []
    
    # 尝试加载系统字体
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                custom_font = fm.FontProperties(fname=font_path)
                plt.rcParams['font.family'] = custom_font.get_name()
                print(f"✅ 成功加载字体: {font_path}")
                return True
            except:
                continue
    
    # 方法2: 使用matplotlib内置字体
    plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial Unicode MS', 'SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    print("✅ 使用matplotlib内置字体")
    
    return True

def test_chinese_display():
    """测试中文显示"""
    fix_chinese_font()
    
    # 创建测试图表
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
    ax.set_title('香港疫情数据测试')
    ax.set_xlabel('日期')
    ax.set_ylabel('确诊数')
    ax.text(2, 2, '测试中文显示', fontsize=14)
    
    # 保存测试图表
    plt.savefig('中文测试图表.png', dpi=150, bbox_inches='tight')
    plt.show()
    
    print("✅ 中文测试图表已生成")

if __name__ == "__main__":
    test_chinese_display() 