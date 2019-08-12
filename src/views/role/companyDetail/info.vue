<template>
  <div class="modelInfo">
    <el-form :model="form" label-width="90px">
      <div class="form-item">
        <div style="margin-bottom: 10px;">
          <span class="el-dialog__title" style="font-size: 15px;">公司简介</span>
        </div>
        <el-form-item label="">{{ form.certificationText }}</el-form-item>
        <el-form-item>
          <viewer :images="imgs">
            <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index" >
              <img :src="src" />
            </div>
          </viewer>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getMemberInfo, getPhotoInfo, getLabel } from "@/api/table";
export default {
  data() {
    return {
      tags: ["标签一", "标签二", "标签三"],
      imgs: [],
      form: {
      }
    };
  },
  created() {
    getMemberInfo({ id: this.$route.params.id }).then(res => {
      console.log(res)
      this.form = res.data.user
    });
    getPhotoInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.imgs = res.data.userPhotoAlbumList
    })
    getLabel({ id: this.$route.params.id }).then(res => {
      console.log(res)
    })
  },
  methods: {
    beforeClose(done) {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.form-dialog {
  margin-top: -30px;
}
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
</style>

