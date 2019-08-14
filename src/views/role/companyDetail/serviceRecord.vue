<template>
  <div class="artist">
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
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="通告名称">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column align="center" label="服务状态" width="160">
        <template slot-scope="scope">{{ scope.row.member_no }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="200">
        <template slot-scope="scope">{{ scope.row.total_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="工作总评分" width="100">
        <template slot-scope="scope">{{ scope.row.total_integral }}</template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-size="listQuery.limit"
        :total="pageTotal"
        align="center"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMemberList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      form: {
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1
      }
    };
  },
  created() {
    this.fetchData();
    if (this.$route.params.id) {
      this.showInfo(this.$route.params.id)
    }
  },
  methods: {
    fetchData(tag) {
      this.listLoading = true;
      getMemberList(this.listQuery).then(response => {
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },

    showInfo(id) {
      
    },
    currentChange(val) {
      this.listQuery.pageNum = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    }
  }
}
</script>
<style lang="scss" scoped>
.form-dialog {
  margin-top: -30px;
}
</style>