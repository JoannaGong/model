<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex">
      <div class="filter">
        <el-select @change="fetchData('init')" v-model="listQuery.groupName" placeholder="筛选热门地区">
          <el-option
            v-for="(item, index) in cityList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="handle-create">
        <el-button type="primary" @click="showInfo(0)">新建</el-button>
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
      <el-table-column align="center" label="地区名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否热门">
        <template slot-scope="scope">
          <span v-if="scope.row.hotFlag === 1">是</span>
          <span v-if="scope.row.hotFlag === 0">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">查看</el-button> -->
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
import { getCity, delCity } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      cityList: [{
        name: "非热门地区",
        value: 0
      },{
        name: "热门地区",
        value: 1
      }],
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1,
        keyword: "",
        hotFlag: ""
      },
      form: {},
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
      getCity(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    del(id) {
      this.$confirm("此操作将删除该地区, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCity({id: id}).then(response => {
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
        path: '/type/city/' + id,
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
