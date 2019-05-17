<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.handle-handle{
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.search-hadle{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  .search-input{
    width: 30%;
    margin-right: 10px;
  }
  .search-select{
    margin-right: 10px;
  }
}
.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
</style>

