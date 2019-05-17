<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-input">
        <el-input v-model="listQuery.keyword" placeholder="请输入会员姓名/身份证号" />
      </div>
      <el-button type="primary" @click="fetchData('init')">搜索</el-button>
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
      <el-table-column label="会员昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="会员id" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.member_ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用积分" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.available_integral }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="总积分" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.total_integral }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
          <el-button type="success" size="mini" @click="setTag(scope.row.id)">设置标签</el-button>
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
    <form-dialog v-if="form.formTag" :showId="form.showId" @close="form.formTag=false"/>
    <tag-dialog v-if="form.dialogTag" :showId="form.showId" @close="form.dialogTag=false" @complate="addComplate"/>
  </div>
</template>

<script>
import { getMemberList } from '@/api/table'

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
    formDialog: () => import('./form.vue'),
    tagDialog: () => import('./dialog.vue')
  },
  data() {
    return {
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
        keyword: ''
      }
    }
  },
  created() {
    this.fetchData()
    if (this.$route.params.id) {
      this.showInfo(this.$route.params.id)
    }
  },
  methods: {
    fetchData(tag) {
      if (tag && tag === 'init') {
        this.listQuery.page = 1
      }
      this.listLoading = true
      getMemberList(this.listQuery).then(response => {
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
    setTag(id) {
      this.form.showId = id
      this.form.dialogTag = true
    },
    addComplate () {
      this.fetchData()
      this.form.dialogTag = false
    }
  }
}
</script>
