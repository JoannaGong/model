<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="10">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="真实姓名：" prop="name">
            <el-input v-model="form.name" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="城市：" prop="areaId">
            <el-select v-model="form.areaId" placeholder="请输入城市">
              <el-option v-for="item in areaOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机/电话：" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机/电话" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属角色：">
            <el-select v-model="form.permissionsId" placeholder="请选择所属角色">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="能否登录：" prop="canLogin">
            <el-radio-group v-model="form.canLogin" placeholder="请选择能否登录">
              <el-radio :label="0">可以登陆</el-radio>
              <el-radio :label="1">不能登录</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="头像：" prop="headUrl">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl()"
          :headers="urlHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addUser, updateUser, getUserInfo, getRoleList, getAreaList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      setTimeout(() => {
        if (
          !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
            value
          )
        ) {
          callback(new Error("请输入正确格式的邮箱"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      urlHeaders: { token: getToken() },
      imageUrl: "",
      options: [],
      areaOptions: [],
      form: {
        password: "",
        canLogin: 0
        // repassword: "",
      },
      options: [],
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        canLogin: [
          { required: true, message: "请选择能否登录", trigger: "blur" }
        ],
        headUrl: [
          { required: true, message: "请上传头像图片", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
      }
    };
  },
  created() {
    if (this.$route.params.id != 0) {
      getUserInfo({ id: this.$route.params.id }).then(res => {
        console.log(res);
        this.form = res.data.user;
        this.imageUrl = res.data.user.headUrl;
      });
    }
    getRoleList().then(res => {
      // console.log(res)
      this.options = res.data.permissionList
    })
    getAreaList().then(res => {
      // console.log(res)
      this.areaOptions = res.data.areaList
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.form);
          this.form.canLogin = 0;
          this.form.roleName = 0;
          if (this.$route.params.id == 0) {
            addUser(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/setup/account",
                    query: {
                      pageNum: this.$route.query.pageNum
                    }
                  });
                }, 1000);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
          } else {
            updateUser(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/setup/account",
                    query: {
                      pageNum: this.$route.query.pageNum
                    }
                  });
                }, 1000);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fileUrl() {
      return `${process.env.BASE_API}/uploadHandler/upload`;
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.headUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传的图片只能是 jpg/png/jpeg/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    back() {
      this.$router.push({
        path: "setup/account/index",
        query: {
          pageNum: this.$route.query.pageNum
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__label {
  width: 106px !important;
  margin-left: -16px;
}
.demo-form .el-form-item {
  padding: 0 15px;
}
</style>
