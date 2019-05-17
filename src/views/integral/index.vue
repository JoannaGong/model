<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-select">
        <el-select  @change="fetchData('init')" v-model="listQuery.type" placeholder="选择申请类型">
          <el-option
            :key="1"
            :label="'项目参与'"
            :value="'1'"/>
           <el-option
            :key="2"
            :label="'专业义工'"
            :value="'2'"/>
           <el-option
            :key="3"
            :label="'捐赠'"
            :value="'3'"/>
        </el-select>
      </div>
      <div class="search-select">
        <el-select  @change="fetchData('init')" v-model="listQuery.status" placeholder="选择申请状态">
          <el-option
            :key="'keyword1'"
            :label="'待处理'"
            :value="'1'"/>
            <el-option
            :key="'keyword3'"
            :label="'已驳回'"
            :value="'-1'"/>
           <el-option
            :key="'keyword2'"
            :label="'同意申请'"
            :value="'2'"/>
        </el-select>
      </div>
      <div class="search-input">
        <el-input v-model="listQuery.keyword" placeholder="请输入会员昵称/ID" />
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
      <el-table-column label="申请类型">
        <template slot-scope="scope">
          {{ scope.row.type_name }}
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="申请人ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.member_no }}
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
        layout="prev, pager, next"
        :current-page = "listQuery.page"
        @current-change="currentChange"/>
    </div>
    <form-dialog v-if="form.formTag" :showId="form.showId" @close="closeForm"/>
  </div>
</template>

<script>
import { getIntegralApply } from '@/api/table'

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
    formDialog: () => import('./form.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true,
      
      form: {
        formTag: false,
        showId: 0
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
      getIntegralApply(this.listQuery).then(response => {
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
    closeForm () {
      this.form.formTag=false
      this.fetchData()
    }
  }
}
</script>
