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
                {{ form.userName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：">
                {{ form.certificationSex }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="职业：">
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份类型：">
                {{ form.certificationType }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="id：">
                {{ form.id }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号：">
                {{ form.tel }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地区：">
                {{ form.areaId }}
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="账户类型：">
                {{ form.wechatAuthFlag }} / {{ form.weiboAuthFlag }} / {{ form.qqAuthFlag }} / {{ form.qqAuthFlag }}
              </el-form-item>
            </el-col>            
            <el-col :span="10">
              <el-form-item label="认证信息：">
                {{ form.certificationText }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-header>
          <el-menu :default-active="routePath" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="info">模特信息</el-menu-item>
            <el-menu-item index="artist">作品</el-menu-item>
            <el-menu-item index="record">服务记录</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-form>
  </div>
</template>
<script>
import { getMemberInfo } from '@/api/table'

export default {
  data() {
    return {
      routePath: "",
      form: {
      }
    }
  },
  created () {
    this.routePath = this.$route.path.split('/')[3]
    getMemberInfo({id: this.$route.params.id})
      .then(res => {
        // console.log(res)
        this.form = res.data.user
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
