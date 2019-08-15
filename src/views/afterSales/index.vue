<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      empty-text="暂无数据"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.pageNum - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="通告名称">
        <template slot-scope="scope">{{ scope.row.merchantsRecruiting.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="申请商户" width="180">
        <template slot-scope="scope">{{ scope.row.contactName }}</template>
      </el-table-column>
      <el-table-column align="center" label="售后状态" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.afterSaleStatus  === 0">待售后</span>
          <span v-if="scope.row.afterSaleStatus  === 1">售后结束通告</span>
          <span v-if="scope.row.afterSaleStatus  === 2">售后重置通告</span>
          <span v-if="scope.row.afterSaleStatus  === 3">商户取消售后</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间" width="190">
        <template slot-scope="scope">{{ scope.row.createdTime }}</template>
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
import { getAfterSales } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1,
        keyword: "",
      }
    };
  },
  created() {
    this.fetchData();
    if (this.$route.query.pageNum) {
      this.listQuery.pageNum = parseInt(this.$route.query.pageNum)
      this.$route.query.pageNum = null
    }
  },
  methods: {
    fetchData(tag) {
      if (tag === "init") {
        this.listQuery.pageNum = 1;
      }
      this.listLoading = true;
      getAfterSales(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    showInfo(id) {
      this.$router.push({
        path: '/afterSales/index/' + id,
        query: {
          pageNum: this.listQuery.pageNum
        }
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
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
      this.listQuery.pageNum = val;
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
}
</style>
