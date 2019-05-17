<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="会员信息"  :before-close="beforeClose">
      <el-form :model="form" label-width="90px">
        <h3>订单信息</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="订单编号：">
                {{ form.order_no }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="订单状态：">
                {{ form.status_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员昵称：">
                {{ form.nickname }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收货人：">
                {{ form.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员编号：">
                {{ form.member_no }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：">
                {{ form.tel }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="兑换时间：">
                {{ form.created_at }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址：">
                {{ form.address }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发货时间：">
                {{ form.delivery_time }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                {{ form.remark }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物流单号：">
                {{ form.logistics_no }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <h3>商品信息</h3>
        <div class="form-item">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="商品名称：">
                {{ form.goods_name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量：">
                {{ form.count }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="兑换积分：">
                {{ form.integral }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总积分：">
                {{ form.total_integral }}
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-handle-btn">
            <el-button type="primary" @click="deliverGoods">确认发货</el-button>
            <el-button type="" @click="$emit('close')">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getIntegralOrderInfo, deliverIntegralOrder } from '@/api/table'
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
        id: '',
        order_no: '',
        status: '',
        goods_id: '',
        goods_name: '',
        standard: '',
        integral: '',
        count: '',
        total_integral: '',
        member_id: '',
        name: '',
        tel: '',
        address: '',
        remark: '',
        delivery_time: '',
        logistics_no: '',
        created_at: '',
        updated_at: '',
        status_name: '',
        nickname: '',
        member_no: ''
      }
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getIntegralOrderInfo({id: this.showId})
      .then(res => {
        console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              this.form[x] = res.data[y]
            }
          }
        }
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    deliverGoods () {
      this.$prompt('请填写物流单号以确认发货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        deliverIntegralOrder({
          id: this.showId,
          logistics_no: value
        })
          .then(res => {
            if (res.status === 1) {
              this.$message({
                message: '发货成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.$emit('close')
                }
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'info',
                onClose: () => {
                }
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.form-handle-btn{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
