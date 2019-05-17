<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="标签管理" width="30%" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" label-width="90px" :rules="rules">
        <el-form-item label="标签标题" prop="title">
          <el-input v-model="form.title" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="获取方式">
          <el-radio-group v-model="form.get_method">
            <el-radio :label="1">手动分配</el-radio>
            <el-radio :label="2">义工相关</el-radio>
            <el-radio :label="3">队员相关</el-radio>
            <el-radio :label="4">捐款相关</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签名称" v-show="form.get_method === 1">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="选择岗位" v-show="form.get_method === 2">
          <el-select v-model="form.rule2.post_id" placeholder="请选择岗位">
            <el-option v-for="(item, index) in postList" :key="`post${index}`" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <div class="sub-item" v-for="(item, index) in form.rule2.rules" :key="`rule2${index}`">
            <div class="span-input">
              <span>标签等级</span>
              <span>{{item.level}}</span>
            </div>
            <div class="span-input">
              <span>标签名称</span>
              <el-input v-model="item.name" placeholder=""></el-input>
            </div>
            <div class="span-input">
              <span>获得积分</span>
              <el-input v-model="item.integral" placeholder=""></el-input>
            </div>
          </div>
          <div>
            <el-button type="success" size="mini" @click="addItem('rule2')">新增</el-button>
            <el-button type="danger" size="mini" @click="delItem('rule2')">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="项目类型" v-show="form.get_method === 3">
          <el-select v-model="form.rule3.project_type_id" placeholder="请选择项目类型">
            <el-option v-for="(item, index) in projectList" :key="`project${index}`" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <div class="sub-item" v-for="(item, index) in form.rule3.rules" :key="`rule3${index}`">
            <!-- <div class="span-input">
              <span>标签等级</span>
              <span>{{item.level}}</span>
            </div> -->
            <div class="span-input">
              <span>标签名称</span>
              <el-input v-model="item.name" placeholder=""></el-input>
            </div>
            <div class="span-input">
              <span>获得积分</span>
              <el-input v-model="item.integral" placeholder=""></el-input>
            </div>
          </div>
          <div>
            <el-button type="success" size="mini" @click="addItem('rule3')">新增</el-button>
            <el-button type="danger" size="mini" @click="delItem('rule3')">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="" v-show="form.get_method === 4">
          <div class="sub-item" v-for="(item, index) in form.rule4" :key="`rule2${index}`">
            <div class="span-input">
              <span>标签名称</span>
              <el-input v-model="item.name" placeholder=""></el-input>
            </div>
            <div class="span-input">
              <span>捐赠金额</span>
              <el-input v-model="item.donation_amount" placeholder=""></el-input>
            </div>
          </div>
          <div>
            <el-button type="success" size="mini" @click="addItem('rule2')">新增</el-button>
            <el-button type="danger" size="mini" @click="delItem('rule2')">删除</el-button>
          </div>
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
import { updateTags, addTags, getTagsInfo, getDictionariesList } from '@/api/table'
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
      fileList: [],
      projectList: [],
      postList: [],
      form: {
        title: '',
        get_method: 1,
        name: '',
        rule: null,
        rule2: {
          post_id: '',
          rules: [{
            name: '',
            level: 1,
            integral: ''
          }]
        },
        rule3: {
          project_type_id: '',
          rules: [{
            name: '',
            level: 1,
            integral: ''
          }]
        },
        rule4: [{
          name: '',
          donation_amount: ''
        }]
      },
      rules: {
        title: [
          { required: true, message: '请输入团体名称', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getTagsInfo({id: this.showId})
      .then(res => {
        console.log(res)
        for (let x in this.form) {
          for (let y in res.data) {
            if (x === y) {
              if (x === 'rule') {
                this.form[x] = JSON.parse(res.data[y])
              } else {
                this.form[x] = res.data[y]
              }
            }
          }
        }
        this.form[`rule${this.form['get_method']}`] = this.form['rule']
        for (let i = 2; i < 5; i++) {
          if (i !== this.form['get_method']) {
            switch (i) {
              case 2:
                this.form.rule2 = {
                  post_id: '',
                  rules: [{
                    name: '',
                    level: 1,
                    integral: ''
                  }]
                }
                break;
              case 3:
                this.form.rule3 = {
                  project_type_id: '',
                  rules: [{
                    name: '',
                    level: 1,
                    integral: ''
                  }]
                }
                break;
              case 4:
                this.form.rule4 = [{
                  name: '',
                  donation_amount: ''
                }]
                break;
            }
          }
        }
      })
    // 项目类型
    getDictionariesList({
      type: 3
    }).then(res => {
      if (res.status === 1) {
        this.projectList = res.data
      }
    })
    // 岗位
    getDictionariesList({
      type: 4
    }).then(res => {
      if (res.status === 1) {
        this.postList = res.data
      }
    })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    addItem (tag) {
      if (tag === 'rule4') {
        this.form[tag].push({
          name: '',
          donation_amount: ''
        })
      } else {
        this.form[tag].rules.push({
          name: '',
          level: this.form[tag].rules.length + 1,
          integral: ''
        })
      }
    },
    delItem (tag) {
      if (tag === 'rule4') {
        this.form[tag].splice(this.form[tag].length - 1, 1)
      } else {
        this.form[tag].rules.splice(this.form[tag].rules.length - 1, 1)
      }
    },
    submitForm () {
      // addIntegralLevel(this.form)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            let submitData = JSON.parse(JSON.stringify(this.form))
            submitData.rule = JSON.stringify(submitData[`rule${submitData.get_method}`])
            addTags(submitData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$emit('addComplete')
                    }
                  })
                } else {
                  this.$message({
                    message: '新增失败',
                    type: 'error'
                  })
                }
              })
          } else {
            // 修改
            let updateData = JSON.parse(JSON.stringify(this.form))
            updateData.rule = JSON.stringify(updateData[`rule${updateData.get_method}`])
            updateData.id = this.showId
            updateTags(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$emit('addComplete')
                    }
                  })
                } else {
                  this.$message({
                    message: '修改失败',
                    type: 'error'
                  })
                }
              })
          }
         
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.form-icon{
  padding: 15px 0;
}
.min-max{
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  .min-max-line{
    margin: 0 10px;
    height: 1px;
    width: 20px;
    background-color: #000;
  }
}
.handle-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.sub-item{
  border: dashed 1px #a0a0a0;
  margin-top: 5px;
  padding: 5px;
}
.span-input{
  display: flex;
  justify-content: flex-start;
  margin-top: 5px;
  span{
    width: 90px;
  }
}
</style>
