<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.filter-container {
  display: flex;
  margin-bottom: 20px;
}
.pagination-container {
  width: 100%;
  padding: 20px;
  text-align: center;
}
.el-dialog__wrapper .el-dialog {
  margin: 2vh auto !important;
}
.el-dialog__title {
  font-weight: bold !important;
}
.el-form {
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 20px 10px;
  }
}
.el-dialog {
  width: 65%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.clearfix::before, .clearfix::after {
  display: block;
  content: '';
}
.clearfix::after {
  clear: both;
}
.app-container {
  padding: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

