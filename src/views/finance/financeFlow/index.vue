<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter" style="margin-right: 10px">
        <el-select
          @change="fetchData('init')"
          v-model="listQuery.activityStatus"
          placeholder="请选择类型"
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
          placeholder="请输入昵称/ID进行搜索"
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
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column align="center" label="id">
        <template slot-scope="scope">{{ scope.row.member_no }}</template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">{{ scope.row.total_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
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
      total: 0,
      list: null,
      listLoading: true,
      selectList: [
        {
          name: "提现",
          value: 1
        },
        {
          name: "充值",
          value: 2
        },
        {
          name: "购买服务",
          value: 3
        },
        {
          name: "发布通告",
          value: 4
        },
        {
          name: "通告退款",
          value: 5
        },
        {
          name: "完成通告",
          value: 6
        },
        {
          name: "模特抽成",
          value: 7
        },
        {
          name: "提供服务",
          value: 8
        }
      ],
      form: {
        formTag: false,
        showId: 0,
        dialogTag: false
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
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
        this.listQuery.page = 1;
      }
      this.listLoading = true;
      getMemberList(this.listQuery).then(response => {
        this.list = response.data
        this.pageTotal = response.count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1;
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
      this.listQuery.page = val;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    }
  }
};
</script>