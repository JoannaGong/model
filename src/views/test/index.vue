<template>
  <div>
    <ueditor v-model="msg"></ueditor>
  </div>
</template>
<script>
export default {
  components: {
    ueditor: () => import('../../components/UEditor')
  },
  data () {
    return {
      msg: '<p>12312</p>'
    }
  }
}
</script>
