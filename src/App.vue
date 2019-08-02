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
.model-pics {
  width: 150px;
  height: 200px;
  margin: 0 10px 10px 0;
  float: left;
  overflow: hidden;

  img {
    width: 100%;
  }
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
</style>

