<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="标签名称：" prop="name">
        <el-input class="label-name" v-model="form.name" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="标签类型：" prop="type">
        <el-select v-model="form.type" placeholder="请选择标签类型">
          <el-option
            v-for="item in labelList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            :disabled="$route.query.id === 0 ? false : true"
          ></el-option>
        </el-select>
        <div style="font-size: 12px; color: #aaa;">编辑模式下，不允许修改标签类型</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addLabel, updateLabel, getLabelInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      labelList: [{
        name: "风格标签",
        value: 0
      },{
        name: "外貌标签",
        value: 1
      },{
        name: "体型标签",
        value: 2
      },{
        name: "魅力标签",
        value: 3
      },{
        name: "工作标签",
        value: 4
      },{
        name: "作品标签",
        value: 5
      },{
        name: "工作类型",
        value: 6
      },{
        name: "职业类型",
        value: 7
      }],
      form: {},
      rules: {
        name: [{required: true, message: "请输入标签名称", trigger: "blur"}],
        type: [{required: true, message: "请选择数据类别", trigger: "blur"}],
      },
    };
  },
  created() {
    if(this.$route.params.id != 0){
      getLabelInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.lable;
      });
    } 
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.form.theCustomFlag = 0
          if(this.$route.params.id == 0){
            addLabel(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/type/label",
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
            updateLabel(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/type/label",
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
        path: "/type/label",
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
