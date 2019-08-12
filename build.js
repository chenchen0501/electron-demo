var electronInstaller = require('electron-winstaller');
var path = require("path");

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: path.join('./out/HelloWorld-win32-x64'), //入口
  outputDirectory: path.join('./installer/installer64'),     //出口
  authors: 'yyt',
  exe: "HelloWorld.exe",        //名称
  setupIcon: path.join('icon.ico'),//安装图标，必须本地
  iconUrl: 'http://pm72qibzx.bkt.clouddn.com/icon.ico',//程序图标，必须url
  noMsi: true,
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));