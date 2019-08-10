<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter" style="margin-right: 10px">
        <el-select
          @change="fetchData('init')"
          v-model="listQuery.activityStatus"
          placeholder="提现状态筛选"
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
          placeholder="请输入昵称进行搜索"
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.pageNum - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现类型">
        <template slot-scope="scope">{{ scope.row.member_no }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现金额">
        <template slot-scope="scope">{{ scope.row.total_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现状态">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现账户">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="提现时间">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="100">
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
import { getMemberList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: null,
      listLoading: true,
      selectList: [
        {
          name: "模特",
          value: 1
        },
        {
          name: "经纪公司",
          value: 2
        },
        {
          name: "个人商户",
          value: 3
        },
        {
          name: "企业商户",
          value: 4
        }
      ],
      form: {
      },
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
    if (this.$route.params.id) {
      this.showInfo(this.$route.params.id)
    }
  },
  methods: {
    fetchData(tag) {
      if (tag && tag === "init") {
        this.listQuery.pageNum = 1;
      }
      this.listLoading = true;
      getMemberList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    showInfo(id) {
      this.$router.push({
        path: '/finance/withdrawAudit/' + id,
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
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    }
  }
};
</script>