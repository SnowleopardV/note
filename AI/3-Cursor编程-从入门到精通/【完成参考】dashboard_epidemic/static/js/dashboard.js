// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 先加载香港地图JSON数据
    fetch('/static/js/hongkong.json')
        .then(response => response.json())
        .then(hongkongJson => {
            // 对地图数据进行处理，确保元朗区边界正确
            try {
                console.log('处理香港地图数据...');
                // 检查元朗区和屯门区的坐标数据
                hongkongJson.features.forEach(feature => {
                    if (feature.properties.name === '元朗区') {
                        console.log('元朗区中心点:', feature.properties.center);
                        console.log('元朗区边界坐标数量:', feature.geometry.coordinates[0].length);
                    }
                });
            } catch (e) {
                console.error('处理地图数据时出错:', e);
            }
            
            // 注册香港地图
            echarts.registerMap('hongkong', hongkongJson);
            console.log('香港地图数据已注册');
            
            // 获取数据并初始化所有图表
            Promise.all([
                fetch('/api/daily_data').then(res => res.json()),
                fetch('/api/region_data').then(res => res.json()),
                fetch('/api/summary').then(res => res.json())
            ]).then(([dailyData, regionData, summaryData]) => {
                // 将数据保存到全局变量，方便后续使用
                window.dailyData = dailyData;
                window.regionData = regionData;
                window.summaryData = summaryData;
                
                console.log('所有数据加载完成，开始初始化图表');
                
                // 初始化各图表
                initDailyTotalChart(dailyData);
                initAreaComparisonChart(regionData);
                initGrowthRateChart(dailyData);
                initActiveCasesChart(dailyData);
                initRiskLevelPie(summaryData, regionData);
                updateHighRiskAreas(regionData);
                
                // 最后初始化地图（确保所有数据都已准备好）
                setTimeout(() => {
                    initHongKongMap();
                }, 100);
                
                // 绑定窗口大小变化事件，统一处理所有图表的响应式调整
                window.addEventListener('resize', function() {
                    resizeAllCharts();
                });
            }).catch(error => {
                console.error('获取数据失败:', error);
                alert('数据加载失败，请刷新页面重试');
            });
        })
        .catch(error => {
            console.error('加载香港地图数据失败:', error);
            alert('香港地图数据加载失败，请刷新页面重试');
        });
});

// 存储所有图表实例的对象
const chartInstances = {};

// 统一调整所有图表大小
function resizeAllCharts() {
    Object.values(chartInstances).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
}

// 香港地区数据 - 临时模拟一个简化的地图数据
// 实际开发中应使用真实的香港地图数据
// 删除这个临时数据，因为我们已经加载了真实的hongkong.json
const hkGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "中西区" },
            "geometry": { "type": "Point", "coordinates": [114.15, 22.28] }
        },
        {
            "type": "Feature",
            "properties": { "name": "湾仔区" },
            "geometry": { "type": "Point", "coordinates": [114.17, 22.27] }
        },
        {
            "type": "Feature",
            "properties": { "name": "东区" },
            "geometry": { "type": "Point", "coordinates": [114.22, 22.28] }
        },
        {
            "type": "Feature",
            "properties": { "name": "南区" },
            "geometry": { "type": "Point", "coordinates": [114.16, 22.25] }
        },
        {
            "type": "Feature",
            "properties": { "name": "油尖旺区" },
            "geometry": { "type": "Point", "coordinates": [114.17, 22.31] }
        },
        {
            "type": "Feature",
            "properties": { "name": "深水埗区" },
            "geometry": { "type": "Point", "coordinates": [114.16, 22.33] }
        },
        {
            "type": "Feature",
            "properties": { "name": "九龙城区" },
            "geometry": { "type": "Point", "coordinates": [114.19, 22.33] }
        },
        {
            "type": "Feature",
            "properties": { "name": "黄大仙区" },
            "geometry": { "type": "Point", "coordinates": [114.20, 22.34] }
        },
        {
            "type": "Feature",
            "properties": { "name": "观塘区" },
            "geometry": { "type": "Point", "coordinates": [114.23, 22.32] }
        },
        {
            "type": "Feature",
            "properties": { "name": "葵青区" },
            "geometry": { "type": "Point", "coordinates": [114.13, 22.36] }
        },
        {
            "type": "Feature",
            "properties": { "name": "荃湾区" },
            "geometry": { "type": "Point", "coordinates": [114.12, 22.37] }
        },
        {
            "type": "Feature",
            "properties": { "name": "屯门区" },
            "geometry": { "type": "Point", "coordinates": [113.97, 22.39] }
        },
        {
            "type": "Feature",
            "properties": { "name": "元朗区" },
            "geometry": { "type": "Point", "coordinates": [114.03, 22.45] }
        },
        {
            "type": "Feature",
            "properties": { "name": "北区" },
            "geometry": { "type": "Point", "coordinates": [114.15, 22.50] }
        },
        {
            "type": "Feature",
            "properties": { "name": "大埔区" },
            "geometry": { "type": "Point", "coordinates": [114.17, 22.45] }
        },
        {
            "type": "Feature",
            "properties": { "name": "沙田区" },
            "geometry": { "type": "Point", "coordinates": [114.20, 22.38] }
        },
        {
            "type": "Feature",
            "properties": { "name": "西贡区" },
            "geometry": { "type": "Point", "coordinates": [114.27, 22.38] }
        },
        {
            "type": "Feature",
            "properties": { "name": "离岛区" },
            "geometry": { "type": "Point", "coordinates": [113.95, 22.28] }
        }
    ]
};

