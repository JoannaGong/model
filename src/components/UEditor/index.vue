<template>
  <div class="ueditor">
    <vue-ueditor-wrap @ready="ready" v-model="msg" :config="myConfig" mode="listener"></vue-ueditor-wrap>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  props: {
    height: Number,
    value: String
  },
  model: {
    prop: "value", //绑定的值，通过父组件传递
    event: "update" //自定义时间名
  },
  computed: {
    msg: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val)
      }
    }
  },
  // mounted () {
  //   this.msg = this.value
  // },
  data () {
    return {
      // msg: '',
      myConfig: {
        initialFrameHeight: this.height,
        section:['class', 'style'],
        serverUrl: '/api/ueditor/php/controller.php',
        catchRemoteImageEnable: true
      }
    }
  },
  components: {
    VueUeditorWrap
  },
  methods: {
    ready (editorInstance) {
      // let that = this
      // this.msg = this.value
      // editorInstance.addListener('contentChange', function( editor ) {
      //   // that.$emit('update', editorInstance.getContent())
      // })
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.ueditor{
  line-height: 0px !important;
}
</style>
