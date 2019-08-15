<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="真实姓名：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号：">{{ form.certificationIdcard }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="认证信息：">{{ form.certificationText }}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="认证材料：">
            <viewer :images="imgs">
              <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index">
                <img :src="src" />
              </div>
            </viewer>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-bottom: 10px;">
        <span class="el-dialog__title" style="font-size: 15px;">模特卡信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="身高：">{{ form.height }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="体重：">{{ form.weight}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="臀围：">{{ form.hipCircumference }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="胸围：">{{ form.theChest }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="腰围：">{{ form.waistCircumference }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="头发颜色：">{{ form.hairColor }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="眼睛颜色：">{{ form.eyesColor }}</el-form-item>
        </el-col>
      </el-row>
      <div style="margin-bottom: 10px;">
        <span class="el-dialog__title" style="font-size: 15px;">个人标签</span>
      </div>
      <el-form-item label="风格标签：">
        <div v-for="label in form.userLableList" :key="label.id">
          <el-tag v-if="label.labelType === 0">{{ label.lable.name }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="外貌标签：">
        <div v-for="label in form.userLableList" :key="label.id">
          <el-tag v-if="label.labelType === 1">{{ label.lable.name }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="体型标签：">
        <div v-for="label in form.userLableList" :key="label.id">
          <el-tag v-if="label.labelType === 2">{{ label.lable.name }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="魅力标签：">
        <div v-for="label in form.userLableList" :key="label.id">
          <el-tag v-if="label.labelType === 3">{{ label.lable.name }}</el-tag>
        </div>
      </el-form-item> 
      <div style="float: left; padding-top: 8px;">
        <span class="el-dialog__title" style="font-size: 15px;">工作经验</span>
      </div>
      <el-form-item>{{ form.workExperience }}</el-form-item>
      <div style="float: left; padding-top: 8px;">
        <span class="el-dialog__title" style="font-size: 15px;">服务报价</span>
      </div>
      <el-form-item>{{form.serviceOffers}}</el-form-item>
      <div style="margin-bottom: 10px;">
        <span class="el-dialog__title" style="font-size: 15px;">相册</span>
      </div>
      <el-form-item>
        <viewer :images="photoList">
          <div class="model-pics clearfix" v-for="(src, index) in photoList" :key="index" >
            <img :src="src.photoUrl" />
          </div>
        </viewer>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getMemberInfo, getPhotoInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      form: {},
      imgs: [],
      photoList: [],
    };
  },
  created() {
    getMemberInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.user;
      this.imgs = [
        this.form.certificationHandheldIdcardPositive,
        this.form.certificationIdcardPositive,
        this.form.certificationIdcardBack
      ];
    })
    getPhotoInfo({ userId: this.$route.params.id }).then(res => {
      // console.log(res)
      this.photoList = res.data.userPhotoAlbumList
    })
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.model-pics {
  width: 150px;
  height: 200px;
  margin: 0 10px 10px 0;
  float: left;
  overflow: hidden;

  img {
    width: 100%;
  }
}
.container {
  padding: 0 20px;
}
</style>

