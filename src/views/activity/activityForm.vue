<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="活动名称：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="主办方：">{{ form.organizersName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="报名时间：">{{ form.signStartTime }} - {{ form.signStopTime }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="活动时间：">{{ form.activityStartTime }} - {{ form.activityStopTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="100"> 
        <el-col :span="11">
          <el-form-item label="活动状态：">
            <span v-if="form.status === 0">未开始报名</span>
            <span v-if="form.status === 1">报名进行中</span>
            <span v-if="form.status === 2">报名截止活动未开始</span>
            <span v-if="form.status === 3">活动进行中</span>
            <span v-if="form.status === 4">活动结束</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="报名费：">{{ form.applicationPrice }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="报名人数：">{{ form.activityGuestCount }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面展示：" prop="coverPicUrl">
        <img :src="form.coverPicUrl" style="width: 150px; height: 200px;" />
      </el-form-item>
      <h3>活动介绍</h3>
      <el-form-item prop="introduce">
        <vue-ueditor-wrap
          ref="ueditor"
          v-model="form.introduce"
          :destroy="false"
          :config="config"
          style="line-height:20px"
        ></vue-ueditor-wrap>
      </el-form-item>
    </el-form>
    <h3>报名成员表</h3>
    <div class="table-handle" :headers="urlHeaders">
      <el-button type="primary" size="small" @click="exportActivityForm">导出报名表</el-button>
    </div>
    <el-table
      empty-text="暂无数据"
      :data="list"
      style="width: 100%"
      v-loading="listLoading"
      :key="tableKey"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="id" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位名称" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button @click="checkGuest(scope.row.id)" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getActivityInfo, getActivityForm, getForm } from "@/api/table";
import { getToken } from "@/utils/auth";
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      urlHeaders: { token: getToken() },
      tableKey: 0,
      form: {},
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageCount: 10,
        activityId: ""
      },
      config: {
        elementPathEnabled: false,
        toolbars: null,
        readonly: true,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        serverUrl:
          "http://101.37.156.106/model_api/ueditorHandler/ueditorConfig"
      }
    };
  },
  created() {
    this.listQuery.activityId = this.$route.query && this.$route.query.id;
    getActivityInfo({ id: this.$route.params.id }).then(response => {
        let data = response.data.activity
        data.introduce = data.introduce.replace(
          /style="/g,
          'style="max-width:100% !important;'
        );
        this.form = data
    })
    getActivityForm({ activityId: this.$route.params.id }).then(res => {
        this.list = res.data.pageInfo.list
        this.listLoading = false
    })
  },
  methods: {
    exportActivityForm() {
      // getForm({ activityId: this.$route.params.id }).then(res => {
      //   console.log(res)
      // })
      
      window.location.href =
        process.env.BASE_API +
        "activityGuestController/downloadActivityGuestXls?activityId=" +
        this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .min-max {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    .min-max-span {
      padding: 0 10px;
    }
  }
}
.app-container {
  .table-handle {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
