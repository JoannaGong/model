<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="活动名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入活动名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="主办方：" prop="organizersName">
            <el-input v-model="form.organizersName" placeholder="请输入主办方" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="报名时间：" prop="signStartTime">
            <el-date-picker
              v-model="form.signStartTime"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="signStopTime">
            <el-date-picker
              v-model="form.signStopTime"
              type="datetime"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="活动时间：" prop="activityStartTime">
            <el-date-picker
              v-model="form.activityStartTime"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="activityStopTime">
            <el-date-picker
              v-model="form.activityStopTime"
              type="datetime"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="报名费：">
            <el-input type="number" v-model="form.applicationPrice" placeholder="请输入报名费" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面展示：" prop="coverPicUrl">
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
      <h3>活动介绍</h3>
      <el-form-item prop="introduce">
        <vue-ueditor-wrap
          ref="ueditor"
          v-model="form.introduce"
          :destroy="false"
          :config="config"
          style="line-height:20px"
        ></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addActivity, updateActivity, getActivityInfo } from "@/api/table";
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
      form: {},
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
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
        serverUrl:
          "http://101.37.156.106/model_api/ueditorHandler/ueditorConfig"
      }
    };
  },
  created() {
    if (this.$route.params.id != 0) {
      getActivityInfo({ id: this.$route.params.id }).then(res => {
        console.log(res);
        this.form = res.data.activity;
        this.imageUrl = res.data.activity.coverPicUrl;
      });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id == 0) {
            addActivity(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/activity/index",
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
            updateActivity(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/activity/index",
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
        path: "/activity/index",
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
