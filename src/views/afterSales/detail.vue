<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
      <h3>通告内容</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="通告名称：">{{ announceForm.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作类型：" v-for="work in announceForm.merchantsRecruitingWorkList" :key="work">
            <span>{{ work }} </span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作标签：">
            <el-tag :key="tag" v-for="tag in announceForm.merchantsRecruitingLableList">{{ tag.lable }}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作时间：">{{ announceForm.name }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="工作地点：">{{ announceForm.areaId }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="详细地址：">{{ announceForm.address }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="发布人：">{{ announceForm.createdUser }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人均预算：">{{ announceForm.peopleBudget }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="人数：">{{ announceForm.peopleCount }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="通告金额：">{{ announceForm.peopleCount * announceForm.peopleBudget }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="服务费：">{{ announceForm.allCost - announceForm.peopleCount * announceForm.peopleBudget }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="详细内容：">{{ announceForm.content }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="参考样图：">
        <viewer :images="announceForm.merchantsRecruitingPicsList">
          <div class="model-pics clearfix" v-for="src in announceForm.merchantsRecruitingPicsList" :key="src">
            <img :src="src.resourceUrl" />
          </div>
        </viewer>
      </el-form-item>
      <h3>售后</h3>
      <el-row :gutter="100">
        <el-col :span="11">
          <el-form-item label="售后状态：">
            <span v-if="form.afterSaleStatus  === 0">待售后</span>
            <span v-if="form.afterSaleStatus  === 1">售后结束通告</span>
            <span v-if="form.afterSaleStatus  === 2">售后重置通告</span>
            <span v-if="form.afterSaleStatus  === 3">商户取消售后</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="售后信息：">{{ form.afterSaleOption }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="提交时间：">{{ form.createdTime }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系人：">{{ form.contactName }}</el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="联系电话：">{{ form.contactPhone }}</el-form-item>
        </el-col>
      </el-row>
      <h3>已接单模特</h3>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-card :body-style="{ padding: '8px' }">
              <div>
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
              </div>
              <div style="margin: 0 20px;">
                <div>好吃的汉堡</div>
                <div>
                  <span>北京</span>|
                  <span>女</span>|
                  <span>模特</span>
                </div>
              </div>
              <div style="height: 80px;">
                <p>进行中</p>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="submitForm('form')">处理通告</el-button>
      <el-button @click="changeStatus('form')">更改通告状态</el-button>
    </el-form>
  </div>
</template>
<script>
import { updateAfterSales, getAfterSalesInfo } from "@/api/table";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      urlHeaders: { token: getToken() },
      imgs: [],
      form: {},
      announceForm: {},
    };
  },
  created() {
    if (this.$route.params.id != 0) {
      getAfterSalesInfo({ id: this.$route.params.id }).then(res => {
        console.log(res);
        this.form = res.data.shootingPlace
        this.announceForm = res.data.shootingPlace.merchantsRecruiting 

        this.imageUrl = res.data.shootingPlace.coverPicUrl;
      });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateAfterSales(this.form).then(res => {
            if (res.code === 101) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/afterSales/index",
                  query: {
                    pageNum: this.$route.query.pageNum
                  }
                });
              }, 1000);
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
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
        path: "/afterSales/index",
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
  width: 106px !important;
  margin-left: -16px;
}
.demo-form .el-form-item {
  padding: 0 15px;
}
.image {
  width: 80px;
  height: 80px;
}
/deep/.el-card {
  height: 98px;
  width: 280px;
  .el-card__body {
    display: flex;
  }
} 
</style>
