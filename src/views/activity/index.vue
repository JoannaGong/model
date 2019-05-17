<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-select">
        <el-select v-model="listQuery.status"  @change="fetchData('init')" placeholder="请选择活动状态">
          <el-option v-for="(item, index) in activityStatus" :key="index" :label="item.name" :value="item.value"></el-option>
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
      <el-table-column label="活动名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="活动状态">
        <template slot-scope="scope">
          {{ scope.row.status_name }}
        </template>
      </el-table-column>
      <el-table-column label="报名时间" width="310" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sign_up_start_time.split(' ')[0] }} 至 {{ scope.row.sign_up_end_time.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目">
        <template slot-scope="scope">
          {{ scope.row.project_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showMember(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini"  @click="delItem(scope.row.id)">删除</el-button>
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
import { getActivities, delActivities } from '@/api/table'
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
      // 0:所有 1:报名未开始 2:报名中 3:报名结束/活动未开始 4:活动进行中 5:活动已结束
      activityStatus: [{
        name: '所有',
        value: 0
      }, {
        name: '报名未开始',
        value: 1
      }, {
        name: '报名中',
        value: 2
      }, {
        name: '报名结束/活动未开始',
        value: 3
      }, {
        name: '活动进行中',
        value: 4
      }, {
        name: '活动已结束',
        value: 5
      }],
      form: {
        formTag: false,
        showId: 0
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        status: ''
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
      getActivities(this.listQuery).then(response => {
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
    showMember(id) {
      this.form.showId = id
      // this.form.formTag = true
      this.$router.push({path: '/activity/list/' + id})
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
          delActivities({id: id})
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
