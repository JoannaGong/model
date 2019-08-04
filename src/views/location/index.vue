<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="search">
        <el-input
          v-model="listQuery.queryString"
          placeholder="请输入名称、城市进行搜索"
          @keyup.enter.native="handleFilter"
          style="width: 200px;"
          class="filter-item"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <div class="handle-create">
        <el-button type="primary" @click="showInfo(0)">新建拍摄地</el-button>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.pageNum - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="拍摄地名称">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="center" label="城市">
        <template slot-scope="scope">{{ scope.row.areaId }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否推荐" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.areaId == 0">后台用户</span>
          <span v-if="scope.row.areaId == 1">未认证用户</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
import { getLocation, delLocation } from "@/api/table";
import { getToken } from "@/utils/auth";
import { constants } from 'fs';

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
      getLocation(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    del(id) {
      this.$confirm("此操作将删除该拍摄地, 是否继续?", "提示", {
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
        path: '/location/index/' + id,
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