// 1. 初始化每日新增与累计确诊数据图表
function initDailyTotalChart(data) {
    const chartDom = document.getElementById('daily-total-chart');
    const myChart = echarts.init(chartDom);
    chartInstances.dailyTotal = myChart;
    
    // 显示最近30天的数据
    const length = data.dates.length;
    const startIndex = Math.max(0, length - 30);
    
    const recentDates = data.dates.slice(startIndex);
    const recentDailyNew = data.daily_new.slice(startIndex);
    const recentDailyAvg = data.daily_avg.slice(startIndex);
    const recentTotalCases = data.total_cases.slice(startIndex);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['每日新增确诊', '7日移动平均', '累计确诊'],
            textStyle: {
                color: '#eee'
            }
        },
        xAxis: {
            type: 'category',
            data: recentDates,
            axisLabel: {
                rotate: 45,
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '每日新增确诊',
                position: 'left',
                axisLabel: {
                    color: '#eee'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#5470C6'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            },
            {
                type: 'value',
                name: '累计确诊',
                position: 'right',
                axisLabel: {
                    color: '#eee'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#EE6666'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '每日新增确诊',
                type: 'bar',
                data: recentDailyNew,
                itemStyle: {
                    color: '#5470C6'
                }
            },
            {
                name: '7日移动平均',
                type: 'line',
                smooth: true,
                data: recentDailyAvg,
                itemStyle: {
                    color: '#91CC75'
                },
                lineStyle: {
                    width: 2
                },
                symbolSize: 6
            },
            {
                name: '累计确诊',
                type: 'line',
                yAxisIndex: 1,
                data: recentTotalCases,
                itemStyle: {
                    color: '#EE6666'
                },
                lineStyle: {
                    width: 3
                },
                symbolSize: 8
            }
        ]
    };
    
    myChart.setOption(option);
}

// 2. 初始化各区域疫情对比横向柱状图
function initAreaComparisonChart(data) {
    const chartDom = document.getElementById('area-comparison-chart');
    const myChart = echarts.init(chartDom);
    chartInstances.areaComparison = myChart;
    
    // 限制显示前10个区域
    const topRegions = data.regions.slice(0, 10);
    const topTotalCases = data.total_cases.slice(0, 10);
    const topNewCases = data.new_cases.slice(0, 10);
    const topRiskLevels = data.risk_levels.slice(0, 10);
    
    // 根据风险等级返回颜色
    function getRiskColor(risk) {
        if (risk === '高风险') return '#c23531';
        if (risk === '中风险') return '#e67e22';
        return '#2ecc71';
    }
    
    // 为每个柱子生成颜色
    const barColors = topRiskLevels.map(risk => getRiskColor(risk));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const index = params[0].dataIndex;
                return `${topRegions[index]}<br/>
                       累计确诊: ${topTotalCases[index]}<br/>
                       新增确诊: ${topNewCases[index]}<br/>
                       风险等级: ${topRiskLevels[index]}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: topRegions,
            axisLabel: {
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: '累计确诊',
                type: 'bar',
                data: topTotalCases,
                itemStyle: {
                    color: function(params) {
                        return barColors[params.dataIndex];
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    color: '#fff',
                    formatter: '{c}'
                }
            }
        ]
    };
    
    myChart.setOption(option);
}

// 3. 初始化增长率变化曲线图
function initGrowthRateChart(data) {
    const chartDom = document.getElementById('growth-rate-chart');
    const myChart = echarts.init(chartDom);
    chartInstances.growthRate = myChart;
    
    // 显示最近30天的数据
    const length = data.dates.length;
    const startIndex = Math.max(0, length - 30);
    
    const recentDates = data.dates.slice(startIndex);
    const recentGrowthRate = data.growth_rate.slice(startIndex);
    
    // 计算7日平均增长率
    const avgGrowthRate = [];
    for (let i = 0; i < recentGrowthRate.length; i++) {
        const startIdx = Math.max(0, i - 6);
        const slice = recentGrowthRate.slice(startIdx, i + 1);
        const sum = slice.reduce((acc, val) => acc + val, 0);
        avgGrowthRate.push((sum / slice.length).toFixed(2));
    }
    
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const index = params[0].dataIndex;
                return `${recentDates[index]}<br/>
                       增长率: ${recentGrowthRate[index].toFixed(2)}%<br/>
                       7日平均增长率: ${avgGrowthRate[index]}%`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['每日增长率', '7日平均增长率'],
            textStyle: {
                color: '#eee'
            }
        },
        xAxis: {
            type: 'category',
            data: recentDates,
            axisLabel: {
                rotate: 45,
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '增长率(%)',
            axisLabel: {
                formatter: '{value}%',
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        },
        series: [
            {
                name: '每日增长率',
                type: 'line',
                data: recentGrowthRate,
                markLine: {
                    data: [
                        {
                            name: '零增长线',
                            yAxis: 0,
                            lineStyle: {
                                color: '#ccc',
                                type: 'dashed'
                            },
                            label: {
                                show: true,
                                position: 'start',
                                formatter: '零增长线'
                            }
                        }
                    ]
                },
                itemStyle: {
                    color: '#5470C6'
                }
            },
            {
                name: '7日平均增长率',
                type: 'line',
                smooth: true,
                data: avgGrowthRate,
                lineStyle: {
                    width: 3,
                    color: '#91CC75'
                },
                symbolSize: 8
            }
        ]
    };
    
    myChart.setOption(option);
}

// 4. 初始化活跃病例趋势图
function initActiveCasesChart(data) {
    const chartDom = document.getElementById('active-cases-chart');
    const myChart = echarts.init(chartDom);
    chartInstances.activeCases = myChart;
    
    // 显示所有数据
    const dates = data.dates;
    const activeCases = data.active_cases;
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                rotate: 45,
                color: '#eee',
                interval: Math.floor(dates.length / 10) // 只显示10个左右的日期标签，避免拥挤
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '活跃病例',
            axisLabel: {
                color: '#eee'
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        },
        series: [
            {
                name: '活跃病例',
                type: 'line',
                data: activeCases,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 184, 108, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 184, 108, 0.1)'
                        }
                    ])
                },
                itemStyle: {
                    color: '#ffb86c'
                },
                lineStyle: {
                    width: 3
                },
                symbolSize: 8,
                // 优化显示，避免点太多导致性能问题
                sampling: 'average',
                showSymbol: false
            }
        ]
    };
    
    myChart.setOption(option);
}

// 5. 初始化风险等级饼图
function initRiskLevelPie(summaryData, regionData) {
    const chartDom = document.getElementById('risk-level-pie');
    const myChart = echarts.init(chartDom);
    chartInstances.riskLevelPie = myChart;
    
    // 计算各风险等级的区域数量
    const riskCounts = {};
    regionData.risk_levels.forEach(risk => {
        riskCounts[risk] = (riskCounts[risk] || 0) + 1;
    });
    
    const pieData = [];
    if (riskCounts['高风险']) {
        pieData.push({
            name: '高风险',
            value: riskCounts['高风险'],
            itemStyle: { color: '#c23531' }
        });
    }
    
    if (riskCounts['中风险']) {
        pieData.push({
            name: '中风险',
            value: riskCounts['中风险'],
            itemStyle: { color: '#e67e22' }
        });
    }
    
    if (riskCounts['低风险']) {
        pieData.push({
            name: '低风险',
            value: riskCounts['低风险'],
            itemStyle: { color: '#2ecc71' }
        });
    }
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            data: pieData.map(item => item.name),
            textStyle: {
                color: '#eee'
            }
        },
        series: [
            {
                name: '风险等级',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['40%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: pieData
            }
        ]
    };
    
    myChart.setOption(option);
}

// 6. 更新高风险区域提示
function updateHighRiskAreas(regionData) {
    const highRiskElem = document.getElementById('high-risk-areas');
    
    const highRiskRegions = [];
    for (let i = 0; i < regionData.regions.length; i++) {
        if (regionData.risk_levels[i] === '高风险') {
            highRiskRegions.push({
                name: regionData.regions[i],
                newCases: regionData.new_cases[i]
            });
        }
    }
    
    if (highRiskRegions.length > 0) {
        let html = '<ul class="risk-list">';
        highRiskRegions.forEach(region => {
            html += `<li class="risk-item">${region.name} <span class="risk-value">新增确诊: ${region.newCases}</span></li>`;
        });
        html += '</ul>';
        highRiskElem.innerHTML = html;
    } else {
        highRiskElem.innerHTML = '<p class="no-risk">当前没有高风险区域</p>';
    }
}

// 初始化香港地图
function initHongKongMap() {
    const chartDom = document.getElementById('hk-map');
    if (!chartDom) {
        console.error('找不到地图容器元素 #hk-map');
        return;
    }
    
    console.log('初始化香港地图...');
    console.log('地图容器尺寸:', chartDom.offsetWidth, 'x', chartDom.offsetHeight);
    
    // 确保容器有足够的高度
    if (chartDom.offsetHeight < 300) {
        chartDom.style.height = '500px';
        console.log('调整地图容器高度为500px');
    }
    
    const myChart = echarts.init(chartDom);
    chartInstances.hkMap = myChart;
    
    // 使用更合适的配置
    const option = {
        backgroundColor: '#0f1c3a',  // 与背景匹配
        title: {
            text: '香港各区疫情分布',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} (确诊病例)'
        },
        visualMap: {
            min: 0,
            max: 1000,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#2ecc71', '#e67e22', '#c23531']  // 从绿色到红色
            },
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '香港疫情地图',
            type: 'map',
            map: 'hongkong',
            roam: true,  // 允许缩放和平移
            aspectScale: 0.85, // 调整长宽比，使地图更加协调
            layoutCenter: ['50%', '50%'], // 将地图置于视图中心
            layoutSize: 'auto', // 使用auto让地图自动适应容器大小
            label: {
                show: true,
                color: '#fff',
                fontSize: 10,
                formatter: function(params) {
                    console.log('params',params)
                    // 如果是元朗区，加上标记让它更明显
                    if (params.name === '元朗区') {
                        return params.name + '*';
                    }
                    return params.name;
                }
            },
            emphasis: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                itemStyle: {
                    areaColor: '#5470c6',
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                }
            },
            select: {
                label: {
                    show: true,
                    color: '#fff'
                },
                itemStyle: {
                    areaColor: '#91cc75'
                }
            },
            data: [],  // 将在后面填充数据
            animation: false, // 禁用动画以便更快显示
            // 自定义名称映射
            nameMap: {
                'Central and Western': '中西区',
                Eastern: '东区',
                Islands: '离岛区',
                'Kowloon City': '九龙城区',
                'Kwai Tsing': '葵青区',
                'Kwun Tong': '观塘区',
                North: '北区',
                'Sai Kung': '西贡区',
                'Sha Tin': '沙田区',
                'Sham Shui Po': '深水埗区',
                Southern: '南区',
                'Tai Po': '大埔区',
                'Tsuen Wan': '荃湾区',
                'Tuen Mun': '屯门区',
                'Wan Chai': '湾仔区',
                'Wong Tai Sin': '黄大仙区',
                'Yau Tsim Mong': '油尖旺区',
                'Yuen Long': '元朗区'
            }
        }]
    };
    
    // 准备地图数据
    const mapData = [];
    
    // 如果有regionData，从中提取数据
    try {
        const regionNames = window.regionData?.regions || [];
        const regionCases = window.regionData?.total_cases || [];
        const regionRisks = window.regionData?.risk_levels || [];
        
        if (regionNames.length > 0) {
            for (let i = 0; i < regionNames.length; i++) {
                mapData.push({
                    name: regionNames[i],
                    value: regionCases[i],
                    risk: regionRisks[i]
                });
            }
            console.log('从regionData提取的地图数据:', mapData);
            
            // 检查地图数据中是否有元朗区
            const ylData = mapData.find(item => item.name === '元朗区');
            if (ylData) {
                console.log('元朗区数据:', ylData);
            } else {
                console.warn('未找到元朗区的数据');
            }
        }
    } catch (error) {
        console.error('处理地区数据时出错:', error);
    }
    
    // 设置地图数据
    option.series[0].data = mapData;
    
    // 设置visualMap的最大值
    if (mapData.length > 0) {
        const maxValue = Math.max(...mapData.map(item => item.value));
        option.visualMap.max = maxValue;
        console.log('地图数据最大值:', maxValue);
    }
    
    // 应用配置
    console.log('应用地图配置...');
    myChart.setOption(option);
    
    // 添加事件处理
    myChart.on('rendered', function() {
        console.log('地图渲染完成');
    });
    
    myChart.on('error', function(error) {
        console.error('地图渲染错误:', error);
    });
    
    // 窗口大小变化时调整地图大小
    window.addEventListener('resize', function() {
        if (chartInstances.hkMap) {
            chartInstances.hkMap.resize();
        }
    });
    
    // 手动触发一次resize，确保地图正确渲染
    setTimeout(function() {
        if (chartInstances.hkMap) {
            console.log('强制重绘地图...');
            chartInstances.hkMap.resize();
        }
    }, 200);
}

// 页面滚动到底部时自动调整尺寸
document.querySelector('.dashboard-container').addEventListener('scroll', function() {
    resizeAllCharts();
}); 