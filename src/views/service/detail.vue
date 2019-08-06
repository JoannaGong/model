<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <el-row :gutter="100">
        <el-col :span="9">
          <el-form-item label="项目名称：">
            <span>{{form.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="服务状态：">
            <span>{{form.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="手机号：">
             <span>{{form.name}}</span>
          </el-form-item>
        </el-col>
         <el-col :span="9">
          <el-form-item label="金额：">
             <span>{{form.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="购买时间：">
            <span>{{form.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="服务人员：">
            <span>{{form.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务内容：" >
            <span>{{form.content}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">确认完成任务</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-personForm"
      >
        <el-form-item label="您确认已完成服务，请填写服务内容：" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入服务内容" />
        </el-form-item>
        <el-form-item label="服务人员姓名：">
          <el-input v-model="form.displayName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确定提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateService, getServiceInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      urlHeaders: { token: getToken() },
      dialogVisible: false,
      form: {},
      rules: {
        content: [{ required: true, message: "请输入服务内容", trigger: "blur" }],
      }
    };
  },
  created() {
    getServiceInfo({ id: this.$route.params.id }).then(res => {
      // console.log(res)
      this.form = res.data.shootingPlace;
    });
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          updateService(this.form).then(res => {
            if(res.code === 101){
              this.$message({
                message: "确认成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/service/index",
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
    handleClose(done) {
      done();
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
        path: "/service/index",
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
/deep/ .el-dialog {
  width: 33% !important;
  .is-disabled {
    width: 65%;
  }
}
/deep/ .el-dialog .el-form-item__content {
  margin-left: 110px !important;
}
/deep/ .el-form-item__label {
  width: 110px !important;
}
</style>
