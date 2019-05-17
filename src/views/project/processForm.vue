<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
        <el-form-item label="流程名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="项目角色" prop="role_type">
          <el-select v-model="form.role_type" placeholder="">
            <el-option :label="'义工'" :value="1"></el-option>
            <el-option :label="'队员'" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(item, index) in form.steps" :key="index" :label="`步骤${nzhcn.encodeS(index + 1)}`">
          <div class="step-item">
            <div class="step-item-content">
              <span>按钮名称：</span>
              <el-input v-model="item.button" placeholder=""></el-input>
            </div>
            <div class="step-item-content">
              <span>步骤名称：</span>
              <el-input v-model="item.status" placeholder=""></el-input>
            </div>
            <div class="step-item-content">
              <span>邮件模板：</span>
              <el-select v-model="item.mail_template_id" placeholder="请选择邮件模板">
                <el-option v-for="(item, index) in mailList" :key="index" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </div>
            <el-button class="step-item-del" type="danger" size="mini" @click="delItem(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="success" @click="addStep" size="mini">新增步骤</el-button>
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import { updateProcess, getProcessInfo,getUploadParams,addProcess, getMailTemplatesList } from '@/api/table'
import Nzh from 'nzh'
export default {
  data() {
    return {
      dialogVisible: true,
      fileList: [],
      nzhcn: null,
      showId: 0,
      mailList: [],
      stepName: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三'],
      form: {
        name: '',
        role_type: '',
        steps: []
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        role_type: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    this.nzhcn = Nzh.cn
    this.showId = Number(this.$route.params.id)
    this.dialogVisible = true
    if (this.showId !== 0) {
      getProcessInfo({id: this.showId})
        .then(res => {
          for (let x in this.form) {
            for (let y in res.data) {
              if (x === y) {
                if(x === 'steps') {
                  this.form[x] = JSON.parse(res.data[y])
                } else {
                  this.form[x] = res.data[y]
                }
              }
            }
          }
        })
    }
    getMailTemplatesList()
      .then(res => {
        this.mailList = [{
          id: 0,
          title: '不发送邮件'
        }]
        res.data.map(item => {
          this.mailList.push(item)
        })
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      let submitData = JSON.parse(JSON.stringify(this.form))
      submitData.steps = JSON.stringify(submitData.steps)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addProcess(submitData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/process'})
                    }
                  })
                } else {
                  this.$message({
                    message: '新增失败',
                    type: 'error'
                  })
                }
              })
          } else {
            // 修改
            let updateData = JSON.parse(JSON.stringify(submitData))
            updateData.id = this.showId
            updateProcess(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/process'})
                    }
                  })
                } else {
                  this.$message({
                    message: '修改失败',
                    type: 'error'
                  })
                }
              })
          }
         
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addStep () {
      this.form.steps.push({
        button: '',
        status: ''
      })
    },
    delItem (index) {
      this.form.steps.splice(index, 1)
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
.page-form{
  padding: 15px;
}
.form-handle{
  margin: -15px;
  background-color: #eee;
  // margin-top: 5px;
  margin-bottom: 15px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px;
}
.step-item{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  border: solid 1px #eee;
  padding: 5px;
  .step-item-del{
    margin-top: 5px;
  }
  .step-item-content{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  span {
    display: inline-block;
    width: 150px;
  }
}
</style>
