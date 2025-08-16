(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, a) {
        const o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((n, c) => {
                o.sendMessage({ source: e, type: t, data: a }, (e) => {
                    o.lastError ? c(new Error(`Error sending message: ${o.lastError.message}`)) : n(e);
                });
            });
        } catch (e) {
            throw (console.error(`[messageHelpers] Error in sending message: ${e.message}`), e);
        }
    }
    const a = async (e, t) => {
        const a = 'undefined' != typeof browser ? browser.storage.local : chrome.storage.local,
            o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            const n = await a.get([e]);
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
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            o = document.getElementById('captcha-message');
        o || ((o = document.createElement('div')), (o.id = 'captcha-message'), (o.style.zIndex = '99999999'), (o.style.padding = '3px 3px'), (o.style.borderRadius = '3px'), (o.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)'), (o.style.fontSize = '10px'), (o.style.fontWeight = '600'), (o.style.fontFamily = 'Arial, sans-serif'), (o.style.textAlign = 'center'), (o.style.whiteSpace = 'nowrap'), (o.style.color = 'white'), (o.style.top = '5px'), a && a.parentElement ? ((o.style.position = 'absolute'), (o.style.left = '2px'), a.parentElement.appendChild(o)) : ((o.style.position = 'fixed'), (o.style.left = '10px'), document.body.appendChild(o)));
        const n = { success: 'linear-gradient(90deg, #6a11cb,rgb(191, 37, 252))', error: 'linear-gradient(90deg, #ff416c, #ff4b2b)', warning: 'linear-gradient(90deg, #ff9a44, #fc6076)', info: 'linear-gradient(90deg, #17a2b8, #138496)' };
        ((o.innerText = '[OMOcaptcha.com] ' + e), (o.style.background = n[t] || n.success), (o.style.display = 'block'));
    }
    async function c(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { timeout: 5e3, maxRetries: 3 };
        try {
            const { timeout: a, maxRetries: n } = t,
                c = { arkoselabs: 'image/jpeg' };
            function i(e) {
                for (const [t, a] of Object.entries(c)) if (e.includes(t)) return a;
                return 'image/png';
            }
            if (e instanceof HTMLCanvasElement || (e.tagName && 'CANVAS' === e.tagName.toUpperCase()))
                try {
                    if (0 === e.width || 0 === e.height) return (console.log('Canvas rỗng hoặc không có kích thước'), '');
                    const r = e.getBoundingClientRect(),
                        l = r.width,
                        s = r.height,
                        u = document.createElement('canvas');
                    ((u.width = l), (u.height = s));
                    u.getContext('2d').drawImage(e, 0, 0, l, s);
                    const h = 'image/png',
                        d = u.toDataURL(h).split(',')[1];
                    return d || (console.log('Không thể lấy base64 từ canvas'), '');
                } catch (f) {
                    return (console.log('Lỗi khi chụp màn hình canvas:', f), '');
                }
            if (e instanceof Element)
                try {
                    const g = e.src;
                    if (g && g.startsWith('data:image/')) {
                        const p = g.split(',')[1];
                        return p || (console.log('Base64 rỗng từ src của element'), '');
                    }
                    e = g || '';
                } catch (m) {
                    return (console.log('Lỗi khi xử lý element:', m), '');
                }
            if ('string' == typeof e && e.startsWith('blob:')) {
                console.log('Da vao blob');
                try {
                    return await new Promise((t) => {
                        const a = new Image();
                        a.setAttribute('crossOrigin', 'anonymous');
                        const o = setTimeout(() => {
                            t('');
                        }, 1e3);
                        ((a.onload = function () {
                            (console.log('Vao trong onload'), clearTimeout(o));
                            try {
                                const a = document.createElement('canvas');
                                ((a.width = this.naturalWidth), (a.height = this.naturalHeight));
                                a.getContext('2d').drawImage(this, 0, 0);
                                const o = i(e);
                                a.toBlob((e) => {
                                    if (!e) return void t('');
                                    const a = new FileReader();
                                    ((a.onloadend = () => {
                                        const e = a.result.split(',')[1];
                                        t(e);
                                    }),
                                        (a.onerror = () => t('')),
                                        a.readAsDataURL(e));
                                }, o);
                            } catch (e) {
                                (console.log('Lỗi khi xử lý blob URL:', e), t(''));
                            }
                        }),
                            (a.onerror = () => {
                                (clearTimeout(o), t(''));
                            }),
                            (a.src = e),
                            console.log('This is img:'),
                            console.log('img src:', a.src));
                    });
                } catch (w) {
                    return (console.log('Lỗi khi xử lý blob URL:', w), '');
                }
            }
            if ('string' == typeof e) {
                console.log('Vao den input string:');
                try {
                    for (let y = 0; y < n; y++)
                        try {
                            const k = new AbortController(),
                                b = setTimeout(() => k.abort(), a),
                                v = await fetch(e, { signal: k.signal });
                            if ((clearTimeout(b), !v.ok)) throw new Error(`HTTP error ${v.status}`);
                            const T = await v.blob();
                            return await new Promise((e, t) => {
                                const a = new FileReader();
                                ((a.onloadend = () => e(a.result.split(',')[1])), (a.onerror = () => t(new Error('Failed to read blob as base64'))), a.readAsDataURL(T));
                            });
                        } catch (S) {
                            if (y === n - 1) return (console.log('Hết lượt thử fetch:', S), '');
                            await o(500);
                        }
                } catch (E) {
                    return (console.log('Lỗi khi fetch URL:', E), '');
                }
            }
            return (console.log('Đầu vào không được hỗ trợ:', e), '');
        } catch (I) {
            return (console.log('Lỗi chung trong fetchImageToBase64:', I), '');
        }
    }
    function i(e, t) {
        return new Promise((a) => {
            const o = Date.now(),
                n = setInterval(() => {
                    for (const t of e) {
                        if (document.querySelector(t)) return (clearInterval(n), void a(!0));
                    }
                    Date.now() - o >= t && (clearInterval(n), a(!1));
                }, 500);
        });
    }
    let r, l, s, u, h, d;
    async function f() {
        (console.log('Run setup tiktok...'), (r = await a(e.POWER_ON.key, e.POWER_ON.defaultValue)), (l = await a(e.API_KEY.key, e.API_KEY.defaultValue)));
        const t = await a(e.TIKTOK.key, e.TIKTOK.defaultValue);
        ((s = t.delayClick), (u = t.delaySwipe), (h = t.loop), (d = t.isActive), console.log('POWER_ON:', r), console.log('Da vao API_KEY:', l), console.log('Da vao IS_ACTIVE:', d));
    }
    console.log('Run tiktok...', window.location.href);
    let g = !1;
    async function p() {
        for (console.log('This is captchaRotate'); ; ) {
            await o(500);
            var e,
                t = '';
            for (let e = 0; e < 10 && null == (t = document.querySelector('img[data-testid="whirl-outer-img"]')); e++) await o(1e3);
            if (((e = document.querySelector('img[data-testid="whirl-inner-img"]')), !t || !e)) return;
            n('Found captchaRotate', 'red', t);
            var a = null,
                c = null;
            for (let n = 0; n < 10 && ((a = t.src), (c = e.src), '' === a || '' === c); n++) await o(1e3);
            if ('' === a || '' === c) {
                if (h) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            const r = { type: 'TiktokRotateWebTask', imageUrls: [a, c] },
                l = await x(r);
            if (null === l || '' === l) {
                if ((n('No taskId', 'red', t), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            const s = await q(l, 30);
            if (!s) {
                if ((n('No result from API', 'red', t), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            n('Solving...', 'red', t);
            const u = 271 - 271 * parseFloat(s.rotate);
            var i = document.querySelector('#secsdk-captcha-drag-wrapper');
            if ((await S(i, u), h)) {
                if (await T('#secsdk-captcha-drag-wrapper', 500, 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function m() {
        for (;;) {
            await o(500);
            var e,
                t = '';
            for (let e = 0; e < 10 && (null == (t = document.querySelector('[class*="captcha"]>[role="main"] [class*="cap-items-center "] img[class*="[210px]"]')) || A('[class*="captcha"]>[role="main"] [class*="cap-items-center "] img[class*="[210px]"]')); e++) await o(1e3);
            if (((e = document.querySelector('[class*="captcha"]>[role="main"] [class*="cap-items-center "] img[class*="[128px]"]')), !t || !e)) return;
            n('Found captchaRotate_new', 'red', t);
            var a = null,
                i = null;
            for (let n = 0; n < 10 && ((a = t.src), (i = e.src), '' === a || '' === i); n++) await o(1e3);
            if ('' === a || '' === i) {
                if (h) {
                    _();
                    continue;
                }
                return;
            }
            var r = a.startsWith('blob:') ? { type: 'TiktokRotateWebTask', imageBase64s: [await c(a), await c(i)] } : { type: 'TiktokRotateWebTask', imageUrls: [a, i] };
            const u = await x(r);
            if (null === u || '' === u) {
                if ((n('No taskId', 'red', t), h)) {
                    _();
                    continue;
                }
                return;
            }
            const d = await q(u, 30);
            if (!d) {
                if ((n('No result from API', 'red', t), h)) {
                    _();
                    continue;
                }
                return;
            }
            var l = document.querySelector('[class*="captcha"]>[role="main"] [class*="absolute"][draggable="true"]');
            let f = parseFloat(d.rotate);
            isNaN(f) && (f = 0);
            var s = parseInt(R(l), 10);
            const g = s - s * f;
            if ((n('Solving...', 'red', t), await E(l, g), h)) {
                if (!(await T('[class*="captcha"]>[role="main"] svg [d*="M24 4"]', 500, 5e3))) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function w() {
        for (console.log('captchaKeoTha'); ; ) {
            await o(500);
            var e = null;
            for (let t = 0; t < 10 && null == (e = document.querySelector('#captcha-verify-image')); t++) await o(1e3);
            if (!e) return;
            n('Found captcha slide', 'red', e);
            var t = null;
            for (let a = 0; a < 10 && null == (t = e.src); a++) await o(1e3);
            if (null === t) {
                if ((n('image_url = null', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            const c = { type: 'TiktokSliderWebTask', imageUrl: t, widthView: e.width },
                i = await x(c);
            if (null === i || '' === i) {
                if ((n('No taskId', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            const r = await q(i, 30);
            if (!r) {
                if ((n('No result from API', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh RefreshButton" i]').click();
                    continue;
                }
                return;
            }
            let l = parseInt(r.end.x, 10);
            var a = document.querySelector('#secsdk-captcha-drag-wrapper');
            if ((n('Solving...', 'red', e), await S(a, l), h)) {
                if (await T('#captcha-verify-image', 500, 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function y() {
        for (console.log('captchaKeoTha_new'); ; ) {
            await o(500);
            var e = null;
            for (let t = 0; t < 10 && (null == (e = document.querySelector('#captcha-verify-image')) || A('#captcha-verify-image')); t++) await o(1e3);
            if (!e) return;
            n('Found captchaKeoTha_new', 'red', e);
            var t = null;
            for (let a = 0; a < 10 && null == (t = e.src); a++) await o(1e3);
            if (null === t) {
                if ((n('image_url = null', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            var a = t.startsWith('blob:') ? { type: 'TiktokSliderWebTask', imageBase64: await c(t), widthView: e.width } : { type: 'TiktokSliderWebTask', imageUrl: t, widthView: e.width };
            const r = await x(a);
            if (null === r || '' === r) {
                if ((n('No taskId', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            const l = await q(r, 30);
            if (!l) {
                if ((n('No result from API', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            let s = 0.8 * parseInt(l.end.x, 10);
            var i = document.querySelector('[class*="captcha"]>[role="main"] [class*="absolute"][draggable="true"]');
            if ((n('Solving...', 'red', e), await E(i, s), h)) {
                if (!(await T('[class*="captcha"]>[role="main"] svg [d*="M24 4"]', 500, 5e3))) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function k() {
        for (console.log('captcha3D'); ; ) {
            await o(500);
            var e = null;
            for (let t = 0; t < 10 && (null == (e = document.querySelector('#captcha-verify-image')) || A('[class*="captcha_verify_container"] img')); t++) await o(1e3);
            if (!e) return;
            n('Found captcha3D', 'red', e);
            var t = null;
            for (let a = 0; a < 10 && (await o(1e3), !(null != (t = e.src) && e.width > 0 && e.height > 0)); a++);
            if (null === t) {
                if ((n('image_url = null', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh" i]').click();
                    continue;
                }
                return;
            }
            const a = { type: 'Tiktok3DSelectObjectWebTask', imageUrl: t, widthView: e.width, heightView: e.height },
                c = await x(a);
            if (null === c || '' === c) {
                if ((n('No taskId', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh" i]').click();
                    continue;
                }
                return;
            }
            const i = await q(c, 30);
            if (!i) {
                if ((n('No result from API', 'red', e), h)) {
                    document.querySelector('a[class*="secsdk_captcha_refresh" i]').click();
                    continue;
                }
                return;
            }
            n('Solving...', 'red', e);
            let r = parseInt(i.pointA.x, 10),
                l = parseInt(i.pointA.y, 10),
                u = parseInt(i.pointB.x, 10),
                d = parseInt(i.pointB.y, 10);
            if ((I(e, r, l), await o(s), I(e, u, d), await o(s), document.querySelector('div[class*="verify-captcha-submit-button" i]').click(), h)) {
                if (await T('#captcha-verify-image', 500, 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    async function b() {
        for (console.log('captcha3D_new'); ; ) {
            await o(500);
            var e = null;
            for (let t = 0; t < 15 && (null == (e = document.querySelector('[class*="captcha-verify-container"] img')) || A('[class*="captcha-verify-container"] img')); t++) await o(1e3);
            if (!e) return;
            n('Found captcha3D_new', 'red', e);
            var t = null;
            for (let a = 0; a < 15 && (await o(1e3), !(null != (t = e.src) && e.width > 0 && e.height > 0)); a++);
            if (null === t) {
                if ((n('image_url = null', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            var a = t.startsWith('blob:') ? { type: 'Tiktok3DSelectObjectWebTask', imageBase64: await c(t), widthView: e.width, heightView: e.height } : { type: 'Tiktok3DSelectObjectWebTask', imageUrl: t, widthView: e.width, heightView: e.height };
            const i = await x(a);
            if (null === i || '' === i) {
                if ((n('No taskId', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            const r = await q(i, 30);
            if (!r) {
                if ((n('No result from API', 'red', e), h)) {
                    _();
                    continue;
                }
                return;
            }
            let l = parseInt(r.pointA.x, 10),
                u = parseInt(r.pointA.y, 10),
                d = parseInt(r.pointB.x, 10),
                f = parseInt(r.pointB.y, 10);
            if ((n('Solving...', 'red', e), I(e, l, u), await o(s), I(e, d, f), await o(s), document.querySelector('[class*="captcha-verify-container"] [class*="cap-relative"] [class="TUXButton-label"]').click(), h)) {
                if (!(await T('[class*="captcha"]>[role="main"] svg [d*="M24 4"]', 500, 5e3))) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    function v(e) {
        return !!document.querySelector(e);
    }
    async function T(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5e3;
        const o = Date.now();
        return (async function n() {
            return !!document.querySelector(e) || (!(Date.now() - o > a) && (await new Promise((e) => setTimeout(e, t)), n()));
        })();
    }
    function S(e, t) {
        return new Promise((a) => {
            var o = new MouseEvent('mousedown', { bubbles: !0 });
            e.dispatchEvent(o);
            var n = u,
                c = 0;
            !(function o() {
                c += 1;
                var i = new MouseEvent('mousemove', { bubbles: !0, clientX: c, clientY: 0 });
                if ((e.dispatchEvent(i), c < t)) setTimeout(o, n);
                else {
                    var r = new MouseEvent('mouseup', { bubbles: !0 });
                    (e.dispatchEvent(r), a());
                }
            })();
        });
    }
    function E(e, t) {
        return new Promise((a) => {
            var o = new DragEvent('dragstart', { bubbles: !0, clientX: 0, clientY: 8 });
            e.dispatchEvent(o);
            var n = 0,
                c = u;
            !(function o() {
                n += 1;
                var i = new DragEvent('drag', { bubbles: !0, clientX: n, clientY: 8 });
                (e.dispatchEvent(i),
                    n < t
                        ? setTimeout(o, c)
                        : setTimeout(() => {
                              var t = new DragEvent('dragend', { bubbles: !0 });
                              (e.dispatchEvent(t), a());
                          }, 1e3));
            })();
        });
    }
    function I(e, t, a) {
        var o = e.getBoundingClientRect(),
            n = o.left + t,
            c = o.top + a,
            i = new MouseEvent('click', { bubbles: !0, clientX: n, clientY: c });
        e.dispatchEvent(i);
    }
    function _() {
        for (var e = document.querySelectorAll('[class*="captcha-verify-container"] button'), t = 0; t < e.length; t++) {
            if (e[t].querySelector('[d*="M56"]')) {
                e[t].click();
                break;
            }
        }
    }
    function A(e) {
        const t = document.querySelector(e);
        return t ? ('IMG' === t.tagName || 'IFRAME' === t.tagName ? !t.complete : !!t.classList.contains('loading')) : (console.warn(`Phần tử với selector "${e}" không tồn tại.`), !1);
    }
    function R(e) {
        if (!e) return (console.warn('Không tìm thấy phần tử!'), null);
        const t = e.parentElement;
        if (!t) return (console.warn('Phần tử không có cha hợp lệ!'), null);
        return t.clientWidth - e.clientWidth;
    }
    async function x(e) {
        const a = JSON.stringify({ clientKey: l, task: e });
        try {
            const e = await t('TIKTOK', 'createTask', a);
            return e || (console.error('[tiktok] No taskId returned from createTask'), '');
        } catch (e) {
            return (console.error('[tiktok] Failed to create task:', e), '');
        }
    }
    async function q(e, a) {
        const o = JSON.stringify({ clientKey: l, taskId: e });
        try {
            const e = await t('TIKTOK', 'getTaskResult', { data: o, timeWait: a });
            return e ? ('fail' === e.status ? (console.error('[tiktok] API error:', e), null) : e.solution ? e.solution : (console.error('[tiktok] Invalid API response: missing solution'), null)) : (console.error('[tiktok] No result returned from getTaskResult'), null);
        } catch (e) {
            return (console.error('[tiktok] Failed to get task result:', e), null);
        }
    }
    (new MutationObserver(async (e, t) => {
        await (async function (e) {
            if ((console.log('Run handleElementMutation...'), await f(), r && d && l && 'YOUR_CLIEN_KEY' !== l))
                for (const t of e) {
                    if ((console.log('[Tiktok] Run for mutationsList'), console.log('[Tiktok] Mutation type', t.type), 'childList' !== t.type)) continue;
                    const e = document.querySelector('[role="dialog"][class*="captcha"]');
                    if ((console.log('[Tiktok] isElementVisible', g), e && !g)) {
                        ((g = !0), await o(1500));
                        try {
                            if (!(await i(['img[data-testid="whirl-outer-img" i]', 'img[class*="captcha_verify_img_slide" i]', 'div[class*="verify-captcha-submit-button" i]', '[class*="captcha-verify-container"] [class="TUXButton-label"]', '[class*="captcha"]>[role="main"] [class*="cap-items-center "] img', '[class*="captcha"]>[role="main"] img[class*="cap-w-full cap-h-auto"]'], 1e4))) {
                                console.log('[Tiktok] Không thấy elementExists');
                                continue;
                            }
                            for (let e = 0; e < 30; e++) {
                                if ((console.log('Vòng lặp: ', e), v('img[data-testid="whirl-outer-img" i]'))) {
                                    (console.log('Tìm thấy captchaRotate'), await p());
                                    break;
                                }
                                if (v('img[class*="captcha_verify_img_slide" i]')) {
                                    (console.log('Tìm thấy captchaKeoTha'), await w());
                                    break;
                                }
                                if (v('div[class*="verify-captcha-submit-button" i]')) {
                                    (console.log('Tìm thấy captcha3D'), await k());
                                    break;
                                }
                                if (v('[class*="captcha"]>[role="main"] [class="cap-flex cap-absolute "][style*="left: 0px;"]') && 2 === document.querySelectorAll('[class*="captcha"]>[role="main"] [class*="cap-relative"] img').length) {
                                    (console.log('Tìm thấy captchaKeoTha_new'), await y());
                                    break;
                                }
                                if ((v('[class*="captcha-verify-container"] [class="TUXButton-label"]') && 'Confirm' === document.querySelector('[class*="captcha-verify-container"] [class="TUXButton-label"]').textContent) || v('[class*="captcha"]>[role="main"] img[class*="cap-w-full cap-h-auto"]')) {
                                    (console.log('Tìm thấy captcha3D_new'), await b());
                                    break;
                                }
                                if (v('[class*="captcha"]>[role="main"] [class*="cap-items-center "] img') && document.querySelectorAll('[class*="captcha"]>[role="main"] [class*="cap-items-center "] img').length >= 2) {
                                    (console.log('Tìm thấy captchaRotate_new'), await m());
                                    break;
                                }
                                await o(1e3);
                            }
                        } catch (e) {
                            (console.log('Lỗi:', e), n(`Error: ${e.message}`, 'red'));
                        } finally {
                            g = !1;
                        }
                    }
                }
        })(e);
    }).observe(document.body, { childList: !0, subtree: !0 }),
        (async () => {
            await f();
        })());
})();
