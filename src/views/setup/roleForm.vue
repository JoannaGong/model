<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="团体管理" width="30%" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" label-width="110px" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="角色显示名称" prop="name">
          <el-input v-model="form.display_name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="权限节点">
          <el-tree
            ref="tree"
            :data="treeList"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange">
          </el-tree>
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
import { updateRoles, addRoles, getRolesInfo, getPermissionList } from '@/api/table'
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
      treeList: [],
      form: {
        name: '',
        checkedList: [],
        display_name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        display_name: [
          { required: true, message: '请选择数据字典类型', trigger: 'blur' }
        ]
      },
      fileName: ''
    }
  },
  created () {
    console.log('打开')
    this.dialogVisible = true
    getPermissionList()
      .then(res => {
        for (let x in res.data) {
          let tempData = {}
          tempData.id = `a${x}`
          tempData.label = res.data[x].group_name
          for (let y in res.data[x].children) {
            if (!tempData.hasOwnProperty('children')) {
              tempData.children = []
            }
            tempData.children.push({
              id: res.data[x].children[y].id,
              label: res.data[x].children[y].name,
              key: res.data[x].children[y].key
            })
          }
          this.treeList.push(tempData)
        }
        getRolesInfo({id: this.showId})
          .then(res => {
            console.log(res)
            let selectTree = []
            for (let x in this.form) {
              for (let y in res.data) {
                if (x === y) {
                  this.form[x] = res.data[y]
                  if (x === 'checkedList') {
                    for (let z in res.data[x]) {
                      this.treeList.map(item => {
                        item.children.map(subItem => {
                          if (subItem.label === res.data[x][z]) {
                            selectTree.push(subItem)
                          }
                        })
                      })
                    }
                    console.log(selectTree)
                    this.$refs.tree.setCheckedNodes(selectTree);
                  }
                }
              }
            }
          })
      })
  },
  methods: {
    beforeClose (done) {
      this.$emit('close')
    },
    submitForm () {
      let premissionList = this.$refs.tree.getCheckedNodes()
      let checkedList = []
      premissionList.map(item => {
        if (!item.hasOwnProperty('children')) {
          checkedList.push(item.label)
        }
      })
      // addIntegralLevel(this.form)
      let submitData = JSON.parse(JSON.stringify(this.form))
      submitData.checkedList = JSON.stringify(checkedList)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.showId === 0) {
            // 新增
            addRoles(submitData)
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
            let updateData = JSON.parse(JSON.stringify(submitData))
            updateData.id = this.showId
            updateRoles(updateData)
              .then(res => {
                console.log(res)
                if (res.status === 1) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
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
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
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
</style>
