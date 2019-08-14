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
      <el-table-column align="center" label="通告名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="工作类型">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="通告状态">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="100">
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
import { getMemberInfo, getAnnoucement } from "@/api/table";
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
    this.listLoading = true;
    getAnnoucement({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.list = res.data.pageInfo.list
      this.pageTotal = res.data.pageInfo.total
      this.listLoading = false
    });
  },
  methods: {
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

