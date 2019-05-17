<template>
  <div class="app-container">
    <div class="content-header">
      <h3>基础信息</h3>
      <el-form :model="form" ref="ruleForm" label-width="90px">
        <el-row>
          <el-col :span="12">
             <el-form-item label="活动名称:">
              <span>{{form.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名时间:">
              <div class="min-max">
                <span>{{form.sign_up_start_time}}</span>
                <span class="min-max-span">至</span>
                <span>{{form.sign_up_end_time}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进行时间:">
              <div class="min-max">
                <span>{{form.start_time}}</span>
                <span class="min-max-span">至</span>
                <span>{{form.end_time}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="项目地址:">
              <span>
                {{form.address}}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属项目:">
              <span>{{form.project_name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动状态:">
              <span>{{form.status_name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-table">
      <h3>报名成员表</h3>
      <div class="table-handle">
        <el-button type="danger" @click="stopActivity">结束活动</el-button>
        <el-button type="primary" @click="exportSignupInfo">导出报名表</el-button>
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
            {{ scope.row.complete }}
          </template>
        </el-table-column>
        <el-table-column label="报名时间">
          <template slot-scope="scope">
            {{ scope.row.created_at }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <form-dialog v-if="formTag" :showId="showId" @close="formTag=false" @addComplete="appHandle"/>
  </div>
</template>

<script>
import { getActivitiesInfo, getActivitiesMember, exportSignup } from '@/api/table'
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
    formDialog: () => import('./indexInfoForm.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true,
      showId: '',
      formTag: false,
      activityStatus: [{
        name: '报名中',
        value: 1
      }],
      form: {
        name: '',
        sign_up_start_time: '',
        sign_up_end_time: '',
        start_time: '',
        end_time: '',
        address: '',
        project_id: '',
        project_name: '',
        status_name: ''
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        activity_id: '',
        keyword: ''
      }
    }
  },
  created() {
    this.showId = Number(this.$route.params.id)
    this.listQuery.activity_id = this.showId
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getActivitiesMember(this.listQuery).then(response => {
        this.list = response.data
        this.pageTotal = response.count
        this.listLoading = false
        for (let x in this.list) {
          let tempItem = JSON.parse(this.list[x].items)
          let total = tempItem.length
          let count = 0
          for (let y in tempItem) {
            if (tempItem[y].ready === true) {
              count++
            }
          }
          this.list[x].complete = `${count}/${total}`
        }
      })
      if (this.showId !== 0) {
        getActivitiesInfo({id: this.showId})
          .then(res => {
            for (let x in this.form) {
              for (let y in res.data) {
                if (x === y) {
                  this.form[x] = res.data[y]
                }
              }
            }
          })
      }
    },
    exportSignupInfo () {
      window.location.href = '/api/exportSignupMembers?activity_id=' + this.showId
      // exportSignup({
      //   activity_id: this.showId
      // }).then(res => {
      //   console.log(res)
      // })
    },
    currentChange(e) {
      console.log(e)
      this.listQuery.page = e
      this.fetchData()
    },
    stopActivity () {
      this.formTag = true
    },
    appHandle () {
      this.formTag = false
      this.fetchData()
    },
  }
}
</script>
<style lang="scss" scoped>
.content-header{
  .min-max{
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    .min-max-span{
      padding: 0 10px;
    }
  }
}
.content-table{
  .table-handle{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
