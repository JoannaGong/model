<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="信息" width="30%" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
       <el-form-item label="证件类型" prop="certificate_type">
         <el-select v-model="form.certificate_type" placeholder="请选择证件类型">
           <el-option v-for="(item, index) in selectList" :key="index" :label="item.name" :value="item.value"></el-option>
         </el-select>
       </el-form-item>
        <el-form-item label="证件号码" prop="certificate_ID">
          <el-input v-model="form.certificate_ID" placeholder=""></el-input>
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
import { updateBlack, addBlack, getBlackInfo } from '@/api/table'
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
      selectList: [{
        name: '身份证',
        value: 1
      }, {
        name: '护照',
        value: 2
      }, {
        name: '回乡证',
        value: 3
      }, {
        name: '军官证',
        value: 4
      }, {
        name: '台胞证',
        value: 5
      }],
      form: {
        certificate_type: null,
        certificate_ID: ''
      },
      rules: {
        certificate_type: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        certificate_ID: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getBlackInfo({id: this.showId})
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
            addBlack(this.form)
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
            updateBlack(updateData)
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
