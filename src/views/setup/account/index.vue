<template>
  <div class="app-container">
    <div class="filter-container"  style="float: right;">
      <div class="handle-create">
        <el-button type="primary" @click="showInfo(0)">新增用户</el-button>
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
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headUrl" style="width: 50px;" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="190">
        <template slot-scope="scope">{{ scope.row.updatedTime === null ? scope.row.createdTime : scope.row.updatedTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showInfo(scope.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="primary" @click="editRole(scope.row.permissionsId)">修改角色</el-button> -->
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
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
<!-- 
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="permissionsForm"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-personForm"
      >
        <el-form-item label="角色显示名称：">
          <el-input v-model="permissionsForm.displayName" disabled />
        </el-form-item>
        <el-form-item label="所属角色：">
          <el-select v-model="permissionsForm.name" placeholder="请选择所属角色">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('permissionsForm')">确定</el-button>
          <el-button @click="back()">取消</el-button>
        </span>
    </el-dialog>
-->
  </div>
</template>

<script>
import { getUser, delUser, getRoleInfo, updateRole, getRoleList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      dialogVisible: false,
      tableKey: 0,
      total: 0,
      list: [],
      listLoading: true,
      pageTotal: 0,
      listQuery: {
        limit: 10,
        pageNum: 1,
        queryRoleName: 0,
      },
      options: [],
      permissionsName: "",
      permissionsForm: {},
      rules: {

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
      getUser(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.pageInfo.list
        this.pageTotal = response.data.pageInfo.total
        this.listLoading = false
      })      
    },
    showInfo(id) {
      this.$router.push({
        path: '/setup/account/' + id,
        query: {
          pageNum: this.listQuery.pageNum
        }
      })
    },
    editRole(id){
      this.dialogVisible = true
      getRoleList().then(res => {
        // console.log(res)
        this.options = res.data.permissionList
      })
      getRoleInfo({ id: id }).then(res => {
        // console.log(res)
        this.permissionsForm = res.data.permission
      })
    },
    handleClose(done) {
      done();
    },
    del(id) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser({id: id}).then(response => {
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
/deep/ .el-dialog {
  width: 33% !important;
  .is-disabled {
    width: 65%;
  }
}
/deep/ .el-dialog .el-form-item__content {
  margin-left: 110px !important;
}
/deep/ .el-form-item__label {
  width: 110px !important;
}
</style>
