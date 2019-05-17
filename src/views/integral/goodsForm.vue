<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="兑换积分" prop="integral">
          <el-input v-model="form.integral" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">下架</el-radio>
            <el-radio :label="0">上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品主图" prop="pics">
          <div class="form-icon">
            <el-upload action=""
              :http-request="fnUploadRequest"
              :show-file-list="true"
              list-type="picture-card"
              :on-remove="handleRemove"
              :file-list="fileList">
              <i class="el-icon-plus"></i>
              <!-- <span class="buttomStyle">上传视频</span> -->
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-button type="success" size="mini" @click="addItem">新增规格</el-button>
          <el-table
            :data="form.stock"
            border
            style="width: 100%;margin-bottom: 30px;">
            <el-table-column
              prop="standard"
              label="规格">
              <template slot-scope="scope">
                <el-input v-model="scope.row.standard" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="count"
              label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.count" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="操作"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="deleteItem(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
         <el-form-item label="详情页编辑" prop="content">
            <tinymce v-model="form.content" :height="300" />
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import Tinymce from '@/components/UEditor'
import { updateIntegralGoods, getIntegralGoodsInfo,getUploadParams,addIntegralGoods } from '@/api/table'
export default {
  components: { Tinymce },
  data() {
    return {
      dialogVisible: true,
      fileList: [],
      showId: 0,
      form: {
        name: '',
        integral: '',
        stock: [],
        status: '',
        pics: [],
        is_hot: 0,
        content: ''
      },
      rules: {
        pics: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        integral: [
          { required: true, message: '请输入兑换积分', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择商品状态', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    this.showId = Number(this.$route.params.id)
    this.dialogVisible = true
    if (this.showId !== 0) {
      getIntegralGoodsInfo({id: this.showId})
        .then(res => {
          for (let x in this.form) {
            for (let y in res.data) {
              if (x === y) {
                this.form[x] = res.data[y]
                if (x === 'pics') {
                  for (let z in res.data.pics) {
                    this.fileList.push({
                      name: '雷励星球',
                      url: res.data.pics[z]
                    })
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
      submitData.pics = JSON.stringify(submitData.pics)
      submitData.stock = JSON.stringify(submitData.stock)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addIntegralGoods(submitData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/integral/goods'})
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
            updateIntegralGoods(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/integral/goods'})
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
    fnUploadRequest (option) {
      console.log(option)
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
      this.form.pics.push(option.target.responseURL + this.fileName)
      this.fileList.push({
        name: 'this.fileName',
        url: option.target.responseURL + this.fileName
      })
    },
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.form.pics.map((item, index) => {
        if (item === file.url) {
          this.form.pics.splice(index, 1)
        }
      })
      this.fileList.map((item, index) => {
        if (item.url === file.url) {
          this.fileList.splice(index, 1)
        }
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
