import matplotlib.pyplot as plt
import platform
import os

def test_chinese_font():
    """测试中文字体设置"""
    print("=" * 50)
    print("中文字体测试")
    print("=" * 50)
    
    # 获取系统信息
    system = platform.system()
    print(f"操作系统: {system}")
    
    # 设置字体
    if system == "Darwin":  # macOS
        fonts = ['Arial Unicode MS', 'PingFang HK', 'Hiragino Sans GB', 'STHeiti']
    elif system == "Windows":
        fonts = ['SimHei', 'Microsoft YaHei', 'SimSun']
    else:  # Linux
        fonts = ['DejaVu Sans', 'WenQuanYi Micro Hei', 'Noto Sans CJK SC']
    
    print(f"尝试的字体: {fonts}")
    
    # 测试每个字体
    for font in fonts:
        try:
            plt.rcParams['font.sans-serif'] = [font]
            plt.rcParams['axes.unicode_minus'] = False
            
            # 创建测试图表
            fig, ax = plt.subplots(figsize=(10, 6))
            ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
            ax.set_title(f'测试字体: {font}')
            ax.set_xlabel('日期')
            ax.set_ylabel('确诊数')
            ax.text(2, 2, '香港疫情数据', fontsize=14)
            
            # 保存测试图表
            test_file = f"字体测试_{font}.png"
            plt.savefig(test_file, dpi=150, bbox_inches='tight')
            plt.close()
            
            print(f"✅ 字体 {font} 测试成功")
            
        except Exception as e:
            print(f"❌ 字体 {font} 测试失败: {e}")
    
    print("\n字体测试完成！")

if __name__ == "__main__":
    test_chinese_font() 