<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :http-request="fnUploadRequest"
        action=""
        class="editor-slide-upload"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import {getUploadParams} from '@/api/table'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      imgList: [],
      fileName: ''
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      // if (!this.checkAllSuccess()) {
      //   this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
      //   return
      // }
      this.$emit('successCBK', this.imgList)
      this.listObj = {}
      this.fileList = []
      this.imgList = []
      this.dialogVisible = false
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    fnUploadRequest(option) {
      let file = option.file
      getUploadParams()
        .then(res => {
          console.log(res.data)
          let fd = new FormData()
          let key = res.data.dir + (new Date).getTime() + '-' + file.name
          this.fileName = res.data.dir + (new Date).getTime() + '-' + file.name
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
    uploadComplete (option) {
      console.log('上传成功')
      console.log(option.target.responseURL + this.fileName)
      this.imgList.push({
        name: 'this.fileName',
        url: option.target.responseURL + this.fileName
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
