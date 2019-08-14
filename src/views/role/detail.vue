<template>
  <div class="app-container">
      <el-form :model="form" label-width="90px">
        <div style="margin-bottom: 20px;">
          <span class="el-dialog__title" style="font-size: 15px;">基本信息</span>
        </div>
        <div class="form-item">
          <el-row :gutter="20">
            <div label="头像" class="avatarPic clearfix">
              <img :src="form.headUrl" style="width: 100px; height: 100px;" />
            </div>
            <el-col :span="10">
              <el-form-item label="会员昵称：">
                {{ form.name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：">
                <span v-if="form.certificationSex === 0">男</span>
                <span v-if="form.certificationSex === 1">女</span>
                <span v-if="form.certificationSex === 2">未知</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="职业：">
                {{ form.professional }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份类型：">
                <span v-if="form.roleName === 1">未认证用户</span>
                <span v-if="form.roleName === 2">模特</span>
                <span v-if="form.roleName === 3">经纪公司</span>
                <span v-if="form.roleName === 4">商户</span>
                <span v-if="form.roleName === 5">其他职业(摄影师化妆师等)</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="id：">
                {{ form.id }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号：">
                {{ form.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地区：">
                {{ areaName }}
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="账户类型：">
                <span v-if="form.wechatAuthFlag === 1" style="margin-right: 10px;">微信认证</span>
                <span v-if="form.weiboAuthFlag === 1" style="margin-right: 10px;">微博认证</span>
                <span v-if="form.qqAuthFlag === 1" style="margin-right: 10px;">QQ认证</span>
                <span v-if="form.alipayAuthFlag === 1">支付宝认证</span>
                <span v-if="!(form.alipayAuthFlag && form.wechatAuthFlag && form.weiboAuthFlag && form.qqAuthFlag)">未认证</span>
              </el-form-item>
            </el-col>            
            <el-col :span="10">
              <el-form-item label="认证信息：">
                <el-button type="text">点击去查看</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="form.roleName === 2">
          <el-header>
            <el-menu :default-active="routePath" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="modelInfo">模特信息</el-menu-item>
              <el-menu-item index="modelArtist">作品</el-menu-item>
              <el-menu-item index="modelServiceRecord">服务记录</el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
        <div v-if="form.roleName === 3">
          <el-header>
            <el-menu :default-active="routePath" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="companyInfo">公司信息</el-menu-item>
              <el-menu-item index="companyArtist">作品</el-menu-item>
              <el-menu-item index="companyServiceRecord">服务记录</el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
        <div v-if="form.roleName === 4">
          <el-header>
            <el-menu :default-active="routePath" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="merchantInfo">通告记录</el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </div>
      </el-form>
  </div>
</template>
<script>
import { getMemberInfo, getAreaList } from '@/api/table'

export default {
  data() {
    return {
      routePath: "",
      form: {
      },
      areaName: ""
    }
  },
  created () {
    this.routePath = this.$route.path.split('/')[3]
    getMemberInfo({id: this.$route.params.id}).then(res => {
        // console.log(res)
      this.form = res.data.user
    })
    getAreaList().then(res => {
      let data = res.data.areaList
      data.forEach(item => {
        if(data.id === this.form.areaId){
          this.areaName = item.name
        }
      })
    })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.form-dialog {
  margin-top: -30px;
}
.el-row .avatarPic {
  float: right;
  margin-right: 100px;
}
</style>
