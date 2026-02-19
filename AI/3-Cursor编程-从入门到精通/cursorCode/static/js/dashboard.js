// 全局变量
let charts = {}

// 初始化页面
document.addEventListener('DOMContentLoaded', function () {
  loadSummaryStats()
  loadDailyStats()
  loadDistrictStats()
  loadHKMapChart()

  // 每5分钟刷新一次数据
  setInterval(() => {
    loadSummaryStats()
    loadDailyStats()
    loadDistrictStats()
  }, 300000)
})

// 加载汇总统计数据
async function loadSummaryStats() {
  try {
    const response = await fetch('/api/summary_stats')
    const data = await response.json()

    if (data.error) {
      console.error('加载汇总数据失败:', data.error)
      return
    }

    // 更新统计卡片
    document.getElementById('totalCases').textContent = formatNumber(
      data.total_cumulative_cases
    )
    document.getElementById('currentCases').textContent = formatNumber(
      data.current_cases
    )
    document.getElementById('totalRecovered').textContent = formatNumber(
      data.total_recovered
    )
    document.getElementById('totalDeaths').textContent = formatNumber(
      data.total_deaths
    )
    document.getElementById('updateTime').textContent = data.latest_date
  } catch (error) {
    console.error('加载汇总数据失败:', error)
  }
}

// 加载每日统计数据
async function loadDailyStats() {
  try {
    const response = await fetch('/api/daily_stats')
    const data = await response.json()

    if (data.error) {
      console.error('加载每日数据失败:', data.error)
      return
    }

    // 创建图表
    createNewCasesChart(data)
    createCumulativeChart(data)
    createComparisonChart(data)
  } catch (error) {
    console.error('加载每日数据失败:', error)
  }
}

// 加载地区统计数据
async function loadDistrictStats() {
  try {
    const response = await fetch('/api/district_stats')
    const data = await response.json()

    if (data.error) {
      console.error('加载地区数据失败:', data.error)
      return
    }

    // 创建地区图表
    createDistrictChart(data)
    createIncidenceChart(data)
  } catch (error) {
    console.error('加载地区数据失败:', error)
  }
}

// 加载香港地图疫情分布
async function loadHKMapChart() {
  try {
    // 1. 获取地图GeoJSON
    const geoJsonResp = await fetch('/static/map/hongkong.json')
    const geoJson = await geoJsonResp.json()

    // 2. 获取各区累计确诊数据
    const resp = await fetch('/api/district_stats')
    const data = await resp.json()
    if (data.error) return

    // 3. 注册地图
    echarts.registerMap('hongkong', geoJson)

    // 4. 组装数据
    const mapData = data.districts.map((name, i) => ({
      name,
      value: data.cumulative_cases[i],
    }))

    // 5. 渲染地图
    const chart = echarts.init(document.getElementById('hkMapChart'))
    const option = {
      backgroundColor: 'transparent',
      title: { left: 'center', text: '', textStyle: { color: '#FFD700' } },
      tooltip: {
        trigger: 'item',
        formatter: (p) => `${p.name}<br/>累计确诊: ${p.value ? p.value : 0}`,
      },
      visualMap: {
        min: 0,
        max: Math.max(...mapData.map((d) => d.value)),
        left: 'left',
        bottom: '5%',
        text: ['高', '低'],
        inRange: { color: ['#e0f7fa', '#ff6b6b'] },
        textStyle: { color: '#fff' },
        calculable: true,
      },
      series: [
        {
          type: 'map',
          map: 'hongkong',
          roam: true,
          label: {
            show: true,
            color: '#fff',
            fontSize: 12,
          },
          data: mapData,
          emphasis: {
            label: { color: '#FFD700', fontWeight: 'bold' },
            itemStyle: { areaColor: '#ffd700' },
          },
        },
      ],
    }
    chart.setOption(option)
    charts.hkMapChart = chart
  } catch (e) {
    console.error('香港地图渲染失败', e)
  }
}

