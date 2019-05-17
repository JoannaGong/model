<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-select">
        <el-select  @change="fetchData('init')" v-model="listQuery.project_type_id" placeholder="请选择项目类型">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="search-select">
        <el-select  @change="fetchData('init')" v-model="listQuery.cycle_id" placeholder="请选择项目角色">
          <el-option v-for="(item, index) in selectListSecond" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="fetchData('init')">搜索</el-button>
    </div>
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
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="项目周期" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cycle_name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="项目角色" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_type_name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="项目类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project_type_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :total="pageTotal"
        background
        layout="prev, pager, next"
        :current-page = "listQuery.page"
        @current-change="currentChange"/>
    </div>
    <form-dialog v-if="form.formTag" :showId="form.showId" @close="form.formTag=false" @addComplete="appHandle"/>
  </div>
</template>

<script>
import { getProjectsList, getDictionariesList, delProjects } from '@/api/table'

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
    formDialog: () => import('./indexForm.vue')
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
      getProjectsList(this.listQuery).then(response => {
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
      getDictionariesList({type: 3}).then(res => {
        if (res.status === 1) {
          this.selectList = res.data
        }
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
      this.$router.push({path: '/project/table/' + id})
    },
    appHandle () {
      this.form.formTag = false
      this.fetchData()
    },
    delItem (id) {
      let that = this
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delProjects({id: id})
            .then(res => {
              if (res.status === 1) {
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
