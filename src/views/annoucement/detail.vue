<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <h3>基础信息</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="通告名称：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作类型：">
            <el-tag v-for="work in form.merchantsRecruitingWorkList" :key="work.id">{{ work.lable.name }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="职业类型：">
            <el-tag v-for="work in form.merchantsRecruitingProfessionalList" :key="work.id">{{ work.lable.name }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作标签：">
            <el-tag v-for="work in form.merchantsRecruitingLableList" :key="work.id">{{ work.lable.name }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作时间：">{{ form.startTime }} -- {{ form.stopTime }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作地点：">{{ form.areaId }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="详细地址：">{{ form.address }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发布人：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人均预算：">{{ form.peopleBudget }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人数：">{{ form.peopleCount }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="通告金额：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="服务费：">{{ form.name }}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细内容：">{{ form.content }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="参考样图：">
        <viewer :images="imgs">
          <div class="model-pics clearfix" v-for="(src, index) in imgs" :key="index" >
            <img :src="src.resourceUrl" />
          </div>
        </viewer>
      </el-form-item>

      <el-header>
        <el-menu default-active="model" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="model">申请的模特</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>

      <el-header>
        <el-menu default-active="model" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="model">已接单模特</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>

      <h3>通告流程</h3>
      <div class="block">
        <light-timeline :items='items'></light-timeline>
      </div>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :disabled="form.checkStatus != 0">审核通告</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateAnnoucement, getAnnoucementInfo, checkAnnoucement } from "@/api/table";

export default {
  data() {
    return {
      imgs: [],
      form: {},
      rules: {
        name: [{required: true, message: "请输入拍摄地名称", trigger: "blur"}],
      },
      items: [{
        color: '#dcdcdc',
        content: '通告待审核'
      }]
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      getAnnoucementInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        // 0:待审核，1:审核通过，2:审核驳回，3:无人申请商户撤销通告，4:有人申请商户撤销通告，5:已确立订单关系商户撤销通告，6:商户申请售后，7:订单确认人满，8:订单商户未确认完成，9:商户确认订单完成，10:商户申请售后后订单完成',
        this.form = res.data.merchantsRecruiting;
        this.imgs = res.data.merchantsRecruiting.merchantsRecruitingPicsList
        let data = res.data.merchantsRecruiting.merchantsRecruitingRecordList
        // 0 1 3
        // 0 1 4
        // 0 1 5
        // 0 1 
        data.forEach(item => {
          // if(item.)
        })
        if(this.form.checkStatus === 2){
          this.items.push({
            color: '#dcdcdc',
            content: '审核驳回'
          })
        }else if(this.form.checkStatus === 1){
          this.items.push({
            color: '#dcdcdc',
            content: '审核通过'
          })
        }
          
        
      })
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否审核通过该通告?", "确认信息", {
            distinguishCancelAndClose: true,
            confirmButtonText: "通过",
            cancelButtonText: "不通过",
            type: "warning"
          })
          .then(() => {
            this.form.checkStatus = 1;
            checkAnnoucement(this.form).then(res => {
              if (res.code === 101) {
                this.$set(this.form, "checkStatus", 1)
                this.$message({
                  message: "审核通过",
                  type: "success"
                });
              } else {
                this.$message.error(res.msg);
              }
            });
          })
          .catch(action => {
            this.form.checkStatus = 2;
            if (action === "cancel") {
              checkAnnoucement(this.form).then(res => {
                if (res.code === 101) {
                  this.$set(this.form, "checkStatus", 2)
                  this.$message({
                    message: "审核不通过",
                    type: "warning"
                  });
                } else {
                  this.$message.error(res.msg);
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
        path: "/announcement/index",
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
.demo-form .el-form-item {
  padding: 0 15px;
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
