<template>
  <div style="display: flex; flex-direction: row;">
    <div style="border-radius: 8px 0 0 0; background-color: #F1F2F6; height: 100%; width: 230px;">
      <div
        style="border-radius: 8px 0 0 0; font-size: 20px; padding: 20px; color: #292929; user-select: none;"
      >
        任务
        <span style="font-size: 12px;">/ Tasks</span>
      </div>
      <div />
    </div>
    <div style="flex: 1; padding: 20px;">
      WIP
    </div>
  </div>
</template>

<script>

const ipc = require('electron').ipcRenderer

export default {
  components: {
  },
  data () {
    return {}
  },
  methods: {
    openDialogByRemote () {
      const { dialog } = require('electron').remote
      dialog.showMessageBox({
        title: '你好',
        message: '来自主进程的消息：',
        detail: '我是来自主进程的dialog，使用remote过来的！',
        type: 'info'
      })
    },
    openDialogByIpc () {
      ipc.send('showDialog', `<${this.$t('a message')}>`)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../themes/light.less";

.home-button {
  background-color: #263238;
  opacity: 1;
  border-radius: 4px;
  cursor: pointer;
  height: 45px;
  width: 150px;
  margin: 10px 10px;
  text-align: center;
  line-height: 45px;
}

.service-box {
  display: flex;
  justify-content: center;
  padding: 20px;
  display: flex;
  :not(:first-child) {
    margin-left: 15px;
  }
}

</style>
