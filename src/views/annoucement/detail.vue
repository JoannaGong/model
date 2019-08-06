<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="30">
        <el-col :span="11">
          <el-form-item label="通告名称：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作类型：">{{ form.merchantsRecruitingWorkList }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作标签：">{{ form.merchantsRecruitingLableList }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作时间：">{{ form.startTime }} - {{ form.stopTime }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作地点：">{{ form.areaId }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="详细地址：">{{ form.address }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发布人：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人均预算：">{{ form.peopleBudget }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人数：">{{ form.peopleCount }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="通告金额：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="服务费：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细内容：">{{ form.content }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="参考样图：">
        <viewer :images="imgs">
          <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index" >
            <img :src="src" />
          </div>
        </viewer>
      </el-form-item>
      <h3>申请的模特</h3>
      <el-row>
        <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '5px' }">
            <ul class="card-style">
              <li>
                <div>
                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                </div>
              </li>
              <li>
                <p>好吃的汉堡</p>
                <p><span>北京 | 女 | 模特</span></p>
              </li>
              <li>
                <p>商户同意</p>
              </li>
            </ul>
            <!-- <div>
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            </div>
            <div>
              <p>好吃的汉堡</p>
              <p><span>北京 | 女 | 模特</span></p>
            </div>
            <div>
              <p>商户同意</p>
            </div> -->
          </el-card>
        </el-col>
      </el-row>

      <h3>通告流程</h3>
  
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateAnnoucement, getAnnoucementInfo } from "@/api/table";
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
      imgs: [],
      form: {},
      rules: {
        name: [{required: true, message: "请输入拍摄地名称", trigger: "blur"}],
        areaId: [{required: true, message: "请输入所属地区", trigger: "blur"}],
        address: [{required: true, message: "请输入详细地址", trigger: "blur"}],
        score: [{required: true, message: "请输入评分", trigger: "blur"}],
      },
    };
  },
  created() {
    if(this.$route.params.id != 0){
      getAnnoucementInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.shootingPlace;
      });
    } 
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateAnnoucement(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/announcement/index",
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
        path: "/announcement/index",
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
.time {
  font-size: 13px;
  color: #999;
}
.image {
  width: 120px;
}
.card-style {
  list-style: none;
  position: relative;
  
  li {
    // image {
    //   position: absolute;
    //   left: 5px;
    //   top: 5px;
    // }
  }
}
</style>
