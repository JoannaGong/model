<template>
  <div class="artist">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      empty-text="暂无数据"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="作品名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="收费价格(￥)" width="160">
        <template slot-scope="scope">{{ scope.row.chargeFlag === 0 ? "不需要付费" : scope.row.chargeCount }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
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
        :current-page="listQuery.page"
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
import { getMemberList, getWorks } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  props: {
    showId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      total: 0,
      list: null,
      listLoading: true,
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
      // getMemberList(this.listQuery).then(response => {
      //   this.list = response.data
      //   this.pageTotal = response.count
      //   this.listLoading = false
      // })
      getWorks({id: this.$route.params.id}).then(response => {
        console.log(response)
        this.list = response.data.worksDetailsList
      })
    },
    showInfo(id) {
      this.form.showId = id
      this.form.formTag = true
    },
    appHandle() {
      this.form.formTag = false;
      this.fetchData();
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    },
  }
}
</script>
<style lang="scss" scoped>
.form-dialog {
  margin-top: -30px;
}
</style>