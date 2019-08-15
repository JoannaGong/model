<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter" style="margin-right: 10px">
        <el-select
          @change="fetchData('init')"
          v-model="listQuery.activityStatus"
          placeholder="请选择身份类型"
        >
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          v-model="listQuery.queryString"
          placeholder="请输入模特昵称/ID/通告编号进行搜索"
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
      <el-table-column align="center" label="会员昵称">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="身份类型">
        <template slot-scope="scope">
          <span v-if="scope.row.roleName == 1">未认证用户</span>
          <span v-if="scope.row.roleName == 2">模特</span>
          <span v-if="scope.row.roleName == 3">经纪公司</span>
          <span v-if="scope.row.roleName == 4">商户</span>
          <span v-if="scope.row.roleName == 5">其他职业(摄影师化妆师等)</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="190">
        <template slot-scope="scope">{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="showInfo(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="pushModel(scope.row.id)">推送</el-button>
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
import { getMemberList } from "@/api/table";
import { getToken } from "@/utils/auth";
import { constants } from 'fs';

export default {
  components: {
    modelDetail: () => import("./detail.vue")
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      selectList: [
        {
          name: "未认证用户",
          value: 1
        },
        {
          name: "模特",
          value: 2
        },
        {
          name: "经纪公司",
          value: 3
        },
        {
          name: "商户",
          value: 4
        },
        {
          name: "其他职业(摄影师化妆师等)",
          value: 5
        }
      ],
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1,
        queryRoleName: 1,
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
      if (tag === "init") {
        this.listQuery.pageNum = 1;
      }
      this.listLoading = true;
      getMemberList(this.listQuery).then(response => {
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    showInfo(val) {
      // console.log(val)
      if(val.roleName === 2){
        this.$router.push({
          path: 'role/' + val.id + '/modelInfo',
          query: {
            pageNum: this.listQuery.pageNum
          }
        })
      }else if(val.roleName === 3){
        this.$router.push({
          path: 'role/' + val.id + '/companyInfo',
          query: {
            pageNum: this.listQuery.pageNum
          }
        })
      }else if(val.roleName === 1){
        this.$router.push({
          path: 'role/' + val.id,
          query: {
            pageNum: this.listQuery.pageNum
          }
        })
      }else if(val.roleName === 4){
        this.$router.push({
          path: 'role/' + val.id + '/merchantInfo',
          query: {
            pageNum: this.listQuery.pageNum
          }
        })
      }
      
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