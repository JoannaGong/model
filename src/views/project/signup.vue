<template>
  <div class="app-container">
   
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
      <el-table-column label="报名表名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deltItem(scope.row.id)">删除</el-button>
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
import { getSignupList, delSignup } from '@/api/table'

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
    formDialog: () => import('./signupForm.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectList: [],
      selectListSecond: [{
        name: '义工',
        value: 1
      }, {
        name: '队员',
        value: 2
      }],
      form: {
        formTag: false,
        showId: 0
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        cycle_id: '',
        project_type_id: '',
        keyword: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(tag) {
      if (tag && tag === 'init') {
        this.listQuery.page = 1
      }
      this.listLoading = true
      getSignupList(this.listQuery).then(response => {
        this.list = response.data
        for (let x in this.list) {
          let stockData = this.list[x].stock
          let stockTotal = 0
          for (let y in stockData) {
            stockTotal += Number(stockData[y].count)
          }
          this.list[x].stockTotal = stockTotal
        }
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
      // this.form.formTag = true
      this.$router.push({path: '/project/signup/' + id})
    },
    appHandle () {
      this.form.formTag = false
      this.fetchData()
    },
    deltItem (id) {
      let that = this
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSignup({id: id})
            .then(res => {
              if (res.status === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  duration: 1500,
                  onClose: () => {
                    for (let x in this.list) {
                      if(this.list[x].id === id) {
                        this.list.splice(x, 1)
                      }
                    }
                  }
                })
              }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>
