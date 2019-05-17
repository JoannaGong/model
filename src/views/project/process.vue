<template>
  <div class="app-container">
    <!-- <div class="search-hadle">
      <div class="search-select">
        <el-select v-model="listQuery.role_type" placeholder="请选择项目角色">
          <el-option v-for="(item, index) in selectListSecond" :key="index" :label="item.name" :value="item.value"></el-option>
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
      <el-table-column label="流程名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
import { getProcessList, delProcess } from '@/api/table'

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
    formDialog: () => import('./processForm.vue')
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
        role_type: '',
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
      getProcessList(this.listQuery).then(response => {
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
      // this.form.formTag = true
      this.$router.push({path: '/project/process/' + id})
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
          delProcess({id: id})
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
