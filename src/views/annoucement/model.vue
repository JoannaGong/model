<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="30px" class="demo-form clearfix">
    <div style="display: flex; ">
      <h3>申请的模特</h3>
      <el-button type="primary" size="mini" style="height: 30px; margin:15px 0 0 150px;">推送模特</el-button> 
    </div>
      <el-row>
        <el-col :span="6" v-for="(item, index) in list" :key="index">
          <el-form-item>
            <el-card :body-style="{ padding: '8px 0 8px 8px' }">
              <div>
                <img :src="item.user.headUrl" class="image" />
              </div>
              <div style="margin: 0 8px; width: 33%;">
                <div>{{item.user.name}}</div>
                <div>
                  <span>{{ areaName }}</span>|
                  <span v-if="item.user.certificationSex === 0">男</span>
                  <span v-if="item.user.certificationSex === 1">女</span>
                  <span v-if="item.user.certificationSex === 2">未知</span>|
                  <span>模特</span>
                </div>
              </div>
              <div style="height: 80px; width: 26%;">
                <div v-for="ele in options" :key="ele.value">
                  <span class="text" v-if="ele.value === item.recruitingStatus">{{ ele.label }}</span>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.pageNum"
        :page-size="listQuery.limit"
        :total="pageTotal"
        align="center"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="currentChange"
      />
    </div>
    -->
  </div>
</template>
<script>
import { getAnnoucementModel, getAreaList } from "@/api/table";

export default {
  data() {
    return {
      options: [
        {
          label: "定向预约待模特同意",
          value: 0
        },
        {
          label: "定向预约模特拒绝",
          value: 2
        },
        {
          label: "模特向商家申请待确认",
          value: 3
        },
        {
          label: "模特向商家申请商家拒绝",
          value: 5
        },
        {
          label: "商户未确认模特撤销申请",
          value: 11
        },
        {
          label: "商家已确认撤销申请",
          value: 12
        },
        {
          label: "该通告售后处理中",
          value: 13
        },
        {
          label: "商家撤销通告",
          value: 15
        }
      ],
      list: [],
      form: {},
      tableKey: 0,
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1
      },
      areaName: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getAnnoucementModel({ recruitingId: this.$route.params.id }).then(res => {
        let data = res.data.pageInfo.list;
        data.forEach(item => {
          let index = this.options.findIndex(ele => ele.value === item.recruitingStatus)
          if(index != -1){
            this.list.push(item)
          }
        })
        this.pageTotal = res.data.pageInfo.total;
        this.listLoading = false;
      });
      getAreaList().then(res => {
        let data = res.data.areaList;
        data.forEach(item => {
          if (data.id === this.form.areaId) {
            this.areaName = item.name;
          }
        });
      });
    },
    currentChange(val) {
      this.listQuery.pageNum = val;
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.image {
  width: 80px;
  height: 80px;
}
/deep/.el-card {
  height: 98px;
  width: 300px;
  font-size: 12px;
  .el-card__body {
    display: flex;
  }
}
.container {
  padding: 20px 0;
}
</style>
