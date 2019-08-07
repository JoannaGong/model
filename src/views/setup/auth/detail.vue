<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="90px" :rules="rules" class="demo-form">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色显示名称：" prop="displayName">
        <el-input v-model="form.displayName" placeholder="请输入角色显示名称" />
      </el-form-item>
      <el-form-item label="权限设置:">
        <el-tree :data="treeList" show-checkbox node-key="id" ref="tree"></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addRole,
  updateRole,
  getRoleInfo,
  getPermissionList
} from "@/api/table";
import { getToken } from "@/utils/auth";
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      form: {
        
      },
      treeList: [],
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        displayName: [
          { required: true, message: "请输入角色显示名称", trigger: "blur" }
        ],
        score: [{ required: true, message: "请输入评分", trigger: "blur" }],
      }
    };
  },
  created() {
    if (this.$route.params.id != 0) {
      getRoleInfo({ id: this.$route.params.id }).then(res => {
        // console.log(res)
        this.form = res.data.permission;
        let data = res.data.permission;
        var tempArr = data.permissionRoleList;
        tempArr.forEach(item => {
          item.id = item.roleId
          item.label = item.roleDetails.roleName
        });
        this.$refs.tree.setCheckedNodes(tempArr)
      });
    }
    getPermissionList().then(res => {
      // console.log(res);
      for(let x in res.data.roleDetailsList){
        let tempData = {}
        tempData.id = res.data.roleDetailsList[x].roleId
        tempData.label = res.data.roleDetailsList[x].groupName
        tempData.children = []
        tempData.children.push({
          id: res.data.roleDetailsList[x].id,
          label: res.data.roleDetailsList[x].roleName,
        })
        this.treeList.push(tempData)
      }

      for(let x=0; x<this.treeList.length; x++){
        for(let y=x+1; y<this.treeList.length; y++){
          if(this.treeList[x].label === this.treeList[y].label){
            this.treeList[y].children.forEach(item => {
              this.treeList[x].children.push({
                id: item.id,
                label: item.label,
              })
            })
            this.treeList.splice(y, 1)
            y--
          }
        }
      }
    });
  },
  methods: {
    submitForm(formName) {
      let permissionList = this.$refs.tree.getCheckedNodes()
      this.form.permissionRoleList = []
      permissionList.forEach(item => {
        if(!item.hasOwnProperty('children')){
          this.form.permissionRoleList.push({
            roleId: item.id
          })
        }
      })
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id == 0) {
            addRole(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/setup/auth",
                    query: {
                      pageNum: this.$route.query.pageNum
                    }
                  });
                }, 1000);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
          } else {
            updateRole(this.form).then(res => {
              if (res.code === 101) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/setup/auth",
                    query: {
                      pageNum: this.$route.query.pageNum
                    }
                  });
                }, 1000);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fileUrl() {
      return `${process.env.BASE_API}/uploadHandler/upload`;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.coverPicUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传的图片只能是 jpg/png/jpeg/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    back() {
      this.$router.push({
        path: "/location/index",
        query: {
          page: this.$route.query.page
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__label {
  width: 120px !important;
  margin-left: -23px;
}
.demo-form .el-form-item {
  padding: 0 15px;
}
.el-form-item {
  width: 40%;
}
/deep/.el-form-item__content {
  margin-left: 98px !important;
}
</style>
