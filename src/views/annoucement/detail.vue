<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" class="demo-form">
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
      <model />
      <ordered-model />
      <h3>通告流程</h3>
      <div class="block">
        <light-timeline :items='items'></light-timeline>
      </div>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :disabled="form.checkStatus != 0">审核通告</el-button>  <!--  -->
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateAnnoucement, getAnnoucementInfo, checkAnnoucement } from "@/api/table";
import model from './model'
import orderedModel from './orderedModel'

export default {
  components: {
    model,
    orderedModel
  },
  data() {
    return {
      imgs: [],
      form: {},
      items: [{
        color: '#dcdcdc',
        content: '通告待审核',
        index: 0
      }],
      options:['通告待审核', '审核通过', '审核驳回', '无人申请，商户撤销通告', '有人申请，商户撤销通告', '已确立订单关系，商户撤销通告', '商户申请售后', '订单确认人满', '订单商户未确认完成', '商户确认订单完成', '商户申请售后，订单完成']
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      getAnnoucementInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.merchantsRecruiting;
        this.imgs = res.data.merchantsRecruiting.merchantsRecruitingPicsList
        let data = res.data.merchantsRecruiting.merchantsRecruitingRecordList
        let temp = []
        this.items[0].tag = this.form.createdTime
        data.forEach(item => {
          this.items.push({
            tag: item.createdTime,
            color: '#dcdcdc',
            content: this.options[item.newRecruitingStatus],
            index: item.newRecruitingStatus
          })
        })
        this.items = this.items.sort(this.compare('index'))
      })
    },
    compare(property){
      return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;     // 升序
      }
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$prompt("是否审核通过该通告？请填写审核意见", "确认信息", {
            distinguishCancelAndClose: true,
            confirmButtonText: "通过",
            cancelButtonText: "不通过"
          })
          .then(val => {
            console.log(value)
            this.form.checkStatus = 1;
            this.form.checkOption = val.value
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
