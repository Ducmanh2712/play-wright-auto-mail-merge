document.addEventListener('DOMContentLoaded', () => {
    const waitForAPI = () => {
        if (window.electronAPI) {
            initWindowControl();
            initButtons();
            initInputHandlers();
            restoreInputValues();
        } else {
            setTimeout(waitForAPI, 100);
        }
    };

    const initWindowControl = () => {
        const closeBtn = document.getElementById('close-btn');
        const minimizeBtn = document.getElementById('minimize-btn');

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

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                try {
                    playBeep(800, 50, 0.1);
                    window.electronAPI.minimize();
                } catch {
                    //
                }
            });
        }

        const headerElement = document.querySelector('.header');
        if (headerElement) {
            let isDragging = false;
            let startPos = { x: 0, y: 0 };

            headerElement.addEventListener('mousedown', async (e) => {
                try {
                    isDragging = true;
                    const winPos = await window.electronAPI.getPosition();
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

    const initButtons = () => {
        const openSheetsHistoryBtn = document.getElementById('open-sheets-history-btn');
        if (openSheetsHistoryBtn) {
            openSheetsHistoryBtn.addEventListener('click', () => {
                playBeep(900, 60, 0.12);
                window.electronAPI.openSheetsHistory();
            });
        }

        const genSheetBtn = document.getElementById('gen-sheet-btn');
        if (genSheetBtn) {
            genSheetBtn.addEventListener('click', () => {
                playBeep(1000, 60, 0.12);
                window.electronAPI.openFilePicker();
            });
        }

        const sendMailBtn = document.getElementById('send-mail-btn');
        if (sendMailBtn) {
            sendMailBtn.addEventListener('click', () => {
                playBeep(1200, 80, 0.15);
                startMailMerge();
            });
        }

        const decreaseThreadsBtn = document.getElementById('decrease-threads');
        const increaseThreadsBtn = document.getElementById('increase-threads');
        const threadsInput = document.getElementById('threads');

        if (decreaseThreadsBtn && threadsInput) {
            decreaseThreadsBtn.addEventListener('click', () => {
                playBeep(700, 30, 0.08);
                const currentValue = parseInt(threadsInput.value) || 1;
                if (currentValue > 1) {
                    threadsInput.value = currentValue - 1;
                    saveInputValue('threads', threadsInput.value);
                }
            });
        }

        if (increaseThreadsBtn && threadsInput) {
            increaseThreadsBtn.addEventListener('click', () => {
                playBeep(700, 30, 0.08);
                const currentValue = parseInt(threadsInput.value) || 1;
                if (currentValue < 50) {
                    threadsInput.value = currentValue + 1;
                    saveInputValue('threads', threadsInput.value);
                }
            });
        }
    };

    const initInputHandlers = () => {
        const inputs = document.querySelectorAll('input, textarea');

        inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                const key = e.target.id;
                const value = e.target.value;
                saveInputValue(key, value);
            });

            input.addEventListener('blur', (e) => {
                const key = e.target.id;
                const value = e.target.value;
                saveInputValue(key, value);
            });

            input.addEventListener('focus', () => {
                playBeep(700, 30, 0.08);
            });
        });

        const threadsInput = document.getElementById('threads');
        if (threadsInput) {
            threadsInput.addEventListener('change', (e) => {
                let value = parseInt(e.target.value) || 1;
                value = Math.max(1, Math.min(50, value));
                e.target.value = value;
                saveInputValue('threads', value);
            });
        }
    };

    const saveInputValue = (key, value) => {
        try {
            const savedData = JSON.parse(localStorage.getItem('input_values') || '{}');
            savedData[key] = value;
            localStorage.setItem('input_values', JSON.stringify(savedData));
        } catch {
            //
        }
    };

    const restoreInputValues = () => {
        try {
            const savedData = JSON.parse(localStorage.getItem('input_values') || '{}');

            Object.keys(savedData).forEach((key) => {
                const element = document.getElementById(key);
                if (element && savedData[key]) {
                    element.value = savedData[key];
                }
            });
        } catch {
            //
        }
    };

    const startMailMerge = async () => {
        try {
            const mailList = document.getElementById('mail-list').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const body = document.getElementById('body').value.trim();
            const threads = parseInt(document.getElementById('threads').value) || 1;

            if (!mailList || !subject || !body) {
                await window.electronAPI.showMessageBox({
                    type: 'warning',
                    title: 'Thiếu thông tin',
                    message: 'Vui lòng điền đầy đủ mail list, subject và body',
                    buttons: ['OK']
                });
                return;
            }

            const sheetsHistory = localStorage.getItem('sheets_history');
            if (!sheetsHistory) {
                await window.electronAPI.showMessageBox({
                    type: 'warning',
                    title: 'Chưa có sheet',
                    message: 'Vui lòng tạo sheet trước khi gửi mail',
                    buttons: ['OK']
                });
                return;
            }

            const historyData = JSON.parse(sheetsHistory);
            if (!historyData.sheets || historyData.sheets.length === 0) {
                await window.electronAPI.showMessageBox({
                    type: 'warning',
                    title: 'Sheet trống',
                    message: 'Không có sheet nào để gửi mail',
                    buttons: ['OK']
                });
                return;
            }

            const mailRows = mailList
                .split('\n')
                .filter((line) => line.trim())
                .map((line) => {
                    const parts = line.split('|');
                    if (parts.length >= 3) {
                        return {
                            email: parts[0].trim(),
                            password: parts[1].trim(),
                            recoveryEmail: parts[2].trim()
                        };
                    }
                    return null;
                })
                .filter((row) => row !== null);

            if (mailRows.length === 0) {
                await window.electronAPI.showMessageBox({
                    type: 'warning',
                    title: 'Mail list sai format',
                    message: 'Format: email|password|recoveryEmail',
                    buttons: ['OK']
                });
                return;
            }

            const confirmResult = await window.electronAPI.showMessageBox({
                type: 'question',
                title: 'Xác nhận gửi mail',
                message: `Gửi mail cho ${mailRows.length} tài khoản?`,
                detail: `Số luồng: ${threads}\nSố sheet: ${historyData.sheets.length}`,
                buttons: ['Hủy', 'Gửi']
            });

            if (confirmResult.response !== 1) return;

            setSendMailLoadingState(true);

            const batches = [];
            for (let i = 0; i < mailRows.length; i += threads) {
                batches.push(mailRows.slice(i, i + threads));
            }

            const results = [];
            for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
                const batch = batches[batchIndex];
                const batchPromises = batch.map(async (mailRow, mailIndex) => {
                    try {
                        const sheetIndex = (batchIndex * threads + mailIndex) % historyData.sheets.length;
                        const sheetLink = historyData.sheets[sheetIndex].url;

                        const config = {
                            email: mailRow.email,
                            password: mailRow.password,
                            recoveryEmail: mailRow.recoveryEmail,
                            sheetLink: sheetLink,
                            subject: subject,
                            body: body
                        };

                        const result = await window.electronAPI.startMailMerge(config);
                        return {
                            email: mailRow.email,
                            success: result.success,
                            error: result.error || null
                        };
                    } catch (error) {
                        return {
                            email: mailRow.email,
                            success: false,
                            error: error.message
                        };
                    }
                });

                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);

                if (batchIndex < batches.length - 1) {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                }
            }

            const successCount = results.filter((r) => r.success).length;
            const failCount = results.length - successCount;

            await window.electronAPI.showMessageBox({
                type: 'info',
                title: 'Hoàn thành gửi mail',
                message: `Gửi mail xong!`,
                detail: `Thành công: ${successCount}\nThất bại: ${failCount}`,
                buttons: ['OK']
            });

            playBeep(1000, 60, 0.12);
        } catch (error) {
            await window.electronAPI.showErrorBox('Lỗi', 'Lỗi gửi mail: ' + error.message);
        } finally {
            setSendMailLoadingState(false);
        }
    };

    const setSendMailLoadingState = (isLoading) => {
        const sendBtn = document.getElementById('send-mail-btn');
        const sendIcon = sendBtn.querySelector('i');
        const sendText = sendBtn.querySelector('span') || sendBtn.lastChild;

        if (isLoading) {
            sendBtn.disabled = true;
            sendIcon.className = 'fa-solid fa-spinner animate-spin mr-2';
            if (sendText) sendText.textContent = 'Đang gửi...';
        } else {
            sendBtn.disabled = false;
            sendIcon.className = 'fa-solid fa-paper-plane mr-2';
            if (sendText) sendText.textContent = 'GỬI MAIL';
        }
    };

    waitForAPI();
});
