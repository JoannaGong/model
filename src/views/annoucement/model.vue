<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="30px" class="demo-form clearfix">
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
                <div v-for="(ele, index) in options" :key="index">
                  <span class="text" v-if="index === item.recruitingStatus">{{ ele }}</span>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  </div>
</template>
<script>
import { getAnnoucementModel, getAreaList } from "@/api/table";

export default {
  data() {
    return {
      options: [
        "定向预约待模特同意",
        //
        "定向预约模特同意",
        "定向预约模特拒绝",
        "模特向商家申请待确认",
        //
        "模特向商家申请商家同意",
        "模特向商家申请商家拒绝",
        //
        "工作中",
        //
        "结束工作商家未确认",
        //
        "结束工作商家确认",
        //
        "商家确认待评论",
        //
        "已评论",
        "商户未确认模特撤销申请",
        "商家已确认撤销申请",
        "该通告售后处理中",
        //
        "结束工作系统48小时自动确认",
        "商家撤销通告"
      ],
      list: null,
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
        this.list = res.data.pageInfo.list;
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
</style>
