<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="banner标题:" prop="name">
            <el-input v-model="form.name" placeholder="请输入banner标题" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="跳转类型：">
            <el-select v-model="form.roleName" placeholder="请选择跳转类型">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="项目ID：">
            <el-input v-model="form.dataId" placeholder="请输入项目ID" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="网页地址：" prop="pageUrl">
            <el-input v-model="form.pageUrl" placeholder="请输入网页地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="banner图：" prop="iconUrl">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl()"
          :headers="urlHeaders"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
import { addBanner, updateBanner, getBannerInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      urlHeaders: { token: getToken() },
      imageUrl: "",
      options: [{
        label: "未认证用户",
        value: 1
      },{
        label: "模特",
        value: 2
      },{
        label: "经纪公司",
        value: 3
      },{
        label: "商户",
        value: 4
      },{
        label: "其他职业（摄影师化妆师等）",
        value: 5
      },],
      form: {},
      rules: {
        name: [{required: true, message: "请输入拍摄地名称", trigger: "blur"}],
        areaId: [{required: true, message: "请输入所属地区", trigger: "blur"}],
        address: [{required: true, message: "请输入详细地址", trigger: "blur"}],
        score: [{required: true, message: "请输入评分", trigger: "blur"}]
      }
    };
  },
  created() {
    if(this.$route.params.id != 0){
      getBannerInfo({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.form = res.data.banner;
        this.imageUrl = res.data.banner.iconUrl
      });
    } 
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.$route.params.id == 0){
            addBanner(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/banner/index",
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
          }else{
            updateBanner(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/banner/index",
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
          }
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    fileUrl() {
      return `${process.env.BASE_API}/uploadHandler/upload`;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.iconUrl = res.data.url;
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
        path: "/banner/index",
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
