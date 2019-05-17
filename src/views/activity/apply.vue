<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-select">
        <el-select v-model="listQuery.project_type_id" @change="fetchData('init')" placeholder="请选择活动类型">
          <el-option v-for="(item, index) in selectList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="search-input">
        <el-input v-model="listQuery.keyword" placeholder="请输入活动名称/会员昵称/ID" />
      </div>
      <el-button type="primary" @click="fetchData('init')">搜索</el-button>
    </div>
    <!-- <div class="handle-handle">
      <el-button type="success" @click="showInfo(0)">创建</el-button>
    </div> -->
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
          {{ scope.row.activity_name }}
        </template>
      </el-table-column>
      <el-table-column label="活动类型">
        <template slot-scope="scope">
          {{ scope.row.project_type_name }}
        </template>
      </el-table-column>
      <el-table-column label="报名状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="会员昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="事项完成度">
        <template slot-scope="scope">
          {{ scope.row.finish_status }}
        </template>
      </el-table-column>
      <el-table-column label="报名时间">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
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
import { getSignupList, delSignup, getDictionariesList, getSignupsList } from '@/api/table'

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
    formDialog: () => import('./applyForm.vue')
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
      getSignupsList(this.listQuery).then(response => {
        this.list = response.data
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
      this.$router.push({path: '/activity/apply/' + id})
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
