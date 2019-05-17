<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
        <el-form-item label="模板名称" prop="title">
          <el-input v-model="form.title" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
            <tinymce v-model="form.content" :height="300" />
        </el-form-item>
        <el-form-item label="邮件附件">
          <div class="form-icon">
            <el-upload action=""
              :show-file-list="true"
              action="/api/uploadFile"
              :data="{is_oss: 0}"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              multiple
              :file-list="fileList">
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import Tinymce from '@/components/UEditor'
import { updateMailTemplates, getMailTemplatesInfo, getUploadParams, addMailTemplates } from '@/api/table'
export default {
  components: { Tinymce },
  data() {
    return {
      dialogVisible: true,
      fileList: [],
      showId: 0,
      form: {
        title: '',
        content: '',
        attach_files: []
      },
      rules: {
        title: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      },
      fileName: '',
      trueFileName: ''
    }
  },
  created () {
    this.showId = Number(this.$route.params.id)
    this.dialogVisible = true
    if (this.showId !== 0) {
      getMailTemplatesInfo({id: this.showId})
        .then(res => {
          for (let x in this.form) {
            for (let y in res.data) {
              if (x === y) {
                this.form[x] = res.data[y]
                if (x === 'attach_files') {
                  for (let z in res.data.attach_files) {
                    this.fileList.push(res.data.attach_files[z])
                  }
                }
              }
            }
          }
        })
    }
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      let submitData = JSON.parse(JSON.stringify(this.form))
      submitData.attach_files = JSON.stringify(submitData.attach_files)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addMailTemplates(submitData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/mail'})
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
            updateMailTemplates(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/mail'})
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
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.form.attach_files.map((item, index) => {
        console.log(item)
        if (file.url === item.url) {
          this.form.attach_files.splice(index, 1)
        }
      })
      this.fileList.map((item, index) => {
        console.log(item)
        if (file.url === item.url) {
          this.fileList.splice(index, 1)
        }
      })
    },
    fnUploadRequest (option) {
      console.log(option)
      let file = option.file
      getUploadParams()
        .then(res => {
          console.log(res.data)
          let fd = new FormData()
          let key = res.data.dir + (new Date).getTime() + '-' + file.name
          this.fileName = res.data.dir + (new Date).getTime() + '-' + file.name
          this.trueFileName = file.name
          fd.append('key', key);
          fd.append('Content-Type', file.type);      
          fd.append('OSSAccessKeyId', res.data.accessid);
          fd.append('policy', res.data.policy)
          fd.append('signature', res.data.signature);
          fd.append("file",file);
          let xhr = new XMLHttpRequest()
          // xhr.upload.addEventListener("progress", uploadProgress, false);
          xhr.addEventListener("load", this.uploadComplete, false);
          // xhr.addEventListener("error", uploadFailed, false);
          // xhr.addEventListener("abort", uploadCanceled, false);
          xhr.open('POST', res.data.host, true); //MUST BE LAST LINE BEFORE YOU SEND 
          xhr.send(fd);
        })
    },
    // 上传成功
    onSuccess (response, file, fileList) {
      this.form.attach_files.push({
        name: file.name,
        url: response.data.url
      })
      this.fileList.push({
        name: file.name,
        url: response.data.url
      })
    },
    uploadComplete (option) {
      console.log('上传成功')
      this.form.attach_files.push({
        name: this.trueFileName,
        url: option.target.responseURL + this.fileName
      })
      this.fileList.push({
        name: this.trueFileName,
        url: option.target.responseURL + this.fileName
      })
    },
    deleteItem (index) {
      this.form.stock.splice(index, 1)
    },
    addItem () {
      console.log(1231231231)
      this.form.stock.push({
        standard: '',
        count: 0
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
</style>
