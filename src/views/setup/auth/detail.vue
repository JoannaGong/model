<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色显示名称：" prop="displayName">
        <el-input v-model="form.displayName" placeholder="请输入所属地区" />
      </el-form-item>
      <el-form-item label="权限设置:">
        <el-tree :data="roleName" show-checkbox node-key="id" ref="tree"></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addLocation,
  updateLocation,
  getLocationInfo,
  getPermissionList
} from "@/api/table";
import { getToken } from "@/utils/auth";
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      urlHeaders: { token: getToken() },
      imageUrl: "",
      options: [],
      form: {
        roleId: []
      },
      roleName: [],
      rules: {
        name: [
          { required: true, message: "请输入拍摄地名称", trigger: "blur" }
        ],
        areaId: [
          { required: true, message: "请输入所属地区", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        score: [{ required: true, message: "请输入评分", trigger: "blur" }],
        // shootingPlaceLableList: [{required: true, message: "请选择所属类型，可多选", trigger: "blur"}],
        coverPicUrl: [
          { required: true, message: "请上传封面图片", trigger: "blur" }
        ]
        // introduce: [{required: true, message: "请输入拍摄地介绍", trigger: "blur"}],
      },
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl:
          "https://kingwoodapi.zkong.me/jd_api/ueditorHandler/ueditorConfig"
      }
    };
  },
  created() {
    if (this.$route.params.id != 0) {
      getLocationInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.shootingPlace;
        this.imageUrl = res.data.shootingPlace.coverPicUrl;
      });
    }
    getPermissionList().then(res => {
      console.log(res);
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id == 0) {
            addLocation(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/location/index",
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
            updateLocation(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/location/index",
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
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.coverPicUrl = res.data.url;
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
        path: "/location/index",
        query: {
          page: this.$route.query.page
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
.el-form-item {
  width: 40%;
}
</style>
