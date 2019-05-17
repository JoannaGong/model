<template>
  <div class="page-form">
      <div class="form-handle">
        <el-button type="success" @click="agreeApply" v-show="form.pass_button">{{form.pass_button}}</el-button>
        <el-button type="danger" @click="refuseApply" v-show="form.reject_button">{{form.reject_button}}</el-button>
        <!-- <el-button type="primary" @click="complete">筹款完成</el-button> -->
      </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="积分等级" width="60%" :before-close="beforeClose"> -->
      <el-form :model="form" ref="ruleForm" label-width="120px">
        <h3>报名信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input v-model="form.activity_name" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型">
              <el-input v-model="form.project_type_name" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员昵称">
              <el-input v-model="form.nickname" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名时间">
              <el-input v-model="form.created_at" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员ID">
              <el-input v-model="form.member_id" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名状态">
              <el-input v-model="form.status" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驳回理由">
              <el-input v-model="form.reject_reason_name" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>基本信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.member.nickname" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族">
              <el-input v-model="form.member.nation" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址">
              <el-input v-model="form.member.address" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯">
              <el-input v-model="form.member.nativePlaceStr" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄">
              <el-input v-model="form.member.birth_date" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-input v-model="form.member.sexName" placeholder="" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>报名问卷</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报名问卷" prop="content">
              <div class="form-content">
                <div class="content-item" v-for="(item, index) in form.signup_form_items" :key="index">
                  <div class="content-item-input" v-if="item.type === 1">
                    <div class="item-question">
                      <span>{{index + 1}}、</span>
                      <el-input :disabled="true" class="form-qusetion" v-model="form.signup_form_items[index].question" placeholder=""></el-input>
                      <!-- <el-button type="primary" size="mini" @click="moveQuestion(index, -1)">上移</el-button>
                      <el-button type="primary" size="mini" @click="moveQuestion(index, 1)">下移</el-button>
                      <el-button type="danger" size="mini" @click="moveQuestion(index, 0)">删除</el-button> -->
                    </div>
                    <div class="item-answer">
                      <span>用户答案：</span>
                      <el-input :disabled="true" class="form-qusetion" v-model="form.signup_form_items[index].answer" placeholder=""></el-input>
                      <!-- <el-button type="primary" size="mini" @click="moveQuestion(index, -1)">上移</el-button>
                      <el-button type="primary" size="mini" @click="moveQuestion(index, 1)">下移</el-button>
                      <el-button type="danger" size="mini" @click="moveQuestion(index, 0)">删除</el-button> -->
                    </div>
                  </div>
                  <div class="content-item-select" v-if="item.type === 2">
                    <div class="item-question">
                      <span>{{index + 1}}、</span>
                      <el-input :disabled="true" class="form-qusetion" v-model="form.signup_form_items[index].question" placeholder=""></el-input>
                    </div>
                    <div class="item-option">
                      <div class="item-option-item" v-for="(subItem, subIndex) in item.options" :key="`sub-${index}-${subIndex}`">
                        <span>选项{{chnNumChar[subIndex]}}:</span>
                        <el-input :disabled="true" class="item-option-item-input" placeholder="" v-model="subItem.option"></el-input>
                        <!-- <el-button class="del-option" type="danger" size="mini" @click="delOption(index, subIndex)">删除</el-button> -->
                      </div>
                      <div class="item-option-item" v-for="(subItem, subIndex) in item.options" :key="`sub11-${index}-${subIndex}`" v-show="subIndex === Number(item.answer)">
                        <span>用户答案:</span>
                        <el-input :disabled="true" class="item-option-item-input" placeholder="" v-model="subItem.option"></el-input>
                        <!-- <el-button class="del-option" type="danger" size="mini" @click="delOption(index, subIndex)">删除</el-button> -->
                      </div>
                      <!-- <el-button type="success" size="mini" @click="addOption(index)">新增选项</el-button> -->
                    </div>
                  </div>
                </div>
                <!-- <el-button type="success" size="mini" @click="addQusetion(2)">添加选择题</el-button> -->
                <!-- <el-button type="success" size="mini" @click="addQusetion(1)">添加填空题</el-button> -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
         <h3>事项设置</h3>
        <el-form-item label="" >
          <el-checkbox :label="item.name" v-model="item.ready" v-for="(item, index) in form.items" :key="index"></el-checkbox>
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
    <el-dialog
      title="您确定同意此次报名申请"
      :visible.sync="dialogApply"
      width="30%">
      <div>
        <el-select class="dialog-select" v-model="postId" placeholder="请选择义工岗位">
          <el-option v-for="(item, index) in postList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogApply = false">取 消</el-button>
        <el-button type="primary" @click="applyHandle">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="您确定驳回此次报名申请"
      :visible.sync="dialogReject"
      width="30%">
      <div>
        <el-select class="dialog-select" v-model="rejectReasonId" placeholder="请选择驳回理由">
          <el-option v-for="(item, index) in rejectList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReject = false">取 消</el-button>
        <el-button type="primary" @click="rejectHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getEnrollInfo, getDictionariesList, updateEnroll } from '@/api/table'
