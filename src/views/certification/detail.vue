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
          <el-form-item label="认证类型：">{{ form.certificationType }}</el-form-item>
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
      <person-form></person-form>
      <company-form></company-form>
      <model-form></model-form>
      <model-company></model-company>
      <el-form-item label="审核操作：">
        <el-input type="textarea" placeholder="请填写审核理由" v-model="form.userName"></el-input>
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
        name: [
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
          // updateCertification(this.form).then(res => {
            this.$confirm("是否允许该报名人员参加活动?", "确认信息", {
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
