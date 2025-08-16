import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSheetsInBatches } from '#modules/create-sheet.js';
import GoogleMailMerge from '#modules/google-mail-merge.js';

app.name = 'Mail Merger Sender - @beerick94';
app.commandLine.appendSwitch('lang', 'vi-VN');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
process.env.ELECTRON_ENABLE_LOGGING = '0';

let mainWindow = null;
let filePickerWindow = null;
let sheetsHistoryWindow = null;

ipcMain.on('window:minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.minimize();
});

ipcMain.on('window:close', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.close();
});

ipcMain.handle('window:setPosition', (event, x, y) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.setPosition(x, y);
        return { success: true };
    } else {
        return { success: false };
    }
});

ipcMain.handle('window:getPosition', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        return win.getPosition();
    } else {
        return [0, 0];
    }
});

ipcMain.on('open:file-picker', (event) => {
    openFilePickerDialog();
});

ipcMain.on('open:sheets-history', (event) => {
    openSheetsListDialog();
});

ipcMain.handle('create:sheets', async (event, data) => {
    try {
        const result = await createSheetsInBatches(data);
        return result;
    } catch (error) {
        return {
            success: false,
            sheets: [],
            errors: [error.message]
        };
    }
});

ipcMain.handle('start:mail-merge', async (event, config) => {
    try {
        const mailMerge = new GoogleMailMerge(config);
        await mailMerge.init();
        await mailMerge.login();
        await mailMerge.startMailMerge(config.subject, config.body);
        await mailMerge.close();

        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
});

ipcMain.handle('show:message-box', async (event, options) => {
    try {
        const result = await dialog.showMessageBox(options);
        return result;
    } catch {
        return { response: 0 };
    }
});

ipcMain.handle('show:error-box', async (event, title, content) => {
    try {
        dialog.showErrorBox(title, content);
        return { success: true };
    } catch {
        return { success: false };
    }
});

ipcMain.on('open:external', (event, url) => {
    shell.openExternal(url);
});

const openFilePickerDialog = () => {
    if (filePickerWindow) {
        filePickerWindow.focus();
        return;
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const iconPath = path.join(__dirname, 'assets/icon.png');
    const htmlPath = path.join(__dirname, 'assets/ui/file-picker-modal.html');
    const preloadPath = path.join(__dirname, 'preload.js');

    filePickerWindow = new BrowserWindow({
        width: 500,
        height: 600,
        minWidth: 500,
        minHeight: 600,
        icon: iconPath,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            spellcheck: false,
            webSecurity: false,
            devTools: false,
            preload: preloadPath,
            enableWebAudio: true,
            autoplayPolicy: 'no-user-gesture-required'
        },
        resizable: false,
        language: 'vi-VN',
        frame: false,
        hasShadow: false,
        transparent: true
    });

    filePickerWindow.setMenuBarVisibility(false);
    filePickerWindow.loadFile(htmlPath);

    filePickerWindow.on('closed', () => {
        filePickerWindow = null;
    });

    if (mainWindow) {
        const [x, y] = mainWindow.getPosition();
        const [width, height] = mainWindow.getSize();
        const [dialogWidth, dialogHeight] = filePickerWindow.getSize();

        const centerX = x + (width - dialogWidth) / 2;
        const centerY = y + (height - dialogHeight) / 2;

        filePickerWindow.setPosition(Math.round(centerX), Math.round(centerY));
    }
};

const openSheetsListDialog = () => {
    if (sheetsHistoryWindow) {
        sheetsHistoryWindow.focus();
        return;
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const iconPath = path.join(__dirname, 'assets/icon.png');
    const htmlPath = path.join(__dirname, 'assets/ui/sheets-history-modal.html');
    const preloadPath = path.join(__dirname, 'preload.js');

    sheetsHistoryWindow = new BrowserWindow({
        width: 600,
        height: 700,
        minWidth: 600,
        minHeight: 700,
        icon: iconPath,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            spellcheck: false,
            webSecurity: false,
            devTools: false,
            preload: preloadPath,
            enableWebAudio: true,
            autoplayPolicy: 'no-user-gesture-required'
        },
        resizable: false,
        language: 'vi-VN',
        frame: false,
        hasShadow: false,
        transparent: true
    });

    sheetsHistoryWindow.setMenuBarVisibility(false);
    sheetsHistoryWindow.loadFile(htmlPath);

    sheetsHistoryWindow.on('closed', () => {
        sheetsHistoryWindow = null;
    });

    if (mainWindow) {
        const [x, y] = mainWindow.getPosition();
        const [width, height] = mainWindow.getSize();
        const [dialogWidth, dialogHeight] = sheetsHistoryWindow.getSize();

        const centerX = x + (width - dialogWidth) / 2;
        const centerY = y + (height - dialogHeight) / 2;

        sheetsHistoryWindow.setPosition(Math.round(centerX), Math.round(centerY));
    }
};

const initWindow = () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const iconPath = path.join(__dirname, 'assets/icon.png');
    const htmlPath = path.join(__dirname, 'index.html');
    const preloadPath = path.join(__dirname, 'preload.js');

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 680,
        minWidth: 1000,
        minHeight: 680,
        icon: iconPath,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            spellcheck: false,
            webSecurity: false,
            devTools: false,
            preload: preloadPath,
            enableWebAudio: true,
            autoplayPolicy: 'no-user-gesture-required'
        },
        resizable: false,
        title: 'Mail Merger Sender - @beerick94',
        language: 'vi-VN',
        frame: false,
        hasShadow: false,
        transparent: true
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile(htmlPath);
};

app.whenReady().then(initWindow);
app.on('window-all-closed', () => {
    app.quit();
});