export default {
  data() {
    return {
      dialogVisible: true,
      dialogApply: false,
      dialogReject: false,
      fileList: [],
      showId: 0,
      rejectList: [],
      postList: [],
      postId: '',
      rejectReasonId: '',
      chnNumChar: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
      form: {
        activity_name: '',
        project_type_name: '',
        nickname: '',
        created_at: '',
        member_id: '',
        status: '',
        reject_reason_name: '',
        member: {},
        signup_form_items: [],
        items: [],
        reject_button: '',
        pass_button: ''
      }
    }
  },
  created () {
    this.showId = Number(this.$route.params.id)
    this.dialogVisible = true
    this.fetchData()
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    // 获取数据
    fetchData () {
      // 驳回理由
      getDictionariesList({
        type: 2
      }).then(res => {
        if (res.status === 1) {
          this.rejectList = res.data
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
      if (this.showId !== 0) {
        getEnrollInfo({id: this.showId})
          .then(res => {
            for (let x in this.form) {
              for (let y in res.data) {
                if (x === y) {
                  this.form[x] = res.data[y]
                  if (x === 'pics') {
                    for (let z in res.data.pics) {
                      this.fileList.push({
                        name: res.data.pics[z].name,
                        url: res.data.pics[z].pic
                      })
                    }
                  }
                  if (x === 'member') {
                    let tempData = JSON.parse(this.form[x].native_place)
                    let str = ''
                    tempData.map(item => {
                      str += item.name
                    })
                    this.form[x].nativePlaceStr = str
                    if (this.form[x].sex === 1) {
                      this.form[x].sexName = '男'
                    } else if(this.form[x].sex === 2) {
                      this.form[x].sexName = '女'
                    } else if (this.form[x].sex === 0) {
                      this.form[x].sexName = '未知'
                    }
                  }
                }
              }
            }
          })
      }
    },
    // 同意申请
    agreeApply () {
      if (this.form.pass_button === '审核' && this.form.project_type_name === '义工') {
        this.dialogApply = true
      } else {
        let that = this
        updateEnroll({
          id: this.showId,
          status: 1,
          reject_reason_id: this.rejectReasonId,
          items: JSON.stringify(this.form.items)
        }).then(res => {
          if (res.status === 1) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose () {
                that.dialogApply = false
                that.fetchData()
                // that.$store.dispatch('delVisitedView', that.$route)
                // that.$router.push({path: '/activity/apply'})
              }
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
    },
    // 驳回申请
    refuseApply () {
      this.dialogReject = true
    },
    // 筹款完成
    complete () {
    },
    // 驳回
    rejectHandle () {
      let that = this
      updateEnroll({
        status: -1,
        id: this.showId,
        post_id: this.postId,
        items: JSON.stringify(this.form.items)
      }).then(res => {
        if (res.status === 1) {
          this.$message({
            message: '驳回成功',
            type: 'success',
            duration: 1500,
            onClose () {
              that.dialogReject = false
              that.fetchData()
              // that.$store.dispatch('delVisitedView', that.$route)
              // that.$router.push({path: '/activity/apply'})
            }
          })
        } else {
           this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 申请
    applyHandle () {
      let that = this
      updateEnroll({
        id: this.showId,
        status: 1,
        reject_reason_id: this.rejectReasonId,
        items: JSON.stringify(this.form.items)
      }).then(res => {
        if (res.status === 1) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose () {
              that.dialogApply = false
              that.$store.dispatch('delVisitedView', that.$route)
              that.$router.push({path: '/activity/apply'})
            }
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.line{
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.form-qusetion{
  margin: 0 10px;
}
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
.page-form{
  padding: 15px;
}
.form-handle{
  margin: -15px;
  background-color: #eee;
  // margin-top: 5px;
  margin-bottom: 15px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px;
}
.form-content{
  // border: dashed 1px #000;
  // padding: 5px;
  margin-top: 10px;
  .content-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #eee;
    padding: 5px;
    margin-top: 5px;
    .content-item-input{
      min-width: 700px;
      .item-question{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item-answer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        span{
          width: 100px;
          margin-left: 35px;
        }
      }
    }
    .content-item-select{
      min-width: 700px;
      .item-question{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item-option{
        border: dashed 1px #eee;
        padding: 5px;
        margin: 5px;
        margin-left: 33px;
        .item-option-item{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          .del-option{
            margin-left: 10px;
          }
          .item-option-item-input{
            margin: 0 5px;
          }
          span{
            display: inline-block;
            width: 100px;
          }
        }
      }
    }
  }
}
.dialog-select{
  width: 100%;
}
</style>
