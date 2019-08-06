<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="数据名称：" prop="dataKey">
        <el-input class="label-name" v-model="form.dataKey" placeholder="请输入数据名称" />
      </el-form-item>
      <el-form-item label="数据值：" prop="dataValue">
        <el-input class="label-name" v-model="form.dataValue" placeholder="请输入数据名称" />
      </el-form-item>
      <el-form-item label="数据类别：" prop="groupName">
        <el-select v-model="form.groupName" placeholder="请选择数据类别">
          <el-option
            v-for="item in groupNameList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addDataDict, updateDataDict, getDataDictInfo } from "@/api/table";
import { getToken } from "@/utils/auth";
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      groupNameList: [{
        name: "风格标签",
        value: "fengge"
      },{
        name: "外貌标签",
        value: "waimao"
      },{
        name: "体型标签",
        value: "tixing"
      },{
        name: "魅力标签",
        value: "meili"
      },{
        name: "热门地区",
        value: "remen"
      },{
        name: "作品标签",
        value: "zuopin"
      },{
        name: "拍摄地标签",
        value: "paishedi"
      }],
      form: {},
      rules: {
        dataKey: [{required: true, message: "请输入数据名称", trigger: "blur"}],
        dataValue: [{required: true, message: "请输入数据值", trigger: "blur"}],
        groupName: [{required: true, message: "请选择数据类别", trigger: "blur"}],
      },
    };
  },
  created() {
    if(this.$route.params.id != 0){
      getDataDictInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.dataDictionary;
      });
    } 
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.$route.params.id == 0){
            addDataDict(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/dataDict/index",
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
            updateDataDict(this.form).then(res => {
              if(res.code === 101){
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/dataDict/index",
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
        path: "/dataDict/index",
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
