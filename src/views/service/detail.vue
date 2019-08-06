<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="项目名称：">
            <span>{{projectForm.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="服务状态：">
            <span>{{ form.status === 0 ? "进行中" : "已完成"}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号：">
             <span>{{ form.contactPhone }}</span>
          </el-form-item>
        </el-col>
         <el-col :span="11">
          <el-form-item label="金额：">
             <span>{{ projectForm.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="购买时间：">
            <span>{{ form.createdTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="服务人员：">
            <span>{{ form.contactName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务内容："  v-if="form.status">
            <span>{{ projectForm.content }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">确认完成任务</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        label-position="top"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-personForm"
      >
        <el-form-item label="您确认已完成服务，请填写服务内容：">
          <el-input type="textarea" v-model="projectForm.content" placeholder="请输入服务内容" />
        </el-form-item>
        <el-form-item label="服务人员姓名：">
          <el-input v-model="form.updatedUser" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确定提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateService, getServiceInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      userForm: {},
      projectForm: {},
      rules: {
        content: [{ required: true, message: "请输入服务内容", trigger: "blur" }],
      }
    };
  },
  created() {
    getServiceInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.professionalServiceRecord;
      this.projectForm = res.data.professionalServiceRecord.professionalService
    });
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.form.status = 1
          updateService(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "确认成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/service/index",
                  query: {
                    pageNum: this.$route.query.pageNum
                  }
                });
              }, 1000);
            }else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleClose(done) {
      done();
    },
    back() {
      this.$router.push({
        path: "/service/index",
        query: {
          pageNum: this.$route.query.pageNum
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.demo-form .el-form-item{
  padding: 0 15px;
}
</style>
