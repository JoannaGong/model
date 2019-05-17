<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="会员信息"  :before-close="beforeClose">
      <el-form :model="form" label-width="90px">
        <h3>基础信息</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请人：">
                {{ form.nickname }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请时间">
                {{ form.created_at }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请类型：">
                {{ form.type_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请状态：">
                {{ form.status_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请分值：">
                {{ form.integral }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <h3>申请内容</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请理由：">
                {{ form.content }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="申请凭证">
                <div class="pz-img" v-for="(item, index) in form.certificate" :key="`img${index}`">
                  <img :src="item"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="handle-btn">
                <el-button type="success" @click="successApply">同意申请</el-button>
                <el-button type="danger" @click="refuse">驳回申请</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="refuseDialog"
        width="30%">
        <div class="refuse-select">
          <el-select class="select-input" v-model="rejectReasonId" placeholder="请选择驳回理由">
            <el-option v-for="(item, index) in refuseList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleRefuse">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { getIntegralApplyInfo, updateIntegral, getDictionariesList } from '@/api/table'
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
      refuseDialog: false,
      refuseList: [],
      rejectReasonId: null,
      form: {
        nickname: '',
        member_id: '',
        integral: '',
        content: '',
        certificate: '',
        created_at: '',
        type_name: '',
        status_name: ''
      }
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getIntegralApplyInfo({id: this.showId})
      .then(res => {
        console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              this.form[x] = res.data[y]
            }
          }
        }
      })
    getDictionariesList({
      type: 2
    })
      .then(res => {
        if (res.status === 1) {
          this.refuseList = res.data
        }
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    // 同意审批
    successApply () {
      let that = this
      updateIntegral({
        id: this.showId,
        status: 2
      }).then((res) => {
        if (res.status === 1) {
          this.$message({
            message: '审核成功',
            type: 'success',
            duration: 1500,
            onClose () {
              that.$emit('close')
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 拒绝
    refuse () {
      this.refuseDialog = true
    },
    handleRefuse () {
      let that = this
      updateIntegral({
        id: this.showId,
        status: -1,
        reject_reason_id: this.rejectReasonId
      }).then((res) => {
        if (res.status === 1) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose () {
              that.refuseDialog = false
              that.$emit('close')
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pz-img{
  img{
    width: 100%;
  }
}
.handle-btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
.refuse-select{
  display: flex;
  justify-content: center;
  align-items: center;
  .select-input{
    width: 80%;
  }
}
</style>

