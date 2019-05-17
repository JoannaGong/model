<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="积分等级" width="30%" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" label-width="90px">
        <el-form-item label="申请活动">
          <span>{{form.activity_name}}</span>
        </el-form-item>
        <el-form-item label="申请类型">
          <span>{{form.type_name}}</span>
        </el-form-item>
        <el-form-item label="申请人">
          <span>{{form.member_name}}</span>
        </el-form-item>
        <el-form-item label="申请时间">
          <span>{{form.created_at}}</span>
        </el-form-item>
        <el-form-item label="申请状态">
          <span>{{form.status_name}}</span>
        </el-form-item>
        <el-form-item label="退还报名费">
          <span>{{form.fee}}</span>
        </el-form-item>
        <el-form-item label="申请理由">
          <span>{{form.reason}}</span>
        </el-form-item>
      </el-form>
      <div class="handle-btn">
        <el-button type="danger" @click="cancelSignup" v-show="form.status === 1">撤销报名</el-button>
        <el-button type="primary" @click="changeDate" v-show="form.status === 1">改期</el-button>
        <el-button type="" @click="beforeClose">取消</el-button>
      </div>
    </el-dialog>
    <!-- 撤销 -->
    <el-dialog title="撤销将会将报名费退还给用户" :visible.sync="cancelSignupTag" width="30%">
      <div class="handle-btn">
        <el-button type="primary" @click="submitForm('cancel')">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </div>
    </el-dialog>
    <!-- 改期 -->
    <el-dialog title="请选择需要改期至目标活动" :visible.sync="changeDateTag" width="30%">
      <el-select class="select-input" v-model="activity_id" placeholder="请选择活动">
        <el-option v-for="(item, index) in activityList" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <div class="handle-btn">
        <el-button type="primary" @click="submitForm('change')">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getActivities, updateChangeApplications, getChangeApplicationsInfo,getUploadParams,addChangeApplications } from '@/api/table'
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
      cancelSignupTag: false,
      changeDateTag: false,
      activity_id: null,
      activityList: [],
      form: {
        project_id: '',
        status: '',
        activity_name: '',
        type_name: '',
        member_name: '',
        created_at: '',
        status_name: '',
        fee: '',
        reason: ''
      },
      fileName: ''
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getChangeApplicationsInfo({id: this.showId})
      .then(res => {
        console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              this.form[x] = res.data[y]
              if (x === 'icon') {
                 this.fileList = [{
                    name: res.data.name,
                    url: res.data.icon
                  }]
              }
            }
          }
        }
        getActivities({
          project_id: this.form.project_id
        })
          .then(res => {
            this.activityList = res.data
          })
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    // 撤销
    cancelSignup () {
      this.cancelSignupTag = true
    },
    // 改期
    changeDate () {
      this.changeDateTag = true
    },
    // 提交表单
    submitForm (tag) {
      let typeNum = 2
      switch (tag) {
        case 'cancel':
          typeNum = 1
          break;
        case 'change':
          typeNum = 2
          break;
      }
      let that = this
      updateChangeApplications({
        type: typeNum,
        id: this.showId,
        activity_id: this.activity_id
      }).then(res => {
        console.log(res)
        if (res.status === 1) {
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose () {
              that.cancelSignupTag = false
              that.changeDateTag = false
              that.$emit('addComplete')
            }
          })
        }
      })
    },
    // 取消
    cancle () {
      this.cancelSignupTag = false
      this.changeDateTag = false
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
  width: 60%;
  justify-content: center;
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
.select-input{
  width: 100%;
}
</style>
