<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="search">
        <el-input
          v-model="listQuery.queryString"
          placeholder="请输入下单人昵称进行搜索"
          @keyup.enter.native="handleFilter"
          style="width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
    </div>
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
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope">{{ scope.row.professionalService.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="下单用户" width="120">
        <template slot-scope="scope">{{ scope.row.user.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="金额" width="100">
        <template slot-scope="scope">{{ scope.row.professionalService.price }}</template>
      </el-table-column>
      <el-table-column align="center" label="服务状态" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 0 ? "进行中" : "已完成" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买时间" width="190">
        <template slot-scope="scope">{{ scope.row.createdTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
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
import { getService } from "@/api/table";
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
        this.listQuery.page = 1;
      }
      this.listLoading = true;
      getService(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    del(id) {
      this.$confirm("此操作将删除该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLocation({id: id}).then(response => {
            if (response.code === 101) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.fetchData();
            } else {
              this.$message.error(response.msg);
            }
          });
        })
        .catch(err => {
          this.$message.warning("已取消删除！");
        });
    },
    showInfo(id) {
      this.$router.push({
        path: '/service/index/' + id,
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
