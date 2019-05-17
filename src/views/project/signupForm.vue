<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="120px" :rules="rules">
        <el-form-item label="报名表名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="报名描述" prop="content">
            <tinymce v-model="form.description" :height="300" />
        </el-form-item>
        <el-form-item label="报名表问卷配置" prop="content">
          <div class="form-content">
            <div class="content-item" v-for="(item, index) in form.questions" :key="index">
              <div class="content-item-input" v-if="item.type === 1">
                <div class="item-question">
                  <span>{{index + 1}}、</span>
                  <el-input class="form-qusetion" v-model="form.questions[index].question" placeholder=""></el-input>
                  <el-button type="primary" size="mini" @click="moveQuestion(index, -1)">上移</el-button>
                  <el-button type="primary" size="mini" @click="moveQuestion(index, 1)">下移</el-button>
                  <el-button type="danger" size="mini" @click="moveQuestion(index, 0)">删除</el-button>
                </div>
              </div>
              <div class="content-item-select" v-if="item.type === 2">
                <div class="item-question">
                  <span>{{index + 1}}、</span>
                  <el-input class="form-qusetion" v-model="form.questions[index].question" placeholder=""></el-input>
                  <el-button type="primary" size="mini" @click="moveQuestion(index, -1)">上移</el-button>
                  <el-button type="primary" size="mini" @click="moveQuestion(index, 1)">下移</el-button>
                  <el-button type="danger" size="mini" @click="moveQuestion(index, 0)">删除</el-button>
                </div>
                <div class="item-option">
                  <div class="item-option-item" v-for="(subItem, subIndex) in item.options" :key="`sub-${index}-${subIndex}`">
                    <span>选项{{chnNumChar[subIndex]}}:</span>
                    <el-input class="item-option-item-input" placeholder="" v-model="subItem.option"></el-input>
                    <span>正确答案</span>
                    <el-switch
                      v-model="subItem.right_answer"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                    <el-button class="del-option" type="danger" size="mini" @click="delOption(index, subIndex)">删除</el-button>
                  </div>
                  <el-button type="success" size="mini" @click="addOption(index)">新增选项</el-button>
                </div>
              </div>
            </div>
            <el-button type="success" size="mini" @click="addQusetion(2)">添加选择题</el-button>
            <el-button type="success" size="mini" @click="addQusetion(1)">添加填空题</el-button>
          </div>
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import Tinymce from '@/components/UEditor'
import { updateSignup, getSignupInfo,getUploadParams,addSignup } from '@/api/table'
export default {
  components: { Tinymce },
  data() {
    return {
      dialogVisible: true,
      fileList: [],
      showId: 0,
      chnNumChar: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
      form: {
        name: '',
        description: '',
        questions: [
          {
            type: 1,
            question: '平时锻炼吗',
            answer: ''
          },
          {
            type: 2,
            question: '您的性别？',
            options: [
                {
                    option: '男',
                    right_answer: true
                },
                {
                    option: '女',
                    right_answer: true
                }
            ],
            answer: ''
            }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    this.showId = Number(this.$route.params.id)
    this.dialogVisible = true
    if (this.showId !== 0) {
      getSignupInfo({id: this.showId})
        .then(res => {
          for (let x in this.form) {
            for (let y in res.data) {
              if (x === y) {
                this.form[x] = res.data[y]
                if (x === 'pics') {
                  for (let z in res.data.pics) {
                    this.fileList.push({
                      name: res.data.pics[z].name,
                      url: res.data.pics[z].pic
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
      let submitForm = JSON.parse(JSON.stringify(this.form))
      submitForm.questions = JSON.stringify(submitForm.questions)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addSignup(submitForm)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/signup'})
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
            let updateData = JSON.parse(JSON.stringify(submitForm))
            updateData.id = this.showId
            updateSignup(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/signup'})
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
      this.fileList = [{
        name: 'this.fileName',
        url: option.target.responseURL + this.fileName
      }]
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
    },
    // 移动问题
    moveQuestion(index, tag) {
      switch (tag) {
        case -1:
          // 上移
          if (index !== 0) {
            this.form.questions[index - 1] = this.form.questions.splice(index, 1, this.form.questions[index - 1])[0]
          }
          console.log(this.form.questions)
          break;
        // 下移
        case 1:
          if (index !== this.form.questions.length - 1) {
            this.form.questions[index + 1] = this.form.questions.splice(index, 1, this.form.questions[index + 1])[0]
          }
          break;
        case 0:
          this.form.questions.splice(index, 1)
          break;
      }
    },
    // 删除选项
    delOption (index, subIndex) {
      this.form.questions[index].options.splice(subIndex, 1)
    },
    // 新增选项
    addOption (index) {
      this.form.questions[index].options.push({
        option: '',
        right_answer: false
      })
    },
    // 新增题目
    addQusetion(tag) {
      switch (tag) {
        case 1:
          this.form.questions.push({
            type: 1,
            question: '',
            answer: '',
          })
          break;
        case 2:
          this.form.questions.push({
            type: 2,
            question: '',
            options: [{
              option: '',
              right_answer: false
            }],
            answer: '',
          })
          break;
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.line{
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.form-qusetion{
  margin: 0 10px;
}
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
.form-content{
  // border: dashed 1px #000;
  // padding: 5px;
  margin-top: 10px;
  .content-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #eee;
    padding: 5px;
    margin-top: 5px;
    .content-item-input{
      min-width: 700px;
      .item-question{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .content-item-select{
      min-width: 700px;
      .item-question{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item-option{
        border: dashed 1px #eee;
        padding: 5px;
        margin: 5px;
        margin-left: 33px;
        .item-option-item{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          .del-option{
            margin-left: 10px;
          }
          .item-option-item-input{
            margin: 0 5px;
          }
          span{
            display: inline-block;
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
