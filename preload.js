const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    close: () => ipcRenderer.send('window:close'),
    minimize: () => ipcRenderer.send('window:minimize'),
    setPosition: (x, y) => ipcRenderer.invoke('window:setPosition', x, y),
    getPosition: () => ipcRenderer.invoke('window:getPosition'),
    openFilePicker: () => ipcRenderer.send('open:file-picker'),
    openSheetsHistory: () => ipcRenderer.send('open:sheets-history'),
    createSheets: (data) => ipcRenderer.invoke('create:sheets', data),
    startMailMerge: (config) => ipcRenderer.invoke('start:mail-merge', config),
    showMessageBox: (options) => ipcRenderer.invoke('show:message-box', options),
    showErrorBox: (title, content) => ipcRenderer.invoke('show:error-box', title, content),
    openExternal: (url) => ipcRenderer.send('open:external', url)
});
