<template>
  <div class="app-container" >
    <el-row :gutter="20">
      <el-col :span="8">
        <p>当日收入</p>
        <h3>2000</h3>
      </el-col>
      <el-col :span="8">
        <p>当日提现</p>
        <h3>999</h3>
      </el-col>
      <el-col :span="8">
        <p>累计收入</p>
        <h3>1111</h3>
      </el-col>
    </el-row>

    <div class="filter-container">
      <div class="filter" style="margin: 30px 10px 0">
        <el-select
          @change="fetchData('init')"
          v-model="listQuery.activityStatus"
          placeholder="请选择年月"
        >
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div id="chart" style="width: 100%; height: calc(100vh - 280px);"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getMemberList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      chart: null,
      tableKey: 0,
      total: 0,
      list: null,
      listLoading: true,
      selectList: [
        {
          name: "1月份",
          value: 1
        },
        {
          name: "2月份",
          value: 2
        },
        {
          name: "3月份",
          value: 3
        },
        {
          name: "4月份",
          value: 4
        },
        {
          name: "5月份",
          value: 5
        },
        {
          name: "6月份",
          value: 6
        },
        {
          name: "7月份",
          value: 7
        },
        {
          name: "8月份",
          value: 8
        }
      ],
      form: {
        formTag: false,
        showId: 0,
        dialogTag: false
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        keyword: ""
      }
    };
  },
  created() {
    this.fetchData();
    if (this.$route.params.id) {
      this.showInfo(this.$route.params.id);
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchData(tag) {
      if (tag && tag === "init") {
        this.listQuery.page = 1;
      }
      this.listLoading = true;
      getMemberList(this.listQuery).then(response => {
        this.list = response.data;
        this.pageTotal = response.count;
        this.listLoading = false;
      });
    },
    
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("chart"))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 31; i++) {
          data.push(i)
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#fff',   // 背景色
        // title: {
        //   text: 'statistics',
        //   x: '20',
        //   top: '0',
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: '22'
        //   },
        //   subtextStyle: {
        //     color: '#90979c',
        //     fontSize: '16'
        //   }
        // },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     textStyle: {
        //       color: '#fff'
        //     }
        //   }
        // },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 50,
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '8%',
          top: '1%',
          textStyle: {
            color: '#90979c'
          },
          data: ['female', 'male', 'average']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'  // 灰色
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series: [{
          name: 'female',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',  //橙色
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            1544,
            3285,
            5208,
            3372,
            2484,
            4078
          ]
        },

        {
          name: 'male',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',   // 亮绿色
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        }, {
          name: 'average',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',   // 黄色
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      })
    }
  }
};
</script>
<style lang="scss" scoped>
p, h3 {
  text-align: center;
}
// .chart-container{
//   position: relative;
//   width: 100%;
//   height: calc(100vh - 84px);
// }
</style>
