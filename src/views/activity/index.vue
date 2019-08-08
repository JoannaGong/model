<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter">
        <el-select @change="fetchData('init')" v-model="listQuery.groupName" placeholder="筛选活动状态">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="handle-create">
        <el-button type="primary" @click="showInfo(0)">新建活动</el-button>
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
      <el-table-column align="center" label="活动名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="活动状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">未开始报名</span>
          <span v-if="scope.row.status === 1">报名进行中</span>
          <span v-if="scope.row.status === 2">报名截止活动未开始</span>
          <span v-if="scope.row.status === 3">活动进行中</span>
          <span v-if="scope.row.status === 4">活动结束</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名开始时间" width="190">
        <template slot-scope="scope">{{ scope.row.signStartTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="报名结束时间" width="190">
        <template slot-scope="scope">{{ scope.row.signStopTime}}</template>
      </el-table-column>
      <el-table-column align="center" label="报名人数" width="100">
        <template slot-scope="scope">{{ scope.row.areaId }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="godetail(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
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
import { getActivity, delActivity } from "@/api/table";
import { getToken } from "@/utils/auth";
import { constants } from 'fs';

export default {
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      options: [],
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
      getActivity(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    godetail(id){
      this.$router.push({
        path: '/activity/activityForm/' + id,
        query: {
          pageNum: this.listQuery.pageNum
        }
      })
    },
    del(id) {
      this.$confirm("此操作将删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delActivity({id: id}).then(response => {
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
        path: '/activity/index/' + id,
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
