<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="user-name">
      <span>{{role_name}}</span>
    </div>
    <div class="notice"@click="$router.push('/setup/notice')">
      <el-badge :value="noticeCount" :max="99" class="item" @click="$router.push('setup/notice')">
        <svg-icon icon-class="notice_top" />
      </el-badge>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatarUrl" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <span style="display:block;" @click="dialogVisible = true">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="密码修改"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item label="原密码" prop="old_password">
          <el-input type="password" v-model="form.old_password" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="form.new_password" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="new_password_repeat">
          <el-input type="password" v-model="form.new_password_repeat" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUnreadEventCount, getUserInfo, updatePassword } from '@/api/table'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.new_password_repeat !== '') {
          this.$refs.form.validateField('new_password_repeat');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      noticeCount: 0,
      role_name: '',
      avatarUrl: '',
      form: {
        id: '',
        old_password: '',
        new_password: '',
        new_password_repeat: ''
      },
      rules: {
        old_password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new_password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password_repeat: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    this.getNotice()
    // setInterval(() => {
    //   this.getNotice()
    // }, 3000);
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo({
        token: sessionStorage.getItem('token')
      })
        .then(res => {
          if (res.status === 1) {
            this.role_name = res.data.role_name
            this.form.id = res.data.id
            this.avatarUrl = res.data.avatar
          }
        })
    },
    changePassword () {
      console.log(123132)
      let that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updatePassword(this.form)
            .then(res => {
              if (res.status === 1) {
                this.$message({
                  message: '修改密码成功',
                  type: 'success',
                  duration: 1500,
                  onClose () {
                    that.dialogVisible = false
                  }
                })
              } else {
                this.$message({
                  message: '修改密码失败',
                  type: 'error',
                })
              }
            })
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getNotice () {
      getUnreadEventCount().then(res => {
        this.noticeCount = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-name{
  display: inline-block;
  position: absolute;
  right: 130px;
}
.notice{
  display: inline-block;
  position: absolute;
  right: 100px;
  font-size: 22px;
  line-height: 22px;
  margin-top: 14px;
  cursor: pointer;
}
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

