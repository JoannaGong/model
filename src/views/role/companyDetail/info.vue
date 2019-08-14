<template>
  <div class="modelInfo">
    <el-form :model="form" label-width="90px">
      <div style="float: left; padding-top: 8px;">
        <span class="el-dialog__title" style="font-size: 15px;">公司简介</span>
      </div>
      <el-form-item>{{ form.certificationText }}</el-form-item>
      <div style="margin-bottom: 10px;">
        <span class="el-dialog__title" style="font-size: 15px;">公司相册</span>
      </div>
      <el-form-item>
        <viewer :images="imgs">
          <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index">
            <img :src="src.photoUrl" />
          </div>
        </viewer>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 10px;">
      <span class="el-dialog__title" style="font-size: 15px;">旗下模特</span>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      empty-text="暂无数据"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template
          slot-scope="scope"
        >{{ scope.$index + listQuery.limit * (listQuery.pageNum - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="模特昵称">
        <template slot-scope="scope">{{ scope.row.modelUser.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="模特id">
        <template slot-scope="scope">{{ scope.row.modelUser.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="签约时间" width="200">
        <template
          slot-scope="scope"
        >{{ scope.row.modelUser.createdTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { getMemberInfo, getPhotoInfo, getModellist } from "@/api/table";
export default {
  data() {
    return {
      imgs: [],
      form: {},
      tableKey: 0,
      list: null,
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1
      }
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      getMemberInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.user;
      });
      getPhotoInfo({ userId: this.$route.params.id }).then(res => {
        // console.log(res)
        this.imgs = res.data.userPhotoAlbumList;
      });
      getModellist({ brokerageUserId: this.$route.params.id }).then(res => {
        // console.log(res)
        this.list = res.data.pageinfo.list
        this.pageTotal = res.data.pageinfo.total
        this.listLoading = false
      })
    },
    currentChange(val) {
      this.listQuery.pageNum = val;
      this.fetchData();
    },
  }
};
</script>
<style lang="scss" scoped>
.form-dialog {
  margin-top: -30px;
}
.model-pics {
  width: 150px;
  height: 200px;
  margin: 0 10px 10px 0;
  float: left;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>