// 创建每日新增确诊趋势图
function createNewCasesChart(data) {
  const chart = echarts.init(document.getElementById('newCasesChart'))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        color: '#fff',
        fontSize: 10,
        rotate: 45,
      },
      axisLine: { lineStyle: { color: '#fff' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: '#fff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    },
    series: [
      {
        name: '新增确诊',
        type: 'line',
        data: data.new_cases,
        smooth: true,
        lineStyle: { color: '#ff6b6b', width: 2 },
        itemStyle: { color: '#ff6b6b' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,107,107,0.3)' },
            { offset: 1, color: 'rgba(255,107,107,0.1)' },
          ]),
        },
      },
    ],
  }

  chart.setOption(option)
  charts.newCasesChart = chart
}

// 创建累计确诊趋势图
function createCumulativeChart(data) {
  const chart = echarts.init(document.getElementById('cumulativeChart'))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        color: '#fff',
        fontSize: 10,
        rotate: 45,
      },
      axisLine: { lineStyle: { color: '#fff' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: '#fff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    },
    series: [
      {
        name: '累计确诊',
        type: 'line',
        data: data.cumulative_cases,
        smooth: true,
        lineStyle: { color: '#4ecdc4', width: 2 },
        itemStyle: { color: '#4ecdc4' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(78,205,196,0.3)' },
            { offset: 1, color: 'rgba(78,205,196,0.1)' },
          ]),
        },
      },
    ],
  }

  chart.setOption(option)
  charts.cumulativeChart = chart
}

// 创建地区分布图
function createDistrictChart(data) {
  const chart = echarts.init(document.getElementById('districtChart'))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      textStyle: { color: '#fff' },
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#fff', fontSize: 10 },
    },
    series: [
      {
        name: '累计确诊',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['40%', '50%'],
        data: data.districts.map((district, index) => ({
          name: district,
          value: data.cumulative_cases[index],
        })),
        label: {
          color: '#fff',
          fontSize: 10,
          formatter: '{b}\n{c}',
        },
        labelLine: {
          lineStyle: { color: '#fff' },
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 1,
        },
      },
    ],
  }

  chart.setOption(option)
  charts.districtChart = chart
}

// 创建新增确诊与康复对比图
function createComparisonChart(data) {
  const chart = echarts.init(document.getElementById('comparisonChart'))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      textStyle: { color: '#fff' },
    },
    legend: {
      data: ['新增确诊', '新增康复'],
      textStyle: { color: '#fff', fontSize: 10 },
      top: '5%',
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        color: '#fff',
        fontSize: 10,
        rotate: 45,
      },
      axisLine: { lineStyle: { color: '#fff' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: '#fff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    },
    series: [
      {
        name: '新增确诊',
        type: 'bar',
        data: data.new_cases,
        itemStyle: { color: '#ff6b6b' },
      },
      {
        name: '新增康复',
        type: 'bar',
        data: data.new_recovered,
        itemStyle: { color: '#51cf66' },
      },
    ],
  }

  chart.setOption(option)
  charts.comparisonChart = chart
}

// 创建地区发病率排行图
function createIncidenceChart(data) {
  const chart = echarts.init(document.getElementById('incidenceChart'))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#fff',
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '15%',
      right: '5%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: '#fff' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
    },
    yAxis: {
      type: 'category',
      data: data.districts,
      axisLabel: {
        color: '#fff',
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: '#fff' } },
    },
    series: [
      {
        name: '发病率(每10万人)',
        type: 'bar',
        data: data.incidence_rate,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ff9a9e' },
            { offset: 1, color: '#fecfef' },
          ]),
        },
      },
    ],
  }

  chart.setOption(option)
  charts.incidenceChart = chart
}

// 格式化数字
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 窗口大小改变时重新调整图表
window.addEventListener('resize', function () {
  Object.values(charts).forEach((chart) => {
    if (chart) {
      chart.resize()
    }
  })
})
