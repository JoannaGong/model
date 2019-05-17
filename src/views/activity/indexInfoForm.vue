<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="积分结算" width="35%" :before-close="beforeClose">
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
        <el-table-column label="会员ID">
          <template slot-scope="scope">
            {{ scope.row.member_id }}
          </template>
        </el-table-column>
        <el-table-column label="积分明细">
          <template slot-scope="scope">
            <el-input v-model="scope.row.integral" placeholder=""></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="created_at" label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showMember(scope.row.id)">查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="handle-btn">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="" @click="beforeClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getActivitiesInfo, getActivitiesMember, stopActivities } from '@/api/table'
export default {
  props: {
    showId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      fileList: [],
      list: [],
      projectList: [],
      listLoading: true,
      listQuery: {
        limit: 10,
        page: 1,
        activity_id: '',
        keyword: ''
      }
    }
  },
  created () {
    this.listQuery.activity_id = this.showId
     this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      let that = this
      if (this.showId !== 0) {
        getActivitiesInfo({id: this.showId})
          .then(res => {
            getActivitiesMember(this.listQuery).then(response => {
              console.log(response)
              that.list = response.data
              that.listLoading = false
              for (let x in that.list) {
                that.list[x].integral = res.data.integral
              }
            })
          })
      }
    },
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      let submitData = []
      for (let x in this.list) {
        submitData.push({
          member_id: this.list[x].member_id,
          integral: this.list[x].integral
        })
      }
      let that = this
      stopActivities({
        id: this.showId,
        integrals: JSON.stringify(submitData)
      }).then(res => {
        if (res.status === 1) {
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose () {
              that.beforeClose()
              that.fetchData()
            }
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-icon{
  padding: 15px 0;
}
.min-max{
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  .min-max-line{
    margin: 0 10px;
    height: 1px;
    width: 20px;
    background-color: #000;
  }
}
.handle-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
