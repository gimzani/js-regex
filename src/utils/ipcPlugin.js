
const ipc = require('electron').ipcRenderer;

const ipcPlugin = {
  install(Vue){
    Vue.prototype.$ipc = ipc;
  }
}

export default ipcPlugin;