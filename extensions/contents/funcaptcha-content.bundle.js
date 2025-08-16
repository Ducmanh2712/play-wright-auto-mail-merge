(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, o) {
        const n = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((r, a) => {
                n.sendMessage({ source: e, type: t, data: o }, (e) => {
                    n.lastError ? a(new Error(`Error sending message: ${n.lastError.message}`)) : r(e);
                });
            });
        } catch (e) {
            throw (console.error(`[messageHelpers] Error in sending message: ${e.message}`), e);
        }
    }
    const o = async (e, t) => {
        const o = 'undefined' != typeof browser ? browser.storage.local : chrome.storage.local,
            n = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            const r = await o.get([e]);
            if (n.lastError) throw new Error(`Error retrieving ${e}: ${n.lastError.message}`);
            return null != r[e] ? r[e] : t;
        } catch (t) {
            throw (console.error(`[storageHelpers] Error retrieving ${e}:`, t), t);
        }
    };
    Promise.resolve();
    async function n(e) {
        return new Promise((t) => setTimeout(t, e));
    }
    function r(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'success',
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            n = document.getElementById('captcha-message');
        n || ((n = document.createElement('div')), (n.id = 'captcha-message'), (n.style.zIndex = '99999999'), (n.style.padding = '3px 3px'), (n.style.borderRadius = '3px'), (n.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)'), (n.style.fontSize = '10px'), (n.style.fontWeight = '600'), (n.style.fontFamily = 'Arial, sans-serif'), (n.style.textAlign = 'center'), (n.style.whiteSpace = 'nowrap'), (n.style.color = 'white'), (n.style.top = '5px'), o && o.parentElement ? ((n.style.position = 'absolute'), (n.style.left = '2px'), o.parentElement.appendChild(n)) : ((n.style.position = 'fixed'), (n.style.left = '10px'), document.body.appendChild(n)));
        const r = { success: 'linear-gradient(90deg, #6a11cb,rgb(191, 37, 252))', error: 'linear-gradient(90deg, #ff416c, #ff4b2b)', warning: 'linear-gradient(90deg, #ff9a44, #fc6076)', info: 'linear-gradient(90deg, #17a2b8, #138496)' };
        ((n.innerText = '[OMOcaptcha.com] ' + e), (n.style.background = r[t] || r.success), (n.style.display = 'block'));
    }
    async function a(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { timeout: 5e3, maxRetries: 3 };
        try {
            const { timeout: o, maxRetries: r } = t,
                a = { arkoselabs: 'image/jpeg' };
            function c(e) {
                for (const [t, o] of Object.entries(a)) if (e.includes(t)) return o;
                return 'image/png';
            }
            if (e instanceof HTMLCanvasElement || (e.tagName && 'CANVAS' === e.tagName.toUpperCase()))
                try {
                    if (0 === e.width || 0 === e.height) return (console.log('Canvas rỗng hoặc không có kích thước'), '');
                    const i = e.getBoundingClientRect(),
                        s = i.width,
                        l = i.height,
                        u = document.createElement('canvas');
                    ((u.width = s), (u.height = l));
                    u.getContext('2d').drawImage(e, 0, 0, s, l);
                    const d = 'image/png',
                        h = u.toDataURL(d).split(',')[1];
                    return h || (console.log('Không thể lấy base64 từ canvas'), '');
                } catch (g) {
                    return (console.log('Lỗi khi chụp màn hình canvas:', g), '');
                }
            if (e instanceof Element)
                try {
                    const f = e.src;
                    if (f && f.startsWith('data:image/')) {
                        const m = f.split(',')[1];
                        return m || (console.log('Base64 rỗng từ src của element'), '');
                    }
                    e = f || '';
                } catch (p) {
                    return (console.log('Lỗi khi xử lý element:', p), '');
                }
            if ('string' == typeof e && e.startsWith('blob:')) {
                console.log('Da vao blob');
                try {
                    return await new Promise((t) => {
                        const o = new Image();
                        o.setAttribute('crossOrigin', 'anonymous');
                        const n = setTimeout(() => {
                            t('');
                        }, 1e3);
                        ((o.onload = function () {
                            (console.log('Vao trong onload'), clearTimeout(n));
                            try {
                                const o = document.createElement('canvas');
                                ((o.width = this.naturalWidth), (o.height = this.naturalHeight));
                                o.getContext('2d').drawImage(this, 0, 0);
                                const n = c(e);
                                o.toBlob((e) => {
                                    if (!e) return void t('');
                                    const o = new FileReader();
                                    ((o.onloadend = () => {
                                        const e = o.result.split(',')[1];
                                        t(e);
                                    }),
                                        (o.onerror = () => t('')),
                                        o.readAsDataURL(e));
                                }, n);
                            } catch (e) {
                                (console.log('Lỗi khi xử lý blob URL:', e), t(''));
                            }
                        }),
                            (o.onerror = () => {
                                (clearTimeout(n), t(''));
                            }),
                            (o.src = e),
                            console.log('This is img:'),
                            console.log('img src:', o.src));
                    });
                } catch (b) {
                    return (console.log('Lỗi khi xử lý blob URL:', b), '');
                }
            }
            if ('string' == typeof e) {
                console.log('Vao den input string:');
                try {
                    for (let y = 0; y < r; y++)
                        try {
                            const v = new AbortController(),
                                w = setTimeout(() => v.abort(), o),
                                k = await fetch(e, { signal: v.signal });
                            if ((clearTimeout(w), !k.ok)) throw new Error(`HTTP error ${k.status}`);
                            const E = await k.blob();
                            return await new Promise((e, t) => {
                                const o = new FileReader();
                                ((o.onloadend = () => e(o.result.split(',')[1])), (o.onerror = () => t(new Error('Failed to read blob as base64'))), o.readAsDataURL(E));
                            });
                        } catch (x) {
                            if (y === r - 1) return (console.log('Hết lượt thử fetch:', x), '');
                            await n(500);
                        }
                } catch (C) {
                    return (console.log('Lỗi khi fetch URL:', C), '');
                }
            }
            return (console.log('Đầu vào không được hỗ trợ:', e), '');
        } catch (A) {
            return (console.log('Lỗi chung trong fetchImageToBase64:', A), '');
        }
    }
    let c, i, s, l, u, d;
    async function h() {
        ((c = await o(e.POWER_ON.key, e.POWER_ON.defaultValue)), (i = await o(e.API_KEY.key, e.API_KEY.defaultValue)));
        const t = await o(e.FUNCAPTCHA.key, e.FUNCAPTCHA.defaultValue);
        ((s = t.delayClick), (l = t.loop), (u = t.isActive), (d = t.maxImageCaptcha));
    }
    let g = !1,
        f = [];
    console.log('This is Funcaptcha');
    async function m() {
        (console.log('Đã vào captchaClickImage1'), r('captchaClickImage1', 'green'));
        let e = x('.challenge-instructions-container');
        if (!e) return;
        ((e = e.trim()), s < 1e3 && (s = 1e3));
        let t = '';
        for (let o = 0; o < 500; o++) {
            if (o > 0) {
                if ((await n(s), k(['div[class*="tile-game-fail box screen"]', 'div[class*="match-game-fail box screen"]']))) return (l && (r('Restart button...', 'red'), document.querySelector('[class*="restart-button"]').click()), r('Failed to solve captcha', 'red'), void console.log('Giải captcha thất bại'));
                if (k(['div[class*="error box screen"]'])) return (l && document.querySelector('div[class*="error box screen"] button').click(), r('Failed to solve captcha', 'red'), void console.log('Giải captcha thất bại'));
                if (k(['div[class*="victory box screen"]'])) return (console.log('Giải captcha thành công'), void r('Successfully solved captcha', 'green'));
            }
            const c = await y(t);
            if (!c) continue;
            t = c;
            const i = await a(t);
            if (!i) return (console.error('Failed to fetch image base64 for URL:', t), r('Failed to fetch image base64 for URL', 'red'), void (l && document.querySelector('[class*="restart-button"]').click()));
            const u = await v(i, e, 30);
            if (null === u) return void (l && (r('Restart button...', 'red'), document.querySelector('[class*="restart-button"]').click()));
            if ('Server 500' === u.result) {
                t = '';
                continue;
            }
            const d = u.result.index;
            document.querySelector('button[aria-label*="Image ' + d + '"]').click();
        }
    }
    async function p() {
        (console.log('Đã vào captchaClickImage2'), r('captchaClickImage2', 'green'));
        let e = x('#game_children_text');
        if (e) {
            ((e = e.trim()), e.endsWith('.') && (e = e.slice(0, -1)), s < 1e3 && (s = 1e3));
            for (let t = 0; t < 500; t++) {
                if (t > 0) {
                    await n(s);
                    const e = await w(['div[class*="error box screen"] button', '#wrong_children_button'], 1);
                    if (e) return (l && e.click(), console.log('Giải captcha thất bại'), void r('Failed to solve captcha', 'red'));
                    if (E('[id="victoryScreen"]')) return (console.log('Giải captcha thành công'), void r('Successfully solved captcha', 'green'));
                }
                const o = document.querySelector('#game_challengeItem_image');
                if (!o) continue;
                const c = await a(o, { timeout: 5e3, maxRetries: 3 });
                if (!c) return (r('No imageBase64', 'green'), void (l && document.querySelector('a[aria-label="Start over with a different challenge" i]').click()));
                const i = await v(c, e, 20);
                if (null === i) return void (l && document.querySelector('a[aria-label="Start over with a different challenge" i]').click());
                if ('Server 500' === i.result) continue;
                const u = i.result.index;
                (await w(['[aria-label*="Image ' + u + '" i]'], 1e3)) && document.querySelector('[aria-label*="Image ' + u + '" i]').click();
            }
        }
    }
    async function b() {
        (console.log('Da vao captchaClickButton'), r('captchaClickButton', 'green'), console.log('Gia tri MAX_IMAGE_CAPTCHA', d));
        let e = x('.match-game .text');
        if (!e) return;
        console.log('Text captcha tren', e);
        const t = e.match(/\(.*\b(\d+)\)$/);
        if (t) {
            const e = parseInt(t[1], 10);
            if ((console.log('So lon nhat trong dau ngoac:', e), e > d)) return void r(`Image > ${d}, stop function`, 'red');
        }
        ((e = e.split('(')[0].trim()), console.log('Text captcha giua', e), e.endsWith('.') && (e = e.slice(0, -1)), console.log('Text captcha cuoi cung', e));
        let o = '';
        for (let t = 0; t < 500; t++) {
            if (t > 0) {
                if ((await n(s), k(['div[class*="tile-game-fail box screen"]', 'div[class*="match-game-fail box screen"]']))) return (l && (r('Restart captcha', 'red'), document.querySelector('[class*="restart-button"]').click()), console.log('Giải captcha thất bại'), await S(!1), void r('Failed to solve captcha', 'red'));
                if (k(['div[class*="error box screen"]'])) return (l && document.querySelector('div[class*="error box screen"] button').click(), console.log('Giải captcha thất bại'), await S(!1), void r('Failed to solve captcha', 'red'));
                if (k(['div[class*="victory box screen"]'])) return void r('Successfully solved captcha', 'green');
            }
            const c = await y(o);
            if (!c) continue;
            o = c;
            const i = await a(o);
            if (!i) return (r('No imageBase64', 'red'), console.error('Failed to fetch image base64 for URL:', o), void (l && document.querySelector('[class*="restart-button"]').click()));
            const u = await v(i, e, 30);
            if (null === u) return (r('No taskResult', 'red'), void (l && document.querySelector('[class*="restart-button"]').click()));
            if ('Server 500' === u.result) {
                o = '';
                continue;
            }
            let d = parseInt(u.result.index, 10);
            if (((d -= 1), d > 30)) return (l && document.querySelector('[class*="restart-button"]').click(), console.log('Giải captcha thất bại'), void r('Failed to solve captcha', 'red'));
            r('Solving...', 'red');
            for (let e = 0; e < d; e++) (e > 0 && (await n(s)), A(document.querySelector('.right-arrow')));
            C(document.querySelector('div[class*="match-game box screen"] button'));
        }
    }
    async function y(e) {
        const t = document.querySelector('body').innerHTML.match(/blob:https:\/\/(.*?)arkoselabs(.*?)\.com\/[a-zA-Z0-9-]+/);
        return t ? (e === t[0] ? (await n(500), null) : t[0]) : (await n(500), null);
    }
    async function v(e, o, n) {
        r('Creating task...', 'green');
        const a = await (async function (e, o) {
            const n = JSON.stringify({ clientKey: i, task: { type: 'FuncaptchaImageTask', imageBase64: e, other: o } });
            try {
                const e = await t('FUNCAPTCHA', 'createTask', n);
                return e || (console.error('[funcaptcha] No taskId returned from createTask'), r('No taskId returned from createTask', 'red'), '');
            } catch (e) {
                return (console.error('[funcaptcha] Failed to create task:', e), '');
            }
        })(e, o);
        if (!a) return (r('No taskId', 'red'), console.warn('[funcaptcha] Failed to create task'), null);
        f.push(a);
        const c = await (async function (e, o) {
            const n = JSON.stringify({ clientKey: i, taskId: e });
            try {
                const e = await t('FUNCAPTCHA', 'getTaskResult', { data: n, timeWait: o });
                return e ? ('fail' === e.status ? (console.error('[funcaptcha] API error:', e), r(`API error: ${e}`, 'red'), null) : e.solution ? e.solution : e.index ? e : (console.error('[funcaptcha] Invalid API response: missing result or index'), r('Invalid API response: missing result or index', 'red'), null)) : (console.error('[funcaptcha] No result returned from getTaskResult'), r('No result returned from getTaskResult', 'red'), null);
            } catch (e) {
                return (console.error('[funcaptcha] Failed to get task result:', e), r(`Failed to get task result: ${e}`, 'red'), null);
            }
        })(a, n);
        return { result: c, taskId: a };
    }
    async function w(e, t) {
        const o = Math.ceil(t / 1e3);
        for (let t = 0; t < o; t++) {
            await new Promise((e) => setTimeout(e, 1e3));
            for (const t of e) {
                const e = document.querySelector(t);
                if (e) return e;
            }
        }
        return null;
    }
    function k(e) {
        for (const t of e) {
            const e = document.querySelector(t);
            if (e) return e;
        }
        return null;
    }
    function E(e) {
        return !!document.querySelector(e);
    }
    function x(e) {
        const t = document.querySelector(e);
        return t ? t.textContent.trim() : null;
    }
    function C(e) {
        if (!e) return void console.error('Element không hợp lệ.');
        if (
            (console.log('Vao ham simulateHumanMouseMovement'),
            !(function (e) {
                const t = e.getBoundingClientRect();
                return t.width > 0 && t.height > 0 && t.bottom >= 0 && t.right >= 0 && t.top <= (window.innerHeight || document.documentElement.clientHeight) && t.left <= (window.innerWidth || document.documentElement.clientWidth);
            })(e))
        )
            return void console.error('Element không hiển thị hoặc không có kích thước hợp lệ.');
        console.log('Da qua isElementVisible');
        let t = !1;
        function o() {
            t = !0;
        }
        e.addEventListener('click', o);
        const n = e.getBoundingClientRect(),
            r = n.left + n.width / 2,
            a = n.top + n.height / 2,
            c = (Math.random() * window.innerWidth) / 2,
            i = (Math.random() * window.innerHeight) / 2,
            s = Math.floor(20 * Math.random()) + 10;
        function l() {
            (e.removeEventListener('click', o), t || (e.click(), console.log('Đã phải click trực tiếp!')));
        }
        !(function t(o) {
            if (o >= s) {
                const t = new MouseEvent('mouseup', { bubbles: !0, clientX: r, clientY: a });
                e.dispatchEvent(t);
                const o = new MouseEvent('click', { bubbles: !0, clientX: r, clientY: a });
                return (e.dispatchEvent(o), console.log('Da qua MouseEvent click>>>'), void setTimeout(l, 60));
            }
            const n = ((u = o / s), 1 - Math.pow(1 - u, 3));
            var u;
            const d = c + (r - c) * n,
                h = i + (a - i) * n,
                g = 5 * (Math.random() - 0.5),
                f = 5 * (Math.random() - 0.5),
                m = new MouseEvent('mousemove', { bubbles: !0, clientX: d + g, clientY: h + f });
            if ((document.dispatchEvent(m), 0 === o)) {
                const t = new MouseEvent('mouseover', { bubbles: !0, clientX: d + g, clientY: h + f });
                e.dispatchEvent(t);
            }
            if (o === s - 1) {
                const t = new MouseEvent('mousedown', { bubbles: !0, clientX: r, clientY: a });
                e.dispatchEvent(t);
            }
            const p = 30 * Math.random() + 20;
            setTimeout(() => t(o + 1), p);
        })(0);
    }
    function A(e) {
        const t = new MouseEvent('click', { bubbles: !0, clientX: e.getBoundingClientRect().left + e.offsetWidth / 2, clientY: e.getBoundingClientRect().top + e.offsetHeight / 2, button: 0 });
        e.dispatchEvent(t);
    }
    async function S() {
        let e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if ((console.log('Đang check resolvedTaskIds', f), 0 === f.length)) return;
        const o = { taskIds: f, result: e };
        try {
            await t('FUNCAPTCHA', 'reportTask', o);
        } catch (e) {
            console.error('Failed to send report:', e);
        } finally {
            f = [];
        }
    }
    (new (class {
        constructor(e, t) {
            ((this.selectors = e), (this.callback = t), (this.processedNodes = new Set()), (this.observer = new MutationObserver(this.handleMutation.bind(this))), this.startObserving());
        }
        startObserving() {
            this.observer.observe(document.body, { childList: !0, subtree: !0 });
        }
        stopObserving() {
            this.observer.disconnect();
        }
        async handleMutation(e) {
            if (c && u)
                for (const t of e) {
                    const e = Array.from(t.addedNodes);
                    for (const t of e)
                        if (t.nodeType === Node.ELEMENT_NODE)
                            for (const e of this.selectors)
                                if (t.matches(e) && !this.processedNodes.has(t)) (this.processedNodes.add(t), await this.callback(e, [t]));
                                else {
                                    const o = Array.from(t.querySelectorAll(e));
                                    for (const t of o) this.processedNodes.has(t) || (this.processedNodes.add(t), await this.callback(e, o));
                                }
                }
        }
    })(['button[aria-describedby="descriptionVerify"]', 'p[aria-label*="Working, please wait" i]', 'button[data-theme="home.verifyButton"]', '.error .button', '#wrongTimeout_children_button', 'button[id="home_children_button"]'], async (e, t) => {
        if ((await h(), !g && c && u && i && 'YOUR_CLIEN_KEY' !== i)) {
            console.log('Vào đến DOMObserver');
            try {
                ((g = !0), await n(1e3));
                const e = await w(['div[class*="error box screen"] button', '#wrong_children_button'], 1e3);
                if (e) return (l && e.click(), void console.log('Giải captcha thất bại'));
                for (let e = 0; e < 10; e++) {
                    const e = await w(['button[data-theme="home.verifyButton"]', 'button[id="home_children_button"]', 'button[aria-describedby="descriptionVerify"]'], 1e3);
                    if ((e ? (console.log('[funcaptcha] Click verifyButton'), e.click(), (f = [])) : console.log('[funcaptcha] không tìm thấy verifyButton'), E('.challenge-instructions-container'))) await m();
                    else if (E('.match-game .text')) await b();
                    else {
                        if (!E('#game_children_text')) {
                            console.log('[funcaptcha] Không tìm thấy captcha');
                            continue;
                        }
                        await p();
                    }
                    console.log('[funcaptcha] chay xong findElement');
                    break;
                }
            } catch (e) {
                console.error('Đã bị lỗi', e);
            } finally {
                g = !1;
            }
        }
    }),
        (async () => {
            await h();
        })());
})();
