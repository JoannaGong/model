<template>
  <div class="modelInfo">
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
      <el-table-column align="center" label="作品名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="收费价格(￥)" width="160">
        <template
          slot-scope="scope"
        >{{ scope.row.chargeFlag === 0 ? "不需要付费" : scope.row.chargeCount }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template
          slot-scope="scope"
        >{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
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
import { getMemberInfo, getPhotoInfo } from "@/api/table";
export default {
  data() {
    return {
      imgs: [],
      form: {}
    };
  },
  created() {
    getMemberInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.user;
    });
  },
  methods: {}
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

