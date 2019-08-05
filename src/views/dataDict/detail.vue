<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="标签名称：" prop="dataValue">
        <el-input class="label-name" v-model="form.dataValue" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="标签类型：" prop="dataKey">
        <el-select v-model="form.dataKey" placeholder="请选择标签类型">
          <el-option
            v-for="item in groupNameList"
            :key="item.value"
            :label="item.label"
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
import { addDataDict, updateDataDict, getLocationInfo } from "@/api/table";
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
        value: "风格标签"
      },{
        name: "外貌标签",
        value: "外貌标签"
      },{
        name: "体型标签",
        value: "体型标签"
      },{
        name: "魅力标签",
        value: "魅力标签"
      },{
        name: "热门地区",
        value: "热门地区"
      },{
        name: "作品标签",
        value: "作品标签"
      },{
        name: "拍摄地标签",
        value: "拍摄地标签"
      }],
      form: {},
      rules: {
        name: [{required: true, message: "请输入拍摄地名称", trigger: "blur"}],
        areaId: [{required: true, message: "请输入所属地区", trigger: "blur"}],
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
          page: this.$route.query.page
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
