<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="企业名称：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="组织机构代码：">{{ form.certificationIdcard }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="认证信息：">{{ form.certificationType }}</el-form-item>
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
    </el-form>
  </div>
</template>
<script>
import { getMemberInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      form: {},
      imgs: []
    };
  },
  created() {
    getMemberInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.user;
      this.imgs = [ this.form.certificationBusinessLicense ];
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.model-pics {
  width: 200px;
  height: 150px;
  margin: 0 10px 10px 0;
  float: left;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>