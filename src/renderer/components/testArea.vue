<template>
  <div class="container">
    <div style="margin-left: 100px;">
      <el-form label-suffix=":"
               label-width="60px">
        <el-form-item label="项目名">
          <el-input style="width:300px;"
                    disabled
                    v-model="projectName">
            <el-button slot="append"
                       @click="openNewWindow">请选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input disabled
                    v-model="version"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
                    disabled
                    v-model="description"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 :disabled="!projectName"
                 @click="projectInstall"
                 v-loading="installLoading">安装依赖</el-button>
      <el-button type="primary"
                 :disabled="!projectName"
                 @click="shellDev"
                 v-loading="devloading">本地运行</el-button>
      <el-button type="primary"
                 :disabled="!projectName"
                 @click="doBuild"
                 v-loading="buildLoading">测试环境打包</el-button>
      <el-button type="primary"
                 @click="openFile">打开</el-button>
    </div>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
export default {
  name: 'landing-page',
  components: { SystemInformation },
  created () {
    this.getFilePath()
  },
  data () {
    return {
      description: '',
      version: '',
      projectName: '',
      projectPath: '',
      devloading: false,
      installLoading: false,
      buildLoading: false
    }
  },
  methods: {
    doBuild () {
      this.buildLoading = true
      let exec = require('child_process').exec
      let childprocess = exec(`npm run build`, { cwd: this.projectPath, windowsHide: false })
      childprocess.stdout.on('data', (data) => {
        this.buildLoading = false
        this.$message.success('打包成功')
        console.log('stdout: ' + data)
      })
    },
    openFile () {
      const { shell } = require('electron')
      // shell.showItemInFolder('D:')
      shell.beep()
    },
    // 下载依赖
    projectInstall () {
      this.installLoading = true
      let exec = require('child_process').exec
      let childprocess = exec(`npm i`, { cwd: this.projectPath, windowsHide: false })
      childprocess.stdout.on('data', (data) => {
        this.installLoading = false
        this.$message.success('下载依赖成功')
        console.log('stdout: ' + data)
      })
    },
    // 选择文件
    openNewWindow () {
      const { dialog } = require('electron').remote
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, res => {
        this.projectPath = res[0]
        let arr = res[0].split('\\')
        let packageJsonPath = `${this.projectPath}\\package.json`
        if (this.$fs.existsSync(packageJsonPath)) {
          this.projectName = arr[arr.length - 1]
          let data = this.$fs.readFileSync(packageJsonPath)
          let { version, description } = JSON.parse(data.toString())
          this.version = version
          this.description = description
        } else {
          dialog.showMessageBox({
            title: '文件选择错误',
            type: 'error',
            message: '请选择正确的前端工程文件夹'
          })
        }
      })
    },
    getFilePath () {
      document.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()

        for (const f of e.dataTransfer.files) {
          console.log('File(s) you dragged here: ', f.path)
        }
      })
      document.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.stopPropagation()
      })
    },
    // 本地运行
    shellDev () {
      this.devloading = true
      let exec = require('child_process').exec
      let childprocess = exec(`npm start`, { cwd: this.projectPath, windowsHide: false })
      childprocess.stdout.on('data', (data) => {
        this.devloading = false
        this.$message.success('启动成功')
        console.log('stdout: ' + data)
      })
    },
    writeFile () {
      this.$fs.writeFileSync('D:/testdemo/test.txt', '我修改了test文件')
    },
    doShell () {
      // const { shell } = require("electron");
      // shell.openExternal("https://github.com");
      // shell.showItemInFolder("D:/testdemo/test.txt")

      let exec = require('child_process').exec
      let childprocess = exec(`npm i`, { cwd: this.projectPath, windowsHide: false })
      childprocess.stdout.on('data', function (data) {
        console.log('stdout: ' + data)
      })

      childprocess.on('close', function (code) {
        console.log('out code：' + code)
      })
    }
  }
}
</script>

<style lang="less">

.container {
}
</style>
