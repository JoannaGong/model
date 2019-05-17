<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="团体管理" width="30%" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
        <el-form-item label="团体名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="团体类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="2">组织</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设置站长" v-show="form.type === 1">
          <el-input v-model="form.number" placeholder="请输入身份号"></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码" v-show="form.type === 2">
          <el-input v-model="form.number" placeholder="请输入组织机构代码"></el-input>
        </el-form-item>
      </el-form>
      <div class="handle-btn">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="" @click="beforeClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updateGroup, addGroup, getGroupInfo } from '@/api/table'
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
      form: {
        name: '',
        type: 1,
        number: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入团体名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择团体类型', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入团体编码', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getGroupInfo({id: this.showId})
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
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      // addIntegralLevel(this.form)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addGroup(this.form)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$emit('addComplete')
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
            let updateData = JSON.parse(JSON.stringify(this.form))
            updateData.id = this.showId
            updateGroup(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$emit('addComplete')
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
</style>
