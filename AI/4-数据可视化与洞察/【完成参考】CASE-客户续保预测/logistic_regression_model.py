import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LogisticRegression
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

# 构建逻辑回归模型
print("\n构建逻辑回归模型...")
# 基础模型
lr = LogisticRegression(random_state=42, max_iter=1000)
lr.fit(X_train_scaled, y_train)

# 模型评估
print("\n模型评估...")
y_pred = lr.predict(X_test_scaled)
y_pred_proba = lr.predict_proba(X_test_scaled)[:, 1]

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
plt.savefig('lr_confusion_matrix.png')
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
plt.savefig('lr_roc_curve.png')
plt.close()

# 特征重要性分析（系数）
print("\n特征重要性分析...")
feature_importances = pd.DataFrame({
    'feature': X.columns,
    'importance': np.abs(lr.coef_[0])
}).sort_values('importance', ascending=False)

print(feature_importances.head(10))

# 绘制特征重要性图
plt.figure(figsize=(12, 8))
sns.barplot(x='importance', y='feature', data=feature_importances.head(10))
plt.title('逻辑回归特征重要性（前10名）')
plt.tight_layout()
plt.savefig('lr_feature_importance.png')
plt.close()

# 绘制系数图（包括正负影响）
plt.figure(figsize=(12, 8))
coef_df = pd.DataFrame({
    'feature': X.columns,
    'coefficient': lr.coef_[0]
}).sort_values('coefficient')
sns.barplot(x='coefficient', y='feature', data=coef_df)
plt.title('逻辑回归系数（正负影响）')
plt.axvline(x=0, color='black', linestyle='-')
plt.tight_layout()
plt.savefig('lr_coefficients.png')
plt.close()

# 超参数调优
print("\n进行超参数调优...")
param_grid = {
    'C': [0.001, 0.01, 0.1, 1, 10, 100],
    'penalty': ['l1', 'l2', 'elasticnet', None],
    'solver': ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga'],
    'class_weight': [None, 'balanced']
}

# 由于不同的solver支持不同的penalty，我们需要定义有效的组合
valid_param_grid = [
    {'penalty': ['l2', None], 'C': [0.001, 0.01, 0.1, 1, 10, 100], 'solver': ['newton-cg', 'lbfgs', 'sag'], 'class_weight': [None, 'balanced']},
    {'penalty': ['l1'], 'C': [0.001, 0.01, 0.1, 1, 10, 100], 'solver': ['liblinear', 'saga'], 'class_weight': [None, 'balanced']},
    {'penalty': ['l2'], 'C': [0.001, 0.01, 0.1, 1, 10, 100], 'solver': ['liblinear', 'saga'], 'class_weight': [None, 'balanced']},
    {'penalty': ['elasticnet'], 'C': [0.001, 0.01, 0.1, 1, 10, 100], 'solver': ['saga'], 'l1_ratio': [0.25, 0.5, 0.75], 'class_weight': [None, 'balanced']}
]

grid_search = GridSearchCV(
    estimator=LogisticRegression(random_state=42, max_iter=1000),
    param_grid=valid_param_grid,
    cv=5,
    n_jobs=-1,
    scoring='accuracy',
    verbose=1
)

grid_search.fit(X_train_scaled, y_train)

print(f"\n最佳参数: {grid_search.best_params_}")
print(f"最佳交叉验证得分: {grid_search.best_score_:.4f}")

# 使用最佳参数的模型
best_lr = grid_search.best_estimator_
y_pred_best = best_lr.predict(X_test_scaled)
y_pred_proba_best = best_lr.predict_proba(X_test_scaled)[:, 1]

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
plt.title('最佳逻辑回归模型接收者操作特征曲线')
plt.legend(loc="lower right")
plt.savefig('best_lr_roc_curve.png')
plt.close()

# 最佳模型特征重要性分析
if hasattr(best_lr, 'coef_'):
    best_feature_importances = pd.DataFrame({
        'feature': X.columns,
        'importance': np.abs(best_lr.coef_[0])
    }).sort_values('importance', ascending=False)

    print("\n最佳模型特征重要性（前10名）:")
    print(best_feature_importances.head(10))

    # 绘制最佳模型特征重要性图
    plt.figure(figsize=(12, 8))
    sns.barplot(x='importance', y='feature', data=best_feature_importances.head(10))
    plt.title('最佳逻辑回归模型特征重要性（前10名）')
    plt.tight_layout()
    plt.savefig('best_lr_feature_importance.png')
    plt.close()

    # 绘制最佳模型系数图（包括正负影响）
    plt.figure(figsize=(12, 8))
    best_coef_df = pd.DataFrame({
        'feature': X.columns,
        'coefficient': best_lr.coef_[0]
    }).sort_values('coefficient')
    sns.barplot(x='coefficient', y='feature', data=best_coef_df)
    plt.title('最佳逻辑回归模型系数（正负影响）')
    plt.axvline(x=0, color='black', linestyle='-')
    plt.tight_layout()
    plt.savefig('best_lr_coefficients.png')
    plt.close()

print("\n逻辑回归分类模型构建完成！") 