<template>
  <div>
    <el-dialog :width="'20%'" :visible.sync="dialogVisible" title="设置标签"  :before-close="beforeClose">
      <el-form :model="form" label-width="90px">
        <el-form-item label="所属标签:">
          <el-select v-model="tag_ids" multiple placeholder="请选择">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
      </el-form>
      <div class="handle-btn">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="" @click="beforeClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMemberInfo, getTagsList, updateMember } from '@/api/table'
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
      selectList: [],
      tag_ids: [],
      form: {
        tag_ids: ''
      }
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    this.fetchData()
    getMemberInfo({id: this.showId})
      .then(res => {
        console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              this.form[x] = res.data[y]
              if (x === 'tag_ids' && this.form[x]) {
                console.log(this.form[x])
                this.tag_ids = JSON.parse(this.form[x])
              }
            }
          }
        }
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    fetchData () {
      getTagsList({
        get_method: 1
      }).then(res => {
        this.selectList = res.data
      })
    },
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      console.log(this.tag_ids)
      let that = this
      updateMember({
        id: this.showId,
        tag_ids: JSON.stringify(this.tag_ids)
      }).then(res => {
        if (res.status === 1) {
          this.$message({
            message: '分配成功',
            type: 'success',
            duration: 1500,
            onClose () {
              that.$emit('complate')
            }
          })
        } else {
          this.$message({
            message: '分配失败',
            type: 'error',
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.handle-btn{
  display: flex;
  justify-content: center;
}
</style>
