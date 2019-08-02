<template>
  <div class="app-container">
      <el-form :model="form" label-width="90px">
        <div style="margin-bottom: 20px;">
          <span class="el-dialog__title" style="font-size: 15px;">基本信息</span>
        </div>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="会员昵称：">
                {{ form.nickname }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="id：">
                {{ form.tel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户类型：">
                {{ form.member_no }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份类型：">
                {{ form.donation_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号：">
                {{ form.available_integral }}/{{ form.total_integral }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：">
                {{ form.level }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地区：">
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职业：">
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="认证信息：">
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-header>
          <el-menu default-active="info" router active-text-color="#409EFF" class="el-menu-demo" mode="horizontal">
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
  props: {
    showId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        nickname: '123',
        tel: '',
        member_ID: '',
        donation_amount: '',
        available_integral: '',
        total_integral: '',
        level: '',
        group_name: '',
        tags: '',
        member_type: '',
        name: '',
        native_place: '',
        sex: '',
        location: '',
        nation: '',
        religion: '',
        birth_date: '',
        unit_school: '',
        certificate_type: '',
        tel2: '',
        certificate_ID: '',
        email: '',
        mailing_address: '',
        address: '',
        tagList: '',
        organization_name: '',
        member_no: ''
      }
    }
  },
  created () {
    this.dialogVisible = true
    getMemberInfo({id: this.showId})
      .then(res => {
        // console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              this.form[x] = res.data[y]
              if (x === 'native_place' || x === 'location') {
                let tempStr = ''
                if (this.form[x] !== null) {
                  JSON.parse(this.form[x]).map(item => {
                    tempStr+= item.name
                  })
                }
               
                this.form[`${x}_str`] = tempStr
              }
            }
          }
        }
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
</style>
