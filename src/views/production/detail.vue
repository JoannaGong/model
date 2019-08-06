<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="100">
        <el-col :span="9">
          <el-form-item label="作品名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入拍摄地名称" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="作品标签：" prop="areaId">
            <el-input v-model="form.areaId" placeholder="请输入所属地区" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="发布人：" prop="address">
            <el-input v-model="form.address" placeholder="请输入详细地址" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="收费标准：" prop="shootingPlaceLableList">
            <el-select v-model="form.shootingPlaceLableList" multiple placeholder="请选择所属类型">
              <el-option
                v-for="item in form.shootingPlaceLableList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否推荐：" >
            <el-radio-group v-model="form.recommendedFlug">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否违规：" >
            <el-radio-group v-model="form.recommendedFlug">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面图：" prop="coverPicUrl">
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
      <el-form-item label="作品图集">
        <viewer :images="imgs">
          <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index" >
            <img :src="src" />
          </div>
        </viewer>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateWork, getWorkInfo, getServiceList } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      urlHeaders: { token: getToken() },
      imageUrl: "",
      options: [],
      form: {},
      imgs: [],
      rules: {
        name: [{required: true, message: "请输入拍摄地名称", trigger: "blur"}],
        areaId: [{required: true, message: "请输入所属地区", trigger: "blur"}],
        address: [{required: true, message: "请输入详细地址", trigger: "blur"}],
        score: [{required: true, message: "请输入评分", trigger: "blur"}],
        // shootingPlaceLableList: [{required: true, message: "请选择所属类型，可多选", trigger: "blur"}],
        coverPicUrl: [{required: true, message: "请上传封面图片", trigger: "blur"}],
        // introduce: [{required: true, message: "请输入拍摄地介绍", trigger: "blur"}],
      },
    };
  },
  created() {
    getWorkInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.shootingPlace;
      this.imageUrl = res.data.shootingPlace.coverPicUrl
    })
    getServiceList({ id: this.$route.params.id }).then(res => {
      console.log(res)
    })
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateLocation(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "提交成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/production/index",
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
        path: "/production/index",
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
