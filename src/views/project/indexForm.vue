<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="120px" :rules="rules">
        <h3>基础信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目角色" prop="role_type">
              <el-select v-model="form.role_type" placeholder="">
                <el-option :label="'义工'" :value="1"></el-option>
                <el-option :label="'队员'" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目周期" prop="cycle_id">
              <el-select v-model="form.cycle_id" placeholder="">
                <el-option v-for="(item, index) in cycleList" :key="`cycle${index}`" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目积分" prop="integral">
              <el-input v-model="form.integral" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类型" prop="project_type_id">
              <el-select v-model="form.project_type_id" placeholder="">
                <el-option v-for="(item, index) in projectTypeList" :key="`project_type_id${index}`" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="流程配置" prop="flow_id">
              <el-select v-model="form.flow_id" placeholder="">
                <el-option v-for="(item, index) in flowList" :key="`flow${index}`" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否允许撤销" prop="cancel_allowed">
              <el-radio-group v-model="form.cancel_allowed">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="封面展示" prop="cover">
              <div class="form-icon">
                <el-upload action=""
                  :http-request="fnUploadRequest"
                  :show-file-list="true"
                  list-type="picture-card"
                  :file-list="fileList">
                  <i class="el-icon-plus"></i>
                  <!-- <span class="buttomStyle">上传视频</span> -->
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否允许改期" prop="update_date_allowed">
              <el-radio-group v-model="form.update_date_allowed">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>报名要求</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄限制">
              <div class="age-limit">
                <el-input v-model="form.min_age" placeholder=""></el-input>
                <div class="line"></div>
                <el-input v-model="form.max_age" placeholder=""></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="活动费用" prop="fee">
              <el-input v-model="form.fee" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报名表" prop="signup_form_id">
              <el-select v-model="form.signup_form_id" placeholder="">
                <el-option v-for="(item, index) in signupList" :key="`signupList${index}`" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>事项设置</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="`事项名称${nzhcn.encodeS(index + 1)}`" v-for="(item, index) in items" :key="`items${index}`">
              <div class="notice">
                <el-input v-model="item.value" placeholder=""></el-input>
                <el-button class="notice-btn" type="danger" size="mini" @click="deleteItem(index)">删除</el-button>
              </div>
            </el-form-item>
            <el-form-item label="">
              <el-button type="success" size="mini" @click="addItem">添加事项</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>项目介绍</h3>
         <el-form-item label="">
            <tinymce v-model="form.content" :height="300" />
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import Tinymce from '@/components/UEditor'
import Nzh from 'nzh'
import { getSignupList, getProcessList, getDictionariesList, updateProjects, getProjectsInfo,getUploadParams,addProjects } from '@/api/table'
export default {
  components: { Tinymce },
  data() {
    return {
      nzhcn: null,
      dialogVisible: true,
      fileList: [],
      showId: 0,
      flowList: [], // 流程列表
      cycleList: [], // 项目周期
      projectTypeList: [], // 项目类型
      signupList: [], // 项目报名表
      items: [{
        value: ''
      }],
      form: {
        name: '',
        role_type: '',
        cycle_id: '',
        integral: '',
        project_type_id: '',
        flow_id: '',
        cancel_allowed: '',
        cover: '', // 封面
        update_date_allowed: '',
        min_age: '',
        max_age: '',
        fee: '',
        signup_form_id: '',
        items: [],
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        role_type: [
          { required: true, message: '请选择项目角色', trigger: 'blur' }
        ],
        cycle_id: [
          { required: true, message: '请选择项目周期', trigger: 'blur' }
        ],
        integral: [
          { required: true, message: '请输入项目积分', trigger: 'blur' }
        ],
        project_type_id: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        flow_id: [
          { required: true, message: '请选择流程配置', trigger: 'blur' }
        ],
        cancel_allowed: [
          { required: true, message: '请选择是否允许撤销', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ],
        update_date_allowed: [
          { required: true, message: '请选择是否允许改期', trigger: 'blur' }
        ],
        fee: [
          { required: true, message: '请输入活动费用', trigger: 'blur' }
        ],
        signup_form_id: [
          { required: true, message: '请选择报名表', trigger: 'blur' }
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
      getProjectsInfo({id: this.showId})
        .then(res => {
          for (let x in this.form) {
            for (let y in res.data) {
              if (x === y) {
                this.form[x] = res.data[y]
                if (x === 'cover') {
                  this.fileList = [{
                      name: '封面图',
                      url: res.data[y]
                    }]
                }
                if (x === 'items') {
                  this.items = []
                  for (let z in res.data[y]) {
                    this.items.push({
                      value: res.data[y][z]
                    })
                  }
                }
              }
            }
          }
        })
    }
    this.getDictionary()
  },
  methods: {
    getDictionary () {
      // 项目周期
      getDictionariesList({type: 1})
        .then(res => {
          if (res.status === 1) {
            this.cycleList = res.data
          }
        })
      // 项目类型
      getDictionariesList({type: 3})
        .then(res => {
          if (res.status === 1) {
            this.projectTypeList = res.data
          }
        })
      // 项目流程
      getProcessList()
        .then(res => {
          if (res.status === 1) {
            this.flowList = res.data
          }
        })
      // 报名表
      getSignupList()
        .then(res => {
          if (res.status === 1) {
            this.signupList = res.data
          }
        })
    },
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      let submitData = JSON.parse(JSON.stringify(this.form))
      submitData.cover = this.fileList[0].url
      submitData.items = []
      for (let x in this.items) {
        submitData.items.push(this.items[x].value)
      }
      submitData.items = JSON.stringify(submitData.items)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addProjects(submitData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/table'})
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
            updateProjects(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    onClose: () => {
                      this.$store.dispatch('delVisitedView', this.$route)
                      this.$router.push({path: '/project/table'})
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
      this.form.cover = option.target.responseURL + this.fileName
      this.fileList = [{
        name: 'this.fileName',
        url: option.target.responseURL + this.fileName
      }]
    },
    deleteItem (index) {
      this.items.splice(index, 1)
    },
    addItem () {
      this.items.push({
        value: ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.notice{
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-btn{
    margin-left: 10px;
  }
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
.age-limit{
  display: flex;
  justify-content: center;
  align-items: center;
  .line{
    height: 1px;
    width: 30px;
    margin: 0 10px;
    background-color: #000;
  }
}
</style>
