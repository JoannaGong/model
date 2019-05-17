<template>
  <div class="app-container">
    <!-- <div class="search-hadle">
      <div class="search-select">
        <el-select v-model="listQuery.type" placeholder="请选择字典类型">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="fetchData('init')">搜索</el-button>
    </div> -->
    <div class="handle-handle">
      <el-button type="success" @click="showInfo(0)">创建</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :total="pageTotal"
        background
        :current-page = "listQuery.page"
        layout="prev, pager, next"
        @current-change="currentChange"/>
    </div>
    <form-dialog v-if="form.formTag" :showId="form.showId" @close="form.formTag=false" @addComplete="appHandle"/>
  </div>
</template>

<script>
import { getRolesList, delRoles } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    formDialog: () => import('./roleForm.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectList: [{
        name: '活动周期',
        value: 1
      }, {
        name: '驳回理由',
        value: 2
      }, {
        name: '活动类型',
        value: 3
      }, {
        name: '岗位',
        value: 4
      }],
      form: {
        formTag: false,
        showId: 0
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        type: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatter(row, column) {
      let typeName = ''
      switch (row.type) {
        case 1:
          typeName = '活动周期'
          break;
        case 2:
          typeName = '驳回理由'
          break;
        case 3:
          typeName = '活动类型'
          break;
        case 4:
          typeName = '岗位'
          break;
      }
      return typeName
    },
    fetchData(tag) {
      if (tag && tag === 'init') {
        this.listQuery.page = 1
      }
      this.listLoading = true
      getRolesList(this.listQuery).then(response => {
        this.list = response.data
        this.pageTotal = response.count
        this.listLoading = false
      })
    },
    currentChange(e) {
      console.log(e)
      this.listQuery.page = e
      this.fetchData()
    },
    showInfo(id) {
      console.log(this.form.formTag)
      this.form.showId = id
      this.form.formTag = true
    },
    appHandle () {
      this.form.formTag = false
      this.fetchData()
    },
    deleteItem (id) {
      let that = this
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoles({
          id: id
        })
          .then(data => {
            if (data.status === 1) {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1500,
                onClose () {
                  for (let x in that.list) {
                    if (that.list[x].id === id) {
                      that.list.splice(x, 1)
                    }
                  }
                }
              })
            } else {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          })
      })
    }
  }
}
</script>
