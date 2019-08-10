<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter">
        <el-select @change="fetchData('init')" v-model="listQuery.groupName" placeholder="选择工作类型">
          <el-option
            v-for="(item, index) in workList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="filter" style="margin: 0 10px;">
        <el-select @change="fetchData('init')" v-model="listQuery.groupName" placeholder="选择通告状态">
          <el-option
            v-for="(item, index) in announceList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          v-model="listQuery.queryString"
          placeholder="请输入发布人、通告进行搜索"
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
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.pageNum - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="通告编号" width="100">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="center" label="通告名称" width="180">
        <template slot-scope="scope">{{ scope.row.areaId }}</template>
      </el-table-column>
      <el-table-column align="center" label="工作类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.recommendedFlug == '0'">不推荐</span>
          <span v-if="scope.row.recommendedFlug == '1'">推荐</span>
        </template>
      </el-table-column>
       <el-table-column align="center" label="通告状态">
        <template slot-scope="scope">
          <span v-if="scope.row.checkStatus == 0">待审核</span>
          <span v-if="scope.row.checkStatus == 1">审核通过</span>
          <span v-if="scope.row.checkStatus == 2">审核驳回</span>
          <span v-if="scope.row.checkStatus == 3">无人申请商户撤销通告</span>
          <span v-if="scope.row.checkStatus == 4">有人申请商户撤销通告</span>
          <span v-if="scope.row.checkStatus == 5">已确立订单关系商户撤销通告</span>
          <span v-if="scope.row.checkStatus == 6">商户申请售后</span>
          <span v-if="scope.row.checkStatus == 7">订单确认人满</span>
          <span v-if="scope.row.checkStatus == 8">订单商户未确认完成</span>
          <span v-if="scope.row.checkStatus == 9">商户确认订单完成</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布人昵称" width="130">
        <template slot-scope="scope">{{ scope.row.areaId }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="180">
        <template slot-scope="scope">{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
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
import { getAnnoucement } from "@/api/table";
import { getToken } from "@/utils/auth";
import { constants } from 'fs';

export default {
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: [],
      announceList: [],
      workList: [],
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
      getAnnoucement(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })
    },
    showInfo(id) {
      this.$router.push({
        path: '/announcement/index/' + id,
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
// .filter-container {
//   display: flex;
//   justify-content: space-between;
// }
</style>
