# 客户续保预测分析系统

## 项目概述
本项目是一个基于机器学习的客户续保预测分析系统，旨在通过分析客户数据来预测客户是否会续保。系统使用了多种机器学习模型，包括随机森林、决策树、朴素贝叶斯和逻辑回归等，以提供全面的预测分析。

## 项目结构
```
.
├── 数据文件
│   ├── policy_data.xlsx      # 训练数据集
│   └── policy_test.xlsx      # 测试数据集
├── 数据分析
│   ├── analyze_data.py       # 数据分析和可视化
│   ├── view_data.py         # 数据查看工具
│   └── view_excel.py        # Excel文件查看工具
├── 机器学习模型
│   ├── random_forest_model.py    # 随机森林模型
│   ├── decision_tree_model.py    # 决策树模型
│   ├── naive_bayes_model.py      # 朴素贝叶斯模型
│   └── logistic_regression_model.py  # 逻辑回归模型
└── 可视化结果
    ├── 数据分布图
    │   ├── age_distribution.png
    │   ├── gender_distribution.png
    │   └── gender_age_boxplot.png
    ├── 模型评估图
    │   ├── confusion_matrix.png
    │   ├── roc_curve.png
    │   └── feature_importance.png
    └── 其他分析图
        └── region_correlation.png
```

## 功能特点
1. **数据分析和可视化**
   - 客户年龄分布分析
   - 性别差异分析
   - 地区关联分析
   - 数据分布可视化

2. **机器学习模型**
   - 随机森林分类器
   - 决策树分类器
   - 朴素贝叶斯分类器
   - 逻辑回归分类器

3. **模型评估**
   - 混淆矩阵分析
   - ROC曲线分析
   - 特征重要性分析
   - 模型性能比较

## 环境要求
- Python 3.x
- pandas
- numpy
- scikit-learn
- matplotlib
- seaborn

## 使用说明
1. **数据准备**
   - 将训练数据放入 `policy_data.xlsx`
   - 将测试数据放入 `policy_test.xlsx`

2. **数据分析**
   ```bash
   python analyze_data.py
   ```

3. **模型训练和评估**
   ```bash
   # 随机森林模型
   python random_forest_model.py
   
   # 决策树模型
   python decision_tree_model.py
   
   # 朴素贝叶斯模型
   python naive_bayes_model.py
   
   # 逻辑回归模型
   python logistic_regression_model.py
   ```

## 模型性能
- 所有模型都经过优化，包括：
  - 特征工程
  - 超参数调优
  - 交叉验证
  - 性能评估

## 注意事项
1. 确保数据文件格式正确
2. 运行模型前请确保已安装所有依赖包
3. 建议先运行数据分析脚本，了解数据特征
4. 模型训练可能需要一定时间，请耐心等待

## 贡献指南
欢迎提交问题和改进建议。如果您想贡献代码：
1. Fork 本仓库
2. 创建您的特性分支
3. 提交您的更改
4. 推送到您的分支
5. 创建新的 Pull Request 