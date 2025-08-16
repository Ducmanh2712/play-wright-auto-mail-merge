(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, s) {
        const o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((n, a) => {
                o.sendMessage({ source: e, type: t, data: s }, (e) => {
                    o.lastError ? a(new Error(`Error sending message: ${o.lastError.message}`)) : n(e);
                });
            });
        } catch (e) {
            throw (console.error(`[messageHelpers] Error in sending message: ${e.message}`), e);
        }
    }
    const s = async (e, t) => {
        const s = 'undefined' != typeof browser ? browser.storage.local : chrome.storage.local,
            o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            const n = await s.get([e]);
            if (o.lastError) throw new Error(`Error retrieving ${e}: ${o.lastError.message}`);
            return null != n[e] ? n[e] : t;
        } catch (t) {
            throw (console.error(`[storageHelpers] Error retrieving ${e}:`, t), t);
        }
    };
    Promise.resolve();
    async function o(e) {
        return new Promise((t) => setTimeout(t, e));
    }
    function n(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'success',
            s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            o = document.getElementById('captcha-message');
        o || ((o = document.createElement('div')), (o.id = 'captcha-message'), (o.style.zIndex = '99999999'), (o.style.padding = '3px 3px'), (o.style.borderRadius = '3px'), (o.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)'), (o.style.fontSize = '10px'), (o.style.fontWeight = '600'), (o.style.fontFamily = 'Arial, sans-serif'), (o.style.textAlign = 'center'), (o.style.whiteSpace = 'nowrap'), (o.style.color = 'white'), (o.style.top = '5px'), s && s.parentElement ? ((o.style.position = 'absolute'), (o.style.left = '2px'), s.parentElement.appendChild(o)) : ((o.style.position = 'fixed'), (o.style.left = '10px'), document.body.appendChild(o)));
        const n = { success: 'linear-gradient(90deg, #6a11cb,rgb(191, 37, 252))', error: 'linear-gradient(90deg, #ff416c, #ff4b2b)', warning: 'linear-gradient(90deg, #ff9a44, #fc6076)', info: 'linear-gradient(90deg, #17a2b8, #138496)' };
        ((o.innerText = '[OMOcaptcha.com] ' + e), (o.style.background = n[t] || n.success), (o.style.display = 'block'));
    }
    async function a(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { timeout: 5e3, maxRetries: 3 };
        try {
            const { timeout: s, maxRetries: n } = t,
                a = { arkoselabs: 'image/jpeg' };
            function l(e) {
                for (const [t, s] of Object.entries(a)) if (e.includes(t)) return s;
                return 'image/png';
            }
            if (e instanceof HTMLCanvasElement || (e.tagName && 'CANVAS' === e.tagName.toUpperCase()))
                try {
                    if (0 === e.width || 0 === e.height) return (console.log('Canvas rỗng hoặc không có kích thước'), '');
                    const c = e.getBoundingClientRect(),
                        r = c.width,
                        i = c.height,
                        u = document.createElement('canvas');
                    ((u.width = r), (u.height = i));
                    u.getContext('2d').drawImage(e, 0, 0, r, i);
                    const g = 'image/png',
                        d = u.toDataURL(g).split(',')[1];
                    return d || (console.log('Không thể lấy base64 từ canvas'), '');
                } catch (h) {
                    return (console.log('Lỗi khi chụp màn hình canvas:', h), '');
                }
            if (e instanceof Element)
                try {
                    const f = e.src;
                    if (f && f.startsWith('data:image/')) {
                        const y = f.split(',')[1];
                        return y || (console.log('Base64 rỗng từ src của element'), '');
                    }
                    e = f || '';
                } catch (m) {
                    return (console.log('Lỗi khi xử lý element:', m), '');
                }
            if ('string' == typeof e && e.startsWith('blob:')) {
                console.log('Da vao blob');
                try {
                    return await new Promise((t) => {
                        const s = new Image();
                        s.setAttribute('crossOrigin', 'anonymous');
                        const o = setTimeout(() => {
                            t('');
                        }, 1e3);
                        ((s.onload = function () {
                            (console.log('Vao trong onload'), clearTimeout(o));
                            try {
                                const s = document.createElement('canvas');
                                ((s.width = this.naturalWidth), (s.height = this.naturalHeight));
                                s.getContext('2d').drawImage(this, 0, 0);
                                const o = l(e);
                                s.toBlob((e) => {
                                    if (!e) return void t('');
                                    const s = new FileReader();
                                    ((s.onloadend = () => {
                                        const e = s.result.split(',')[1];
                                        t(e);
                                    }),
                                        (s.onerror = () => t('')),
                                        s.readAsDataURL(e));
                                }, o);
                            } catch (e) {
                                (console.log('Lỗi khi xử lý blob URL:', e), t(''));
                            }
                        }),
                            (s.onerror = () => {
                                (clearTimeout(o), t(''));
                            }),
                            (s.src = e),
                            console.log('This is img:'),
                            console.log('img src:', s.src));
                    });
                } catch (p) {
                    return (console.log('Lỗi khi xử lý blob URL:', p), '');
                }
            }
            if ('string' == typeof e) {
                console.log('Vao den input string:');
                try {
                    for (let b = 0; b < n; b++)
                        try {
                            const w = new AbortController(),
                                k = setTimeout(() => w.abort(), s),
                                _ = await fetch(e, { signal: w.signal });
                            if ((clearTimeout(k), !_.ok)) throw new Error(`HTTP error ${_.status}`);
                            const E = await _.blob();
                            return await new Promise((e, t) => {
                                const s = new FileReader();
                                ((s.onloadend = () => e(s.result.split(',')[1])), (s.onerror = () => t(new Error('Failed to read blob as base64'))), s.readAsDataURL(E));
                            });
                        } catch (v) {
                            if (b === n - 1) return (console.log('Hết lượt thử fetch:', v), '');
                            await o(500);
                        }
                } catch (S) {
                    return (console.log('Lỗi khi fetch URL:', S), '');
                }
            }
            return (console.log('Đầu vào không được hỗ trợ:', e), '');
        } catch (x) {
            return (console.log('Lỗi chung trong fetchImageToBase64:', x), '');
        }
    }
    function l(e, t) {
        return new Promise((s) => {
            const o = Date.now(),
                n = setInterval(() => {
                    for (const t of e) {
                        if (document.querySelector(t)) return (clearInterval(n), void s(!0));
                    }
                    Date.now() - o >= t && (clearInterval(n), s(!1));
                }, 500);
        });
    }
    function c(e, t) {
        return new Promise((s) => {
            const o = document.querySelector(e);
            if (o) return s(o);
            const n = new MutationObserver((t, o) => {
                const n = document.querySelector(e);
                n && (o.disconnect(), s(n));
            });
            (n.observe(document.body, { childList: !0, subtree: !0 }),
                setTimeout(() => {
                    (n.disconnect(), s(null));
                }, t));
        });
    }
    async function r(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { timeout: 5e3, maxRetries: 3 };
        try {
            if (!(e && e instanceof HTMLElement)) return (console.warn('[utils] Invalid element for background image'), '');
            const s = getComputedStyle(e),
                o = s.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
            if (!o) return (console.warn('[utils] No background image found'), '');
            if (o.startsWith('blob:')) return await a(o, t);
            {
                const e = new URL(o, window.location.href).href;
                return await a(e, t);
            }
        } catch (e) {
            return (console.error('[utils] Error getting background image:', e), '');
        }
    }
    let i, u, g, d, h, f;
    async function y() {
        ((i = await s(e.POWER_ON.key, e.POWER_ON.defaultValue)), (u = await s(e.API_KEY.key, e.API_KEY.defaultValue)));
        const t = await s(e.GEETEST.key, e.GEETEST.defaultValue);
        ((g = t.delayClick), (d = t.delaySwipe), (h = t.loop), (f = t.isActive));
    }
    console.log('Run file Geetest:', window.location.href);
    let m = !1,
        p = '';
    async function b() {
        for (console.log('[Geetest] This is captchaGobang'); ; ) {
            await o(500);
            let e = null;
            for (let t = 0; t < 10 && ((e = document.querySelector('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_winlinze"]')), null == e); t++) await o(1e3);
            if (!e) return;
            n('Captcha Gobang', 'red', e);
            let t = '';
            for (let s = 0; s < 10; s++) {
                if (((t = await T(e)), t && p !== t)) {
                    p = t;
                    break;
                }
                await o(1e3);
            }
            if (!t) return;
            console.log('This is imgBase64>>>', t);
            const s = { type: 'GeetestGobangWebTask', imageBase64: t },
                a = await S(s);
            if (!a) {
                if ((n('No taskId', 'red', e), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            const l = await x(a, 30);
            if ((console.log('This is result>>>', l), !l)) {
                if ((n('No result from API', 'red', e), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            const c = document.querySelectorAll('.geetest_subitem .geetest_itemimg');
            if ((n('Solving...', 'red', e), await q(c, l.swap_positions), !h)) return;
            {
                const e = document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]');
                e && e.click();
            }
        }
    }
    async function w() {
        for (console.log('[Geetest] This is captchaKeoTha'); ; ) {
            await o(1500);
            let t = null;
            for (let e = 0; e < 10 && ((t = document.querySelector('[class*="geetest_captcha"] [class*="geetest_box"][style="display: block;"] [class*="geetest_slide"] [class*="geetest_window"]')), null == t); e++) await o(1e3);
            if ((console.log('This is image:', t), !t)) return;
            n('Captcha slide', 'red', t);
            let s = '';
            for (let e = 0; e < 10; e++) {
                if (((s = await I(t)), s && p !== s)) {
                    p = s;
                    break;
                }
                await o(1e3);
            }
            if (!s) return;
            console.log('This is imgBase64>>>', s);
            const a = { type: 'GeetestSliderWebTask', imageBase64: s },
                l = await S(a);
            if (!l) {
                if ((n('No taskId', 'red', t), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            const r = await x(l, 30);
            if ((console.log('Day la result>>>', r), !r)) {
                if ((n('No result from API', 'red', t), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            let i = parseInt(r.end.x, 10);
            var e = document.querySelector('[class*="geetest_box"][style="display: block;"] [class*="geetest_slide"] [class*="geetest_window"]>[class*="geetest_slice"]');
            if ((n('Captcha slide solving...', 'red', t), await v(e, i), h)) {
                if (await c('[class*="geetest_lock_success"]', 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function k() {
        for (console.log('[Geetest] This is captchaClick'); ; ) {
            await o(500);
            let e = null;
            for (let t = 0; t < 10 && ((e = document.querySelector('[class*="geetest_captcha"] [class*="geetest_box"][style="display: block;"] [class*="geetest_click"]>[class*="geetest_window"] [class*="geetest_bg"]')), null == e); t++) await o(1500);
            if ((console.log('This is image:', e), !e)) return;
            n('Captcha Click', 'red', e);
            let t = '';
            for (let s = 0; s < 10; s++) {
                if (((t = await r(e)), t && p !== t)) {
                    p = t;
                    break;
                }
                await o(1e3);
            }
            if (!t) return;
            console.log('This is image base64 captcha click:', t);
            const s = document.querySelectorAll("[class*='geetest_ques_tips geetest_ques_back'] img"),
                l = [];
            for (let e = 0; e < s.length; e++)
                try {
                    const t = await a(s[e]);
                    l.push(t);
                } catch (t) {
                    (console.error(`Lỗi khi xử lý icon ${e + 1}:`, t), l.push(null));
                }
            if (3 === l.length && l.every((e) => null !== e)) {
                console.log('Đủ 3 icon, gửi lên API...');
                const s = { type: 'GeetestIconWebTask', imageBase64: t, anchorImageBase64s: [l[0], l[1], l[2]] },
                    a = await S(s);
                if (!a) {
                    if ((n('No taskId', 'red', e), h)) {
                        document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                        continue;
                    }
                    return;
                }
                const c = await x(a, 30);
                if ((console.log('Day la result>>>', c), !c)) {
                    if ((n('No result from API', 'red', e), h)) {
                        document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                        continue;
                    }
                    return;
                }
                n('Clicking...', 'red', e);
                let r = parseInt(c.points[0].x, 10),
                    i = parseInt(c.points[0].y, 10),
                    u = parseInt(c.points[1].x, 10),
                    g = parseInt(c.points[1].y, 10),
                    d = parseInt(c.points[2].x, 10),
                    f = parseInt(c.points[2].y, 10);
                (C(e, r, i), await o(500), C(e, u, g), await o(500), C(e, d, f), await o(500), document.querySelector('[class*="geetest_click"] [class*="geetest_submit"]').click());
            } else console.warn('Không đủ 3 icon hợp lệ, bỏ qua việc gọi API.');
        }
    }
    async function _() {
        for (console.log('[Geetest] This is captchaIconCrush'); ; ) {
            await o(500);
            let e = null;
            for (let t = 0; t < 10 && ((e = document.querySelector('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_match"]')), null == e); t++) await o(1e3);
            if (!e) return;
            n('Captcha IconCrush', 'red', e);
            let t = '';
            for (let s = 0; s < 10; s++) {
                if (((t = await A(e)), t && p !== t)) {
                    p = t;
                    break;
                }
                await o(1e3);
            }
            if (!t) return;
            console.log('This is imgBase64>>>', t);
            const s = { type: 'GeetestIconCrushWebTask', imageBase64: t },
                a = await S(s);
            if (!a) {
                if ((n('No taskId', 'red', e), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            const l = await x(a, 30);
            if ((console.log('This is result>>>', l), !l)) {
                if ((n('No result from API', 'red', e), h)) {
                    document.querySelector('[class*="geetest_box"][style="display: block;"] button[class*="geetest_refresh"]').click();
                    continue;
                }
                return;
            }
            n('Solving...', 'red', e);
            const r = document.querySelectorAll('.geetest_backimg');
            if ((await P(r, l.swap_positions), h)) {
                if (await c('[class*="geetest_lock_success"]', 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    function E(e) {
        return !!document.querySelector(e);
    }
    async function v(e, t) {
        return new Promise((s) => {
            if (!e) return s();
            e.parentElement;
            const n = t,
                a = new DataTransfer(),
                l = d;
            function c(t) {
                let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                (e.dispatchEvent(new MouseEvent(t, { bubbles: !0, cancelable: !0, ...s })), e.dispatchEvent(new PointerEvent(t, { bubbles: !0, cancelable: !0, ...s, pointerType: 'mouse', isPrimary: !0 })));
            }
            (async () => {
                (c('mouseenter'), c('mouseover'), await o(l), c('pointerdown', { clientX: 0, clientY: 0 }), c('mousedown', { clientX: 0, clientY: 0 }), e.dispatchEvent(new DragEvent('dragstart', { bubbles: !0, cancelable: !0, dataTransfer: a })));
                let r = 0,
                    i = 0;
                for (; r + 10 < t; ) {
                    const e = r / t;
                    let s;
                    ((s = e < 0.3 ? 2 * Math.random() + 1 : e < 0.7 ? 6 * Math.random() + 2 : 2 * Math.random() + 0.5), (r += s), (i += 8 * (Math.random() - 0.5)));
                    const a = Math.min(r, n),
                        u = i;
                    (c('mousemove', { clientX: a, clientY: u }), c('pointermove', { clientX: a, clientY: u }), await o(l));
                }
                r = t;
                const u = i;
                (c('mousemove', { clientX: r, clientY: u }), c('pointermove', { clientX: r, clientY: u }), await o(l), c('pointerup', { clientX: r, clientY: u }), c('mouseup', { clientX: r, clientY: u }), e.dispatchEvent(new DragEvent('dragend', { bubbles: !0, cancelable: !0, dataTransfer: a })), console.log('Vị trí backend >>>', t), console.log(`Vị trí cuối cùng của element: x = ${r}, y = ${u}`), s());
            })();
        });
    }
    async function S(e) {
        const s = JSON.stringify({ clientKey: u, task: e });
        try {
            const e = await t('GEETEST', 'createTask', s);
            return e || (console.error('[geetest] No taskId returned from createTask'), '');
        } catch (e) {
            return (console.error('[geetest] Failed to create task:', e), '');
        }
    }
    async function x(e, s) {
        const o = JSON.stringify({ clientKey: u, taskId: e });
        try {
            const e = await t('GEETEST', 'getTaskResult', { data: o, timeWait: s });
            return e ? ('fail' === e.status ? (console.error('[geetest] API error:', e), null) : e.solution ? e.solution : (console.error('[geetest] Invalid API response: missing solution'), null)) : (console.error('[geetest] No result returned from getTaskResult'), null);
        } catch (e) {
            return (console.error('[geetest] Failed to get task result:', e), null);
        }
    }
    async function I(e) {
        return new Promise(async (t, s) => {
            try {
                if (!(e instanceof HTMLElement)) return t('');
                const o = e.getBoundingClientRect(),
                    n = Math.round(o.width),
                    a = Math.round(o.height);
                if (n <= 0 || a <= 0) return t('');
                const l = document.createElement('canvas');
                ((l.width = n), (l.height = a));
                const c = l.getContext('2d'),
                    r = (e) =>
                        new Promise((t, s) => {
                            const o = new Image();
                            ((o.crossOrigin = 'anonymous'), (o.onload = () => t(o)), (o.onerror = () => s(new Error('Không tải được ảnh: ' + e))), (o.src = e));
                        }),
                    i = e.querySelector('.geetest_bg') || e.querySelector('[class*="geetest_bg"]');
                if (!i) return s(new Error('Không tìm thấy geetest_bg'));
                const u = getComputedStyle(i),
                    g = u.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
                if (!g) return s(new Error('Không tìm được ảnh nền'));
                const d = await r(g);
                c.drawImage(d, 0, 0, n, a);
                const h = e.querySelector('.geetest_slice') || e.querySelector('[class*="geetest_slice"]'),
                    f = h?.querySelector('.geetest_slice_bg') || h?.querySelector('[class*="geetest_slice_bg"]');
                if (h && f) {
                    const t = getComputedStyle(f),
                        s = t.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
                    if (s) {
                        const t = h.getBoundingClientRect(),
                            o = e.getBoundingClientRect(),
                            n = Math.round(t.left - o.left),
                            a = Math.round(t.top - o.top),
                            l = Math.round(t.width),
                            i = Math.round(t.height);
                        if (l > 0 && i > 0) {
                            const e = await r(s);
                            c.drawImage(e, n, a, l, i);
                        }
                    }
                }
                t(l.toDataURL('image/png').split(',')[1]);
            } catch (e) {
                (console.error('[captcha] Lỗi khi render Geetest:', e), s(e));
            }
        });
    }
    async function T(e) {
        if (!e) return void console.error('Không tìm thấy board!');
        const t = getComputedStyle(e).backgroundColor || '#dce3ed',
            s = e.querySelectorAll('.geetest_item'),
            o = s.length,
            n = s[0]?.querySelectorAll('.geetest_itemimg').length || 0;
        if (0 === o || 0 === n) return void console.error('Không tìm thấy lưới!');
        const a = s[0].querySelector('.geetest_itemimg').getBoundingClientRect(),
            l = a.width,
            c = a.height,
            r = document.createElement('canvas');
        ((r.width = l * n), (r.height = c * o));
        const i = r.getContext('2d');
        ((i.fillStyle = t), i.fillRect(0, 0, r.width, r.height));
        const u = [];
        async function g(e) {
            return new Promise((t, s) => {
                const o = new Image();
                ((o.crossOrigin = 'Anonymous'), (o.onload = () => t(o)), (o.onerror = s), (o.src = e));
            });
        }
        s.forEach((e, t) => {
            e.querySelectorAll('.geetest_itemimg').forEach((e, s) => {
                const o = getComputedStyle(e).backgroundImage.match(/url\("(.+)"\)/);
                if (o) {
                    const e = o[1];
                    u.push({ type: 'image', imgUrl: e, row: t, col: s });
                } else u.push({ type: 'empty', row: t, col: s });
            });
        });
        for (const e of u) {
            const t = e.col * l,
                s = e.row * c,
                o = 0.8,
                n = l * o,
                a = c * o,
                r = t + (l - n) / 2,
                u = s + (c - a) / 2;
            if ('image' === e.type)
                try {
                    const t = await g(e.imgUrl);
                    i.drawImage(t, r, u, n, a);
                } catch (t) {
                    console.error('Lỗi tải ảnh:', e.imgUrl, t);
                }
            else ((i.fillStyle = 'rgba(200, 210, 220, 1)'), i.beginPath(), i.arc(t + l / 2, s + c / 2, Math.min(l, c) * o * 0.5, 0, 2 * Math.PI), i.fill());
        }
        return r.toDataURL('image/png').split(',')[1];
    }
    function C(e, t, s) {
        var o = e.getBoundingClientRect(),
            n = o.left + t,
            a = o.top + s,
            l = new MouseEvent('click', { bubbles: !0, clientX: n, clientY: a });
        e.dispatchEvent(l);
    }
    async function A(e) {
        if (!e) return void console.error('Không tìm thấy board!');
        const t = getComputedStyle(e).backgroundColor || '#ffffff',
            s = Array.from(e.querySelectorAll('[class*="geetest_img"]'));
        if (9 !== s.length) return void console.error('Không đủ 9 hình!');
        const o = [];
        for (let e = 0; e < 3; e++) for (let t = 0; t < 3; t++) o.push(s[3 * t + e]);
        const n = document.createElement('canvas');
        ((n.width = 200), (n.height = 200));
        const a = n.getContext('2d');
        ((a.fillStyle = t), a.fillRect(0, 0, n.width, n.height));
        const l = 200 / 3,
            c = 0.9 * l,
            r = 3.333333333333332;
        async function i(e) {
            return new Promise((t, s) => {
                const o = new Image();
                ((o.crossOrigin = 'Anonymous'), (o.onload = () => t(o)), (o.onerror = s), (o.src = e));
            });
        }
        for (let e = 0; e < 9; e++) {
            const t = Math.floor(e / 3),
                s = e % 3,
                n = getComputedStyle(o[e]).backgroundImage.match(/url\("(.+)"\)/);
            if (!n) continue;
            const u = n[1];
            try {
                const e = await i(u),
                    o = s * l,
                    n = t * l;
                a.drawImage(e, o + r, n + r, c, c);
            } catch (e) {
                console.error('Lỗi tải ảnh:', u, e);
            }
        }
        return n.toDataURL('image/png').split(',')[1];
    }
    async function q(e, t) {
        for (const s of t) {
            const t = s - 1;
            e[t] && (e[t].click(), console.log('Da click'), await o(500));
        }
    }
    async function P(e, t) {
        for (const s of t) {
            const t = s - 1,
                n = 3 * (t % 3) + Math.floor(t / 3),
                a = e[n];
            a ? (a.click(), console.log('[Geetest] Clicked at', n), await o(500)) : console.warn('[Geetest] Không tìm thấy element tại', n);
        }
    }
    (async () => {
        await y();
        new MutationObserver(async (e, t) => {
            await (async function (e) {
                if ((await y(), i && f && u && 'YOUR_CLIEN_KEY' !== u)) {
                    console.log('[geetest] handleElementMutation');
                    for (const t of e)
                        if ('childList' === t.type) {
                            if (!document.querySelector('[class*="geetest_captcha"] [class*="geetest_container"]') || m) continue;
                            if (!u) return;
                            m = !0;
                            try {
                                if ((await o(1500), !(await l(['[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_slide"]', '[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_winlinze"]', '[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_click"]', '[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_match"]'], 1e4)))) return;
                                console.log('Tìm thấy elementExists');
                                for (let e = 0; e < 20; e++) {
                                    if (E('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_winlinze"]')) {
                                        await b();
                                        break;
                                    }
                                    if (E('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_slide"]')) {
                                        await w();
                                        break;
                                    }
                                    if (E('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_click"]')) {
                                        await k();
                                        break;
                                    }
                                    if (E('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"] [class*="geetest_match"]')) {
                                        await _();
                                        break;
                                    }
                                    await o(1e3);
                                }
                            } finally {
                                m = !1;
                            }
                        }
                }
            })(e);
        }).observe(document.body, { childList: !0, subtree: !0 });
        for (let e = 0; e < 20; e++) {
            const e = document.querySelector('[class*="geetest_captcha"] [class*="geetest_btn_click"]');
            if (document.querySelector('[class*="geetest_box"][style="display: block;"] [class*="geetest_container"]')) {
                console.log('Captcha đã xuất hiện, thoát vòng lặp');
                break;
            }
            (e && !m && (console.log('This is click'), e.click()), await o(1500));
        }
    })();
})();
