<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="会员昵称：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
         <el-col :span="11">
          <el-form-item label="id：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
         <el-col :span="11">
          <el-form-item label="提现：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
         <el-col :span="11">
          <el-form-item label="申请时间：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
         <el-col :span="11">
          <el-form-item label="提现类型：" prop="name">
            <span v-if="form.name === 0">未提现</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="提现金额：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="提现账户：" prop="name">{{ form.name }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认提现</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addLocation, updateLocation, getLocationInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    getLocationInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.shootingPlace;
    });
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateLocation(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/finance/withdrawAudit",
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
    back() {
      this.$router.push({
        path: "/finance/withdrawAudit",
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
