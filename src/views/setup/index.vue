<template>
  <div class="app-container">
    <el-form ref="personForm" :model="personForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="personForm.userName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="personForm.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="dialogVisible = true">修改密码</el-button>
        <el-dialog
          title="修改密码"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :model="personForm"
            status-icon
            :rules="rules"
            ref="personForm"
            label-width="100px"
            class="demo-personForm"
          >
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="password" v-model="personForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="personForm.password"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checkPassword">
              <el-input type="password" v-model="personForm.checkPassword"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('personForm')">保存</el-button>
            <el-button @click="resetForm('personForm')">重置</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePass, getUserInfo } from "@/api/table";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        if (this.personForm.checkPassword !== "") {
          this.$refs.personForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.personForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      personForm: {
        name: "",
        userName: "",
        oldPassword: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        password: [{required: true, validator: validatePass, trigger: "blur" }],
        checkPassword: [{required: true, validator: validatePass2, trigger: "change" }]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getUserInfo().then(response => {
        this.personForm = response.data.userInfo;
      });
    },
    handleClose(done) {
      done();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatePass(this.personForm).then(response => {
            if (response.code === 101) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                this.dialogVisible = false
              }, 1000);
            } else {
              this.$message({
                message: "修改失败",
                type: "error"
              })
            }
          }).catch( err => {
            this.$message.error('旧密码输入错误，请重新输入！')
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }    
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  width: 50%;
}
/deep/ .el-dialog .el-form-item__content {
  margin: 10px 0;
}
</style>
