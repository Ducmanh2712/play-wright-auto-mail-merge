document.addEventListener('DOMContentLoaded', () => {
    const waitForAPI = () => {
        if (window.electronAPI) {
            initWindowControl();
            initSheetsHistory();
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

    const initSheetsHistory = () => {
        const cancelBtn = document.getElementById('cancel-btn');
        const refreshBtn = document.getElementById('refresh-btn');
        const clearHistoryBtn = document.getElementById('clear-history-btn');

        cancelBtn.addEventListener('click', () => {
            try {
                playBeep(800, 50, 0.1);
                window.electronAPI.close();
            } catch {
                //
            }
        });

        refreshBtn.addEventListener('click', async () => {
            try {
                playBeep(700, 30, 0.08);
                setRefreshLoadingState(true);
                loadSheetsHistory();
                setRefreshLoadingState(false);
            } catch {
                setRefreshLoadingState(false);
            }
        });

        clearHistoryBtn.addEventListener('click', async () => {
            try {
                playBeep(800, 50, 0.1);
                await window.electronAPI
                    .showMessageBox({
                        type: 'warning',
                        title: 'Xác nhận',
                        message: 'Xóa lịch sử?',
                        detail: 'Bạn có chắc muốn xóa toàn bộ lịch sử tạo sheet?',
                        buttons: ['Hủy', 'Xóa']
                    })
                    .then((result) => {
                        if (result.response === 1) {
                            localStorage.removeItem('sheets_history');
                            loadSheetsHistory();
                            playBeep(1000, 60, 0.12);
                        }
                    });
            } catch {
                //
            }
        });

        loadSheetsHistory();
    };

    const loadSheetsHistory = () => {
        const historyContent = document.getElementById('history-content');
        const historyData = localStorage.getItem('sheets_history');

        if (!historyData) {
            historyContent.innerHTML = /*HTML*/ `
                <div class="flex flex-col items-center justify-center h-full text-gray-500">
                    <i class="fa-solid fa-inbox text-6xl mb-4"></i>
                    <p class="text-lg">Chưa có lịch sử tạo sheet</p>
                    <p class="text-sm">Tạo sheet đầu tiên để xem ở đây</p>
                </div>
            `;
            return;
        }

        try {
            const data = JSON.parse(historyData);
            const timestamp = new Date(data.timestamp);
            const formattedDate = timestamp.toLocaleString('vi-VN');

            let html = /*HTML*/ `
                <div class="space-y-4">
                    <div class="p-4 bg-green-500/10 border border-green-500/30 rounded-none">
                        <div class="text-sm text-green-300 space-y-2">
                            <div><strong>Thời gian:</strong> ${formattedDate}</div>
                            <div><strong>Tổng dòng:</strong> ${data.totalRows}</div>
                            <div><strong>Số sheet:</strong> ${data.sheets.length}</div>
                        </div>
                    </div>
            `;

            data.sheets.forEach((sheet, index) => {
                html += /*HTML*/ `
                    <div class="p-4 bg-black/50 border border-green-500/30 rounded-none">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-green-400 font-medium">
                                <i class="fa-solid fa-table mr-2"></i>Batch ${sheet.batch}
                            </h3>
                            <span class="text-sm text-gray-400">${sheet.rows} dòng</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="text" value="${sheet.url}" readonly class="flex-1 p-2 bg-black/50 border border-green-500/30 rounded-none text-green-300 font-mono text-sm" />
                            <button onclick="openInBrowser('${sheet.url}')" class="px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-none text-green-400 hover:bg-green-500/30 hover:border-green-400 transition-all duration-300">
                                <i class="fa-solid fa-external-link-alt"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            historyContent.innerHTML = html;
        } catch (error) {
            historyContent.innerHTML = /*HTML*/ `
                <div class="flex flex-col items-center justify-center h-full text-red-500">
                    <i class="fa-solid fa-exclamation-triangle text-6xl mb-4"></i>
                    <p class="text-lg">Lỗi đọc lịch sử</p>
                    <p class="text-sm">${error.message}</p>
                </div>
            `;
        }
    };

    const setRefreshLoadingState = (isLoading) => {
        const refreshBtn = document.getElementById('refresh-btn');
        const refreshIcon = document.getElementById('refresh-icon');
        const refreshText = document.getElementById('refresh-text');

        if (isLoading) {
            refreshBtn.disabled = true;
            refreshIcon.className = 'fa-solid fa-spinner animate-spin mr-2';
            refreshText.textContent = 'Đang tải...';
        } else {
            refreshBtn.disabled = false;
            refreshIcon.className = 'fa-solid fa-rotate mr-2';
            refreshText.textContent = 'Làm mới';
        }
    };

    window.openInBrowser = (url) => {
        try {
            window.electronAPI.openExternal(url);
            playBeep(700, 30, 0.08);
        } catch {
            window.open(url, '_blank');
        }
    };

    waitForAPI();
});
