<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="作品名称：">
            {{ form.name }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="作品标签：">
            <div v-for="(item, index) in form.worksLableList" :key="index">
              <el-tag>{{ item }}</el-tag>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发布人：">
            {{ issuer }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="收费标准：">
            {{ form.chargeFlag === 0 ? "不需要付费" : form.chargeCount }}
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="是否推荐：" prop="recommendedFlug">
            <el-radio-group v-model="form.recommendedFlug">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="是否违规：" prop="violationsFlag">
            <el-radio-group v-model="form.violationsFlag">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面图：">
        <img :src="form.coverUrl" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="作品图集：">
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
      issuer: "",
      options: [],
      form: {},
      imgs: [],
      rules: {
        recommendedFlug: [{required: true, message: "请选择是否推荐", trigger: "blur"}],
        violationsFlag: [{required: true, message: "请选择是否违规", trigger: "blur"}],
      },
    };
  },
  created() {
    getWorkInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.works;
      this.issuer = this.form.user.userName
    })
    getServiceList({ id: this.$route.params.id }).then(res => {
      console.log(res)
      // this. = res.data.professionalServiceRecordList
    })
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateWork(this.form).then(res => {
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
