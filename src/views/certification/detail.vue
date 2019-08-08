<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="申请人名称：">{{ form.userName }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请人id：">{{ form.id }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="认证类型：">
            <span v-if="form.certificationSonType == 0">个人</span>
            <span v-if="form.certificationSonType == 1">企业</span>
            <span v-if="form.certificationSonType == 2">男模</span>
            <span v-if="form.certificationSonType == 3">女模</span>
            <span v-if="form.certificationSonType == 4">童星</span>
            &nbsp;
            <span v-if="form.certificationType == 0">商户</span>
            <span v-if="form.certificationType == 1">艺人</span>
            <span v-if="form.certificationType == 2">其他职业</span>
            <span v-if="form.certificationType == 3">经纪公司</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="提交时间：">{{ form.createdTime }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="申请状态：">
            <span v-if="form.certificationCheckStatus === 0">未审核</span>
            <span v-if="form.certificationCheckStatus === 1">审核通过</span>
            <span v-if="form.certificationCheckStatus === 2">审核驳回</span>
          </el-form-item>
        </el-col>
      </el-row>
      <person-form v-if="(form.certificationSonType === 0 && form.certificationType == 0) || form.certificationType == 2"></person-form>   <!-- 个人商户 + 其他职业 -->
      <company-form v-if="(form.certificationSonType === 1 && form.certificationType == 0) || form.certificationType == 2"></company-form>  <!-- 企业商户 + 其他职业 -->
      <model-form v-if="(form.certificationSonType < 5 && form.certificationSonType > 1) || form.certificationType == 1"></model-form>  <!-- 模特 -->
      <model-company v-if="form.certificationType == 3"></model-company>  <!-- 经纪公司 -->
      <el-form-item label="审核操作：">
        <el-input type="textarea" placeholder="请填写审核理由" v-model="form.certificationCheckOption"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">审核</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  updateMaterial,
  updateCertification,
  getMemberInfo
} from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  components: {
    personForm: () => import("./personForm.vue"),
    companyForm: () => import("./companyForm.vue"),
    modelForm: () => import("./modelForm.vue"),
    modelCompany: () => import("./modelCompany.vue")
  },
  data() {
    return {
      urlHeaders: { token: getToken() },
      imageUrl: "",
      options: [],
      form: {},
      rules: {
        certificationCheckOption: [
          { required: true, message: "请输入审核理由", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    getMemberInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res);
      this.form = res.data.user;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否通过该申请人的认证审核?", "确认信息", {
            distinguishCancelAndClose: true,
            confirmButtonText: "批准",
            cancelButtonText: "驳回",
            type: "warning"
          })
          .then(() => {
            this.form.certificationCheckStatus = 1;
            updateCertification(this.form).then(response => {
              if (response.code === 101) {
                this.$set(this.form, "certificationCheckStatus", 1)
                this.$message({
                  message: "审核通过",
                  type: "success"
                });
              } else {
                this.$message.error(response.msg);
              }
            });
          })
          .catch(action => {
            this.form.certificationCheckStatus = 2;
            if (action === "cancel") {
              updateCertification(this.form).then(response => {
                if (response.code === 101) {
                  this.$set(this.form, "certificationCheckStatus", 2)
                  this.$message({
                    message: "审核驳回",
                    type: "warning"
                  });
                } else {
                  this.$message.error(response.msg);
                }
              })
            } else if (action === "close") {
              this.$message.info("放弃审核！");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.$router.push({
        path: "/certification/index",
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
  width: 112px !important;
  margin-left: -16px;
}
.demo-form .el-form-item {
  padding: 0 15px;
}
</style>
