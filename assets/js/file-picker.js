document.addEventListener('DOMContentLoaded', () => {
    const waitForAPI = () => {
        if (window.electronAPI) {
            initWindowControl();
            initFilePicker();
        } else {
            setTimeout(waitForAPI, 100);
        }
    };

    const initWindowControl = () => {
        const closeBtn = document.getElementById('close-btn');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                try {
                    playBeep(600, 100, 0.15);
                    window.electronAPI.close();
                } catch {
                    //
                }
            });
        }

        const headerElement = document.querySelector('header');
        if (headerElement) {
            let isDragging = false;
            let startPos = { x: 0, y: 0 };

            headerElement.addEventListener('mousedown', (e) => {
                try {
                    isDragging = true;
                    const winPos = window.electronAPI.getPosition();
                    startPos = {
                        x: e.screenX - winPos[0],
                        y: e.screenY - winPos[1]
                    };
                } catch {
                    isDragging = false;
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    try {
                        const newX = e.screenX - startPos.x;
                        const newY = e.screenY - startPos.y;
                        window.electronAPI.setPosition(newX, newY).catch(() => {
                            isDragging = false;
                        });
                    } catch {
                        isDragging = false;
                    }
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    };

    const initFilePicker = () => {
        const browseBtn = document.getElementById('browse-file-btn');
        const fileInput = document.getElementById('txt-file-input');
        const cancelBtn = document.getElementById('cancel-btn');
        const createSheetBtn = document.getElementById('create-sheet-btn');
        const fileInfo = document.getElementById('file-info');

        let selectedFile = null;
        let parsedData = [];

        browseBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type === 'text/plain') {
                selectedFile = file;
                parseFile(file);
            }
        });

        cancelBtn.addEventListener('click', () => {
            try {
                playBeep(800, 50, 0.1);
                window.electronAPI.close();
            } catch {
                //
            }
        });

        createSheetBtn.addEventListener('click', async () => {
            if (parsedData.length > 0) {
                await createSheetsFromData(parsedData);
            }
        });

        const parseFile = (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const lines = content.split('\n').filter((line) => line.trim());

                    parsedData = lines
                        .map((line) => {
                            const parts = line.split('|');
                            if (parts.length === 3) {
                                return [parts[0].trim(), parts[1].trim(), parts[2].trim()];
                            }
                            return null;
                        })
                        .filter((row) => row !== null);

                    if (parsedData.length > 0) {
                        showFileInfo(file.name, parsedData.length);
                        createSheetBtn.disabled = false;
                        playBeep(700, 30, 0.08);
                    } else {
                        window.electronAPI.showErrorBox('Format Error', 'file không đúng format. cần: id|ten page|email');
                        resetFileInfo();
                    }
                } catch (error) {
                    window.electronAPI.showErrorBox('File Error', 'lỗi đọc file');
                    resetFileInfo();
                }
            };
            reader.readAsText(file);
        };

        const showFileInfo = (filename, totalLines) => {
            const batches = Math.ceil(totalLines / 50);
            document.getElementById('selected-filename').textContent = filename;
            document.getElementById('total-lines').textContent = totalLines;
            document.getElementById('total-batches').textContent = batches;
            fileInfo.classList.remove('hidden');
        };

        const resetFileInfo = () => {
            fileInfo.classList.add('hidden');
            createSheetBtn.disabled = true;
            selectedFile = null;
            parsedData = [];
            fileInput.value = '';
        };

        const createSheetsFromData = async (data) => {
            try {
                setLoadingState(true);

                const result = await window.electronAPI.createSheets(data);

                if (result.success) {
                    const saveData = {
                        timestamp: new Date().toISOString(),
                        totalRows: data.length,
                        sheets: result.sheets,
                        originalData: data
                    };

                    localStorage.setItem('sheets_history', JSON.stringify(saveData));

                    playBeep(1000, 60, 0.12);
                    window.electronAPI.close();
                } else {
                    let errorMessage = 'lỗi tạo sheet:\n\n';
                    result.errors.forEach((error) => {
                        errorMessage += `${error}\n`;
                    });
                    await window.electronAPI.showMessageBox({
                        type: 'error',
                        title: 'Lỗi',
                        message: 'Lỗi tạo sheet',
                        detail: errorMessage,
                        buttons: ['OK']
                    });
                }
            } catch (error) {
                window.electronAPI.showErrorBox('Error', 'lỗi tạo sheet: ' + error.message);
            } finally {
                setLoadingState(false);
            }
        };

        const setLoadingState = (isLoading) => {
            const createBtn = document.getElementById('create-sheet-btn');
            const createIcon = document.getElementById('create-icon');
            const createText = document.getElementById('create-text');

            if (isLoading) {
                createBtn.disabled = true;
                createIcon.className = 'fa-solid fa-spinner animate-spin mr-2';
                createText.textContent = 'Đang tạo...';
            } else {
                createBtn.disabled = false;
                createIcon.className = 'fa-solid fa-table mr-2';
                createText.textContent = 'Tạo Sheet';
            }
        };
    };

    waitForAPI();
});
