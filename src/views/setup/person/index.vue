<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" class="demo-form">
      <el-row>
        <el-col :span="7">
          <el-form-item label="用户名:">
            <el-input v-model="form.userName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="真实姓名:">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色名称:">
        <span v-if="form.roleName == 0">后台用户</span>
        <span v-if="form.roleName == 1">未认证用户</span>
        <span v-if="form.roleName == 2">模特</span>
        <span v-if="form.roleName == 3">经纪公司</span>
        <span v-if="form.roleName == 4">商户</span>
        <span v-if="form.roleName == 5">其他职业(摄影师化妆师等)</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">修改密码</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checkPassword">
          <el-input type="password" v-model="form.checkPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, updatePassword, logout } from "@/api/login";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
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
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getInfo().then(response => {
        console.log(response);
        this.form = response.data.userInfo;
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
          updatePassword(this.form)
            .then(response => {
              console.log(response);
              if (response.code === 101) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.dialogVisible = false;
                }, 1000);
              } else {
                this.$message({
                  message: "修改失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message.error("旧密码输入错误，请重新输入！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 30px 50px 0 20px;
}
// /deep/ .demo-form {
//   width: 50%;
// }
</style>
