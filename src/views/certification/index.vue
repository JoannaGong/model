<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="search">
        <el-input
          v-model="listQuery.queryString"
          placeholder="请输入申请人昵称/ID进行搜索"
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
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="申请人昵称">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="申请人id">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="认证类型">
        <template slot-scope="scope">
          <span v-if="scope.row.certificationSonType == 0">个人</span>
          <span v-if="scope.row.certificationSonType == 1">企业</span>
          <span v-if="scope.row.certificationSonType == 2">男模</span>
          <span v-if="scope.row.certificationSonType == 3">女模</span>
          <span v-if="scope.row.certificationSonType == 4">童星</span>
          &nbsp;
          <span v-if="scope.row.certificationType == 0">商户</span>
          <span v-if="scope.row.certificationType == 1">艺人</span>
          <span v-if="scope.row.certificationType == 2">其他职业</span>
          <span v-if="scope.row.certificationType == 3">经纪公司</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请状态">
        <template slot-scope="scope">
          <span v-if="scope.row.certificationCheckStatus == 0">未审核</span>
          <span v-if="scope.row.certificationCheckStatus == 1">审核通过</span>
          <span v-if="scope.row.certificationCheckStatus == 2">审核驳回</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">{{ scope.row.createdTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
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
      list: [],
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        queryString: "",
        roleName: 1
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(tag) {
      if (tag === "init") {
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
      this.$router.push({ path: '/certification/index/' + id })
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