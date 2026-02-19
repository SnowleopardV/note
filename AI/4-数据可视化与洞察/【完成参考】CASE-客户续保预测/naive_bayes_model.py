import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.naive_bayes import GaussianNB, BernoulliNB, MultinomialNB
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

# 构建朴素贝叶斯模型
print("\n构建朴素贝叶斯模型...")

# 1. 高斯朴素贝叶斯
print("\n1. 高斯朴素贝叶斯模型")
gnb = GaussianNB()
gnb.fit(X_train_scaled, y_train)

# 模型评估
y_pred_gnb = gnb.predict(X_test_scaled)
y_pred_proba_gnb = gnb.predict_proba(X_test_scaled)[:, 1]

print(f"准确率: {accuracy_score(y_test, y_pred_gnb):.4f}")
print("\n分类报告:")
print(classification_report(y_test, y_pred_gnb))

print("\n混淆矩阵:")
cm_gnb = confusion_matrix(y_test, y_pred_gnb)
print(cm_gnb)

# 绘制混淆矩阵
plt.figure(figsize=(8, 6))
sns.heatmap(cm_gnb, annot=True, fmt='d', cmap='Blues')
plt.title('高斯朴素贝叶斯混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.savefig('gnb_confusion_matrix.png')
plt.close()

# 绘制ROC曲线
fpr_gnb, tpr_gnb, _ = roc_curve(y_test, y_pred_proba_gnb)
roc_auc_gnb = auc(fpr_gnb, tpr_gnb)

plt.figure(figsize=(8, 6))
plt.plot(fpr_gnb, tpr_gnb, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc_gnb:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('高斯朴素贝叶斯ROC曲线')
plt.legend(loc="lower right")
plt.savefig('gnb_roc_curve.png')
plt.close()

# 2. 伯努利朴素贝叶斯
print("\n2. 伯努利朴素贝叶斯模型")
bnb = BernoulliNB()
bnb.fit(X_train_scaled, y_train)

# 模型评估
y_pred_bnb = bnb.predict(X_test_scaled)
y_pred_proba_bnb = bnb.predict_proba(X_test_scaled)[:, 1]

print(f"准确率: {accuracy_score(y_test, y_pred_bnb):.4f}")
print("\n分类报告:")
print(classification_report(y_test, y_pred_bnb))

print("\n混淆矩阵:")
cm_bnb = confusion_matrix(y_test, y_pred_bnb)
print(cm_bnb)

# 绘制混淆矩阵
plt.figure(figsize=(8, 6))
sns.heatmap(cm_bnb, annot=True, fmt='d', cmap='Blues')
plt.title('伯努利朴素贝叶斯混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.savefig('bnb_confusion_matrix.png')
plt.close()

# 绘制ROC曲线
fpr_bnb, tpr_bnb, _ = roc_curve(y_test, y_pred_proba_bnb)
roc_auc_bnb = auc(fpr_bnb, tpr_bnb)

plt.figure(figsize=(8, 6))
plt.plot(fpr_bnb, tpr_bnb, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc_bnb:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('伯努利朴素贝叶斯ROC曲线')
plt.legend(loc="lower right")
plt.savefig('bnb_roc_curve.png')
plt.close()

# 3. 多项式朴素贝叶斯（需要非负特征）
print("\n3. 多项式朴素贝叶斯模型")
# 将数据转换为非负值
X_train_nonneg = X_train_scaled - X_train_scaled.min(axis=0)
X_test_nonneg = X_test_scaled - X_train_scaled.min(axis=0)

mnb = MultinomialNB()
mnb.fit(X_train_nonneg, y_train)

# 模型评估
y_pred_mnb = mnb.predict(X_test_nonneg)
y_pred_proba_mnb = mnb.predict_proba(X_test_nonneg)[:, 1]

print(f"准确率: {accuracy_score(y_test, y_pred_mnb):.4f}")
print("\n分类报告:")
print(classification_report(y_test, y_pred_mnb))

print("\n混淆矩阵:")
cm_mnb = confusion_matrix(y_test, y_pred_mnb)
print(cm_mnb)

# 绘制混淆矩阵
plt.figure(figsize=(8, 6))
sns.heatmap(cm_mnb, annot=True, fmt='d', cmap='Blues')
plt.title('多项式朴素贝叶斯混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.savefig('mnb_confusion_matrix.png')
plt.close()

# 绘制ROC曲线
fpr_mnb, tpr_mnb, _ = roc_curve(y_test, y_pred_proba_mnb)
roc_auc_mnb = auc(fpr_mnb, tpr_mnb)

plt.figure(figsize=(8, 6))
plt.plot(fpr_mnb, tpr_mnb, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc_mnb:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('多项式朴素贝叶斯ROC曲线')
plt.legend(loc="lower right")
plt.savefig('mnb_roc_curve.png')
plt.close()

# 比较三种朴素贝叶斯模型
print("\n朴素贝叶斯模型比较:")
models = {
    "高斯朴素贝叶斯": {"accuracy": accuracy_score(y_test, y_pred_gnb), "auc": roc_auc_gnb},
    "伯努利朴素贝叶斯": {"accuracy": accuracy_score(y_test, y_pred_bnb), "auc": roc_auc_bnb},
    "多项式朴素贝叶斯": {"accuracy": accuracy_score(y_test, y_pred_mnb), "auc": roc_auc_mnb}
}

for model_name, metrics in models.items():
    print(f"{model_name}: 准确率 = {metrics['accuracy']:.4f}, AUC = {metrics['auc']:.4f}")

# 绘制三种模型的ROC曲线比较
plt.figure(figsize=(10, 8))
plt.plot(fpr_gnb, tpr_gnb, color='blue', lw=2, label=f'高斯朴素贝叶斯 (AUC = {roc_auc_gnb:.4f})')
plt.plot(fpr_bnb, tpr_bnb, color='red', lw=2, label=f'伯努利朴素贝叶斯 (AUC = {roc_auc_bnb:.4f})')
plt.plot(fpr_mnb, tpr_mnb, color='green', lw=2, label=f'多项式朴素贝叶斯 (AUC = {roc_auc_mnb:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('三种朴素贝叶斯模型ROC曲线比较')
plt.legend(loc="lower right")
plt.savefig('nb_models_comparison_roc.png')
plt.close()

# 选择最佳模型
best_model_name = max(models, key=lambda x: models[x]["accuracy"])
best_accuracy = models[best_model_name]["accuracy"]
best_auc = models[best_model_name]["auc"]

print(f"\n最佳朴素贝叶斯模型: {best_model_name}")
print(f"最佳模型准确率: {best_accuracy:.4f}")
print(f"最佳模型AUC: {best_auc:.4f}")

# 超参数调优（以高斯朴素贝叶斯为例）
print("\n进行高斯朴素贝叶斯超参数调优...")
param_grid = {
    'var_smoothing': np.logspace(0, -9, num=10)
}

grid_search = GridSearchCV(
    estimator=GaussianNB(),
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
best_gnb = grid_search.best_estimator_
y_pred_best = best_gnb.predict(X_test_scaled)
y_pred_proba_best = best_gnb.predict_proba(X_test_scaled)[:, 1]

print(f"\n调优后的高斯朴素贝叶斯准确率: {accuracy_score(y_test, y_pred_best):.4f}")
print("\n调优后的高斯朴素贝叶斯分类报告:")
print(classification_report(y_test, y_pred_best))

# 绘制调优后的ROC曲线
fpr_best, tpr_best, _ = roc_curve(y_test, y_pred_proba_best)
roc_auc_best = auc(fpr_best, tpr_best)

plt.figure(figsize=(8, 6))
plt.plot(fpr_best, tpr_best, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc_best:.4f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('假正例率')
plt.ylabel('真正例率')
plt.title('调优后的高斯朴素贝叶斯ROC曲线')
plt.legend(loc="lower right")
plt.savefig('best_gnb_roc_curve.png')
plt.close()

print("\n朴素贝叶斯分类模型构建完成！") 