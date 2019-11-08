<template>
  <div class="container">
    <div class="tagArea">
      <el-tabs type="card"
               tab-position="left"
               @tab-click="tabClick"
               style="height: 200px;">
        <el-tab-pane label="测试专区" name="test"></el-tab-pane>
        <el-tab-pane label="开发专区" name="dev"></el-tab-pane>
      </el-tabs>
    </div>
    <component :is="currentTabComponent"></component>
  </div>
</template>
<script>
import testArea from '../components/testArea'
export default {
  data () {
    return {
      currentTabComponent: 'testArea'
    }
  },
  components: { testArea },
  methods: {
    tabClick (val) {
      if (val.name === 'test') {
        this.currentTabComponent = testArea
      } else {
        this.currentTabComponent = ''
      }
      console.log('val:', val.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
.tagArea {
  // background: #2e2c29;
  display: flex;
}
</style>