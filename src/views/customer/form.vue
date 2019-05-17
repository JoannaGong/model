<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="会员信息"  :before-close="beforeClose">
      <el-form :model="form" label-width="90px">
        <h3>基础信息</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="会员昵称：">
                {{ form.nickname }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：">
                {{ form.tel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员ID：">
                {{ form.member_no }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="捐款金额：">
                {{ form.donation_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="可用积分：">
                {{ form.available_integral }}/{{ form.total_integral }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员等级：">
                {{ form.level }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属组织：">
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拥有标签：">
                <el-tag type="primary" v-for="(item,index) in form.tagList" :key="index">{{item}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <h3>报名身份信息</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名：">
                {{ form.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="籍贯：">
                {{ form.native_place_str }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：">
                {{ form.sex === 1? '男' : '女' }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地：">
                {{ form.location_str }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族：">
                {{ form.nation }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宗教/信仰：">
                {{ form.religion }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期：">
                {{ form.birth_date }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位/学校：">
                {{ form.unit_school }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件类型：">
                {{ form.certificate_type }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：">
                {{ form.tel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码：">
                {{ form.certificate_ID }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="e-mail：">
                {{ form.email }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮寄地址：">
                {{ form.mailing_address }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址：">
                {{ form.address }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>
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
    console.log('打开')
    this.dialogVisible = true
    getMemberInfo({id: this.showId})
      .then(res => {
        console.log(res)
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
