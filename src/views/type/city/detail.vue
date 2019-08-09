<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="地区名称：" prop="name">
        <el-input class="label-name" v-model="form.name" placeholder="请输入地区名称" />
      </el-form-item>
      <el-form-item label="是否热门：" prop="hotFlag">
        <el-radio-group v-model="form.hotFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addCity, updateCity, getCityInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      form: {},
      rules: {
        name: [{required: true, message: "请输入地区名称", trigger: "blur"}],
        hotFlag: [{required: true, message: "请选择是否热门", trigger: "blur"}],
      },
    };
  },
  created() {
    if(this.$route.params.id != 0){
      getCityInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.area;
      });
    } 
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.$route.params.id == 0){
            addCity(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/type/city",
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
            updateCity(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/type/city",
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
    back() {
      this.$router.push({
        path: "/type/city",
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
/deep/.label-name {
  width: 40% !important;
}
</style>
