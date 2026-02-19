import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, roc_curve, auc
from sklearn.impute import SimpleImputer
import warnings
warnings.filterwarnings('ignore')

# 设置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

# 读取数据
print("读取数据...")
data = pd.read_excel('policy_data.xlsx')

# 数据探索
print("\n数据基本信息:")
print(f"数据形状: {data.shape}")
print(f"列名: {data.columns.tolist()}")
print("\n目标变量分布:")
print(data['renewal'].value_counts())
print(f"续保率: {data['renewal'].value_counts(normalize=True)['Yes']*100:.2f}%")

# 数据预处理
print("\n数据预处理...")

# 处理缺失值
print("处理缺失值...")
print("缺失值统计:")
print(data.isnull().sum())

# 使用SimpleImputer填充数值型特征的缺失值
numeric_features = data.select_dtypes(include=['int64', 'float64']).columns
if len(numeric_features) > 0:
    imputer = SimpleImputer(strategy='median')
    data[numeric_features] = imputer.fit_transform(data[numeric_features])

# 处理分类特征
print("\n处理分类特征...")
categorical_features = data.select_dtypes(include=['object']).columns.tolist()
if 'renewal' in categorical_features:
    categorical_features.remove('renewal')  # 移除目标变量
print(f"分类特征: {categorical_features}")

# 使用LabelEncoder编码分类特征
label_encoders = {}
for feature in categorical_features:
    le = LabelEncoder()
    # 处理缺失值
    data[feature] = data[feature].fillna('未知')
    data[feature] = le.fit_transform(data[feature])
    label_encoders[feature] = le

# 处理日期特征
date_features = ['policy_start_date', 'policy_end_date']
for feature in date_features:
    if feature in data.columns:
        # 将日期转换为时间戳
        data[feature] = pd.to_datetime(data[feature])
        # 提取有用的日期特征
        data[f'{feature}_year'] = data[feature].dt.year
        data[f'{feature}_month'] = data[feature].dt.month
        # 计算保单期限（以天为单位）
        if feature == 'policy_start_date' and 'policy_end_date' in data.columns:
            data['policy_duration_days'] = (data['policy_end_date'] - data['policy_start_date']).dt.days
        
# 删除原始日期列
data = data.drop(columns=date_features, errors='ignore')

# 准备特征和目标变量
print("\n准备特征和目标变量...")
# 将目标变量转换为二进制
data['renewal'] = data['renewal'].map({'Yes': 1, 'No': 0})

# 选择特征
X = data.drop('renewal', axis=1)
y = data['renewal']

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 特征标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 构建决策树模型
print("\n构建决策树模型...")
# 基础模型
dt = DecisionTreeClassifier(random_state=42)
dt.fit(X_train_scaled, y_train)

# 模型评估
print("\n模型评估...")
y_pred = dt.predict(X_test_scaled)
y_pred_proba = dt.predict_proba(X_test_scaled)[:, 1]

print(f"准确率: {accuracy_score(y_test, y_pred):.4f}")
print("\n分类报告:")
print(classification_report(y_test, y_pred))

print("\n混淆矩阵:")
cm = confusion_matrix(y_test, y_pred)
print(cm)

# 绘制混淆矩阵
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.savefig('dt_confusion_matrix.png')
plt.close()

# 绘制ROC曲线
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('接收者操作特征曲线')
plt.legend(loc="lower right")
plt.savefig('dt_roc_curve.png')
plt.close()

# 特征重要性分析
print("\n特征重要性分析...")
feature_importances = pd.DataFrame({
    'feature': X.columns,
    'importance': dt.feature_importances_
}).sort_values('importance', ascending=False)

print(feature_importances.head(10))

# 绘制特征重要性图
plt.figure(figsize=(12, 8))
sns.barplot(x='importance', y='feature', data=feature_importances.head(10))
plt.title('决策树特征重要性（前10名）')
plt.tight_layout()
plt.savefig('dt_feature_importance.png')
plt.close()

# 可视化决策树（限制深度以便于查看）
print("\n可视化决策树...")
plt.figure(figsize=(20, 10))
plot_tree(dt, max_depth=3, feature_names=X.columns, class_names=['不续保', '续保'], 
          filled=True, rounded=True, fontsize=10)
plt.title('决策树可视化（深度限制为3）')
plt.savefig('decision_tree_viz.png', dpi=300, bbox_inches='tight')
plt.close()

# 输出决策树文本表示
tree_text = export_text(dt, feature_names=list(X.columns), max_depth=5)
with open('decision_tree_text.txt', 'w', encoding='utf-8') as f:
    f.write(tree_text)
print("决策树文本表示已保存到 decision_tree_text.txt")

# 超参数调优
print("\n进行超参数调优...")
param_grid = {
    'max_depth': [None, 5, 10, 15, 20],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4, 8],
    'criterion': ['gini', 'entropy']
}

grid_search = GridSearchCV(
    estimator=DecisionTreeClassifier(random_state=42),
    param_grid=param_grid,
    cv=5,
    n_jobs=-1,
    scoring='accuracy',
    verbose=1
)

grid_search.fit(X_train_scaled, y_train)

print(f"\n最佳参数: {grid_search.best_params_}")
print(f"最佳交叉验证得分: {grid_search.best_score_:.4f}")

# 使用最佳参数的模型
best_dt = grid_search.best_estimator_
y_pred_best = best_dt.predict(X_test_scaled)
y_pred_proba_best = best_dt.predict_proba(X_test_scaled)[:, 1]

print(f"\n最佳模型准确率: {accuracy_score(y_test, y_pred_best):.4f}")
print("\n最佳模型分类报告:")
print(classification_report(y_test, y_pred_best))

# 绘制最佳模型的ROC曲线
fpr_best, tpr_best, _ = roc_curve(y_test, y_pred_proba_best)
roc_auc_best = auc(fpr_best, tpr_best)

plt.figure(figsize=(8, 6))
plt.plot(fpr_best, tpr_best, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc_best:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('最佳决策树模型接收者操作特征曲线')
plt.legend(loc="lower right")
plt.savefig('best_dt_roc_curve.png')
plt.close()

# 可视化最佳决策树
plt.figure(figsize=(20, 10))
plot_tree(best_dt, max_depth=3, feature_names=X.columns, class_names=['不续保', '续保'], 
          filled=True, rounded=True, fontsize=10)
plt.title('最佳决策树可视化（深度限制为3）')
plt.savefig('best_decision_tree_viz.png', dpi=300, bbox_inches='tight')
plt.close()

# 输出最佳决策树文本表示
best_tree_text = export_text(best_dt, feature_names=list(X.columns), max_depth=5)
with open('best_decision_tree_text.txt', 'w', encoding='utf-8') as f:
    f.write(best_tree_text)
print("最佳决策树文本表示已保存到 best_decision_tree_text.txt")

print("\n决策树分类模型构建完成！") 