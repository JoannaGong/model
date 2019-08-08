<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="投诉人昵称：">{{ userForm.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="投诉人手机号:">{{ userForm.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="被投诉商户：">{{ complaintForm.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="商户手机号:">{{ complaintForm.phone }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="投诉理由：">{{ form.reason }}</el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="处理结果：" prop="results">
            <el-input type="textarea" placeholder="请输入处理结果" v-model="form.results"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认处理</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateComplaint, getComplaintInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      form: {},
      complaintForm: {},  // 被投诉
      userForm: {},
      rules: {
        results: [{required: true, message: "请输入处理结果", trigger: "blur"}],
      },
    };
  },
  created() {
    getComplaintInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.complaintForm = res.data.complaints.complaintsUser;
      this.form = res.data.complaints
      this.userForm = res.data.complaints.user
    });
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateComplaint(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/complaint/index",
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
    back() {
      this.$router.push({
        path: "/complaint/index",
        query: {
          pageNum: this.$route.query.pageNum
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__label {
  width: 106px !important;
  margin-left: -16px;
}
.demo-form .el-form-item{
  padding: 0 15px;
}
</style>
