<template>
  <div>
    <span class="test">123</span>
    <el-button type="primary" @click="getFile">确定</el-button>
    <el-button type="primary" @click="writeFile">修改文本</el-button>
    <el-button type="primary" @click="doShell">shell</el-button>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";
export default {
  name: "landing-page",
  components: { SystemInformation },
  methods: {
    getFile() {
      let data = this.$fs.readFileSync("D:/test.txt");
      alert(data);
    },
    writeFile() {
      this.$fs.writeFileSync("D:/testdemo/test.txt", "我修改了test文件");
    },
    doShell() {
      // const { shell } = require("electron");
      // shell.openExternal("https://github.com");
      // shell.showItemInFolder("D:/testdemo/test.txt")
      var child_process = require("child_process");
      child_process.exec(`start cmd.exe /K ping 127.0.0.1`);
    }
  }
};
</script>

<style lang="less">
.test {
  color: orange;
}
</style>
