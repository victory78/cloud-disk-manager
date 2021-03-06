import { BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

class MainWindow {
  constructor (win) {
    // win代表electron窗口实例
    // win is this electron window instance
    this.win = win
  }

  initBrowserPage () {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) {
        // 开发环境下自启动开发者工具
        // start developer tools in the development environment
        this.win.webContents.openDevTools({ mode: 'detach' })
      }
    } else {
      createProtocol('app')
      this.win.loadURL('app://./index.html')
    }
  }

  createWindow () {
    if (!this.win) {
      const win = new BrowserWindow({
        width: 1100,
        height: 770,
        minWidth: 1100,
        minHeight: 770,
        show: false,
        webPreferences: {
          nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        },
        // eslint-disable-next-line no-undef
        icon: `${__static}/app.ico`,
        frame: false
      })

      win.once('ready-to-show', () => {
        win.show()
      })

      win.on('closed', () => {
        this.win = null
      })

      this.win = win

      // 初始化浏览器页面
      this.initBrowserPage()

      // 设置窗口菜单
      this.setWindowMenu()
    }
  }

  setWindowMenu () {
    if (process.platform === 'darwin') {
      const template = [
        {
          label: 'Cloud Disk Manager',
          submenu: [
            {
              role: 'about'
            },
            {
              role: 'quit'
            }]
        }]
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    } else {
      Menu.setApplicationMenu(null)
    }
  }
}

export default MainWindow
