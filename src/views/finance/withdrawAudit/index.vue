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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="会员昵称">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column align="center" label="id">
        <template slot-scope="scope">{{ scope.row.member_no }}</template>
      </el-table-column>
      <el-table-column align="center" label="身份类型">
        <template slot-scope="scope">{{ scope.row.total_integral }}</template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">{{ scope.row.available_integral }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="pushModel(scope.row.id)">推送</el-button>
        </template>
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
  components: {
    modelDetail: () => import("./detail.vue")
  },
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
    showInfo(id) {
      this.form.showId = id
      this.$router.push({ path: 'role/' + id + '/info' })
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