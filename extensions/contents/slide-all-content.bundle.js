(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, a) {
        const n = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((l, o) => {
                n.sendMessage({ source: e, type: t, data: a }, (e) => {
                    n.lastError ? o(new Error(`Error sending message: ${n.lastError.message}`)) : l(e);
                });
            });
        } catch (e) {
            throw (console.error(`[messageHelpers] Error in sending message: ${e.message}`), e);
        }
    }
    const a = async (e, t) => {
        const a = 'undefined' != typeof browser ? browser.storage.local : chrome.storage.local,
            n = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            const l = await a.get([e]);
            if (n.lastError) throw new Error(`Error retrieving ${e}: ${n.lastError.message}`);
            return null != l[e] ? l[e] : t;
        } catch (t) {
            throw (console.error(`[storageHelpers] Error retrieving ${e}:`, t), t);
        }
    };
    Promise.resolve();
    async function n(e) {
        return new Promise((t) => setTimeout(t, e));
    }
    function l(e, t) {
        return new Promise((a) => {
            const n = Date.now(),
                l = setInterval(() => {
                    for (const t of e) {
                        if (document.querySelector(t)) return (clearInterval(l), void a(!0));
                    }
                    Date.now() - n >= t && (clearInterval(l), a(!1));
                }, 500);
        });
    }
    function o(e, t) {
        return new Promise((a) => {
            const n = document.querySelector(e);
            if (n) return a(n);
            const l = new MutationObserver((t, n) => {
                const l = document.querySelector(e);
                l && (n.disconnect(), a(l));
            });
            (l.observe(document.body, { childList: !0, subtree: !0 }),
                setTimeout(() => {
                    (l.disconnect(), a(null));
                }, t));
        });
    }
    let c, r, s, i, u;
    async function d() {
        ((c = await a(e.POWER_ON.key, e.POWER_ON.defaultValue)), (r = await a(e.API_KEY.key, e.API_KEY.defaultValue)));
        const t = await a(e.SLIDE_ALL.key, e.SLIDE_ALL.defaultValue);
        ((s = t.delaySwipe), (i = t.loop), (u = t.isActive));
    }
    console.log('Run file SlideAll', window.location.href);
    let m = !1,
        f = '';
    async function y() {
        for (console.log('[SlideAll] This is captchaKeoTha_new'); ; ) {
            let e, t;
            await n(500);
            for (let a = 0; a < 10 && ((e = document.querySelector('[class*="mask"][style=""] [class*="verify-img-panel"] img')), (t = document.querySelector('[class*="mask"][style=""] [class*="verify-sub-block"] img')), null === e || null === t); a++) await n(1e3);
            if (!e || !t) return;
            const a = { type: 'SliderAllWebTask', domain: 'www.coresky.com', imageBase64s: [e.src.split(',')[1], t.src.split(',')[1]] },
                l = await v(a);
            if (!l) {
                if (i) {
                    document.querySelector('.verify-refresh').click();
                    continue;
                }
                return;
            }
            const o = await b(l, 30);
            if ((console.log('Result:', o), !o)) {
                if (i) {
                    document.querySelector('.verify-refresh').click();
                    continue;
                }
                return;
            }
            let c = parseInt(o.end, 10);
            console.log('conutX:', c);
            let r = document.querySelector('.verify-move-block');
            if (!r) continue;
            const s = r.getBoundingClientRect(),
                u = s.left + s.width / 2,
                d = s.top + s.height / 2,
                m = u + c;
            r.dispatchEvent(new MouseEvent('mousedown', { bubbles: !0, cancelable: !0, clientX: u, clientY: d }));
            const f = 20;
            for (let e = 1; e <= f; e++) {
                const t = u + (c * e) / f;
                (r.dispatchEvent(new MouseEvent('mousemove', { bubbles: !0, cancelable: !0, clientX: t, clientY: d })), await n(20));
            }
            if ((r.dispatchEvent(new MouseEvent('mouseup', { bubbles: !0, cancelable: !0, clientX: m, clientY: d })), console.log(`[SlideAll] Đã kéo button sang phải ${c}px`), !i)) return;
            (await n(5e3), document.querySelector('.verify-refresh').click());
        }
    }
    async function p() {
        for (console.log('This is captchaKeoTha'); ; ) {
            await n(500);
            var e = null;
            for (let t = 0; t < 10 && null == (e = document.querySelector('[id="captcha__element"] [id="captcha__puzzle"]>canvas')); t++) await n(1e3);
            if (!e) return;
            let a = '';
            for (let e = 0; e < 10; e++) {
                if (((a = g()), a && f !== a)) {
                    f = a;
                    break;
                }
                await n(1e3);
            }
            if (!a) return;
            console.log('This is imgBase64>>>', a);
            const l = { type: 'GeetestSliderWebTask', imageBase64: a },
                c = await v(l);
            c || console.log('Ko có taskId');
            const r = await b(c, 30);
            (console.log('Day la result>>>', r), r || console.log('Ko có result'));
            let s = parseInt(r.end.x, 10);
            var t = document.querySelector('[id="captcha__frame__bottom"] [class*="sliderContainer"] div[class="slider"]');
            if ((await h(t, s), i)) {
                if (await o('[class*="geetest_lock_success"]', 5e3)) {
                    console.log('Giải captcha thành công');
                    break;
                }
                console.log('Giải captcha thất bại');
            }
        }
    }
    function w(e) {
        return !!document.querySelector(e);
    }
    function g() {
        const e = document.querySelectorAll('#captcha__puzzle canvas'),
            t = e[0],
            a = e[1],
            n = document.createElement('canvas');
        ((n.width = 280), (n.height = 155));
        const l = n.getContext('2d');
        (l.drawImage(t, 0, 0), l.drawImage(a, 0, 0));
        const o = n.toDataURL('image/png'),
            c = o.replace(/^data:image\/png;base64,/, '');
        return (console.log('Base64 đầy đủ:\n', o), console.log('Base64 chỉ phần mã hóa:\n', c), c);
    }
    async function h(e, t) {
        return new Promise((a) => {
            if (!e) return a();
            e.parentElement;
            const l = t,
                o = new DataTransfer(),
                c = s;
            function r(t) {
                let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                (e.dispatchEvent(new MouseEvent(t, { bubbles: !0, cancelable: !0, ...a })), e.dispatchEvent(new PointerEvent(t, { bubbles: !0, cancelable: !0, ...a, pointerType: 'mouse', isPrimary: !0 })));
            }
            (async () => {
                (r('mouseenter'), r('mouseover'), await n(c), r('pointerdown', { clientX: 0, clientY: 0 }), r('mousedown', { clientX: 0, clientY: 0 }), e.dispatchEvent(new DragEvent('dragstart', { bubbles: !0, cancelable: !0, dataTransfer: o })));
                let s = 0,
                    i = 0;
                for (; s + 10 < t; ) {
                    const e = s / t;
                    let a;
                    ((a = e < 0.3 ? 2 * Math.random() + 1 : e < 0.7 ? 6 * Math.random() + 2 : 2 * Math.random() + 0.5), (s += a), (i += 8 * (Math.random() - 0.5)));
                    const o = Math.min(s, l),
                        u = i;
                    (r('mousemove', { clientX: o, clientY: u }), r('pointermove', { clientX: o, clientY: u }), await n(c));
                }
                s = t;
                const u = i;
                (r('mousemove', { clientX: s, clientY: u }), r('pointermove', { clientX: s, clientY: u }), await n(c), r('pointerup', { clientX: s, clientY: u }), r('mouseup', { clientX: s, clientY: u }), e.dispatchEvent(new DragEvent('dragend', { bubbles: !0, cancelable: !0, dataTransfer: o })), console.log('Vị trí backend >>>', t), console.log(`Vị trí cuối cùng của element: x = ${s}, y = ${u}`), a());
            })();
        });
    }
    async function v(e) {
        const a = JSON.stringify({ clientKey: r, task: e });
        try {
            const e = await t('GEETEST', 'createTask', a);
            return e || (console.error('[SlideAll] No taskId returned from createTask'), '');
        } catch (e) {
            return (console.error('[SlideAll] Failed to create task:', e), '');
        }
    }
    async function b(e, a) {
        const n = JSON.stringify({ clientKey: r, taskId: e });
        try {
            const e = await t('GEETEST', 'getTaskResult', { data: n, timeWait: a });
            return e ? ('fail' === e.status ? (console.error('[SlideAll] API error:', e), null) : e.solution ? e.solution : (console.error('[SlideAll] Invalid API response: missing solution'), null)) : (console.error('[SlideAll] No result returned from getTaskResult'), null);
        } catch (e) {
            return (console.error('[SlideAll] Failed to get task result:', e), null);
        }
    }
    (async () => {
        await d();
        new MutationObserver(async (e, t) => {
            await (async function (e) {
                if ((console.log('Đã vào [SlideAll] handleElementMutation'), await d(), c && u && r && 'YOUR_CLIEN_KEY' !== r))
                    for (const t of e)
                        if ('childList' === t.type) {
                            const e = document.querySelector('[id="captcha__frame"] [id="captcha__element"]'),
                                t = document.querySelector('[class*="mask"][style=""] [class*="verify-img-panel"]');
                            if ((!e && !t) || m) continue;
                            if ((console.log('Da thay targetElement'), !r)) return;
                            m = !0;
                            try {
                                if ((await n(1500), !(await l(['[id="captcha__element"] [id="captcha__puzzle"] canvas', '[class*="mask"][style=""] [class*="verify-img-panel"] img'], 1e4)))) return;
                                console.log('Tìm thấy elementExists');
                                for (let e = 0; e < 20; e++) {
                                    if (w('[class*="mask"][style=""] [class*="verify-img-panel"] img')) {
                                        await y();
                                        break;
                                    }
                                    if (w('[id="captcha__element"] [id="captcha__puzzle"] canvas[class="block"]')) {
                                        (console.log('Tìm thấy captchaKeoTha'), await p());
                                        break;
                                    }
                                    await n(1e3);
                                }
                            } finally {
                                m = !1;
                            }
                        }
            })(e);
        }).observe(document.body, { childList: !0, subtree: !0 });
        for (let e = 0; e < 100; e++) {
            if (document.querySelector('[class*="mask"][style=""] [class*="verify-img-panel"] img')) {
                await y();
                break;
            }
            await n(1500);
        }
    })();
})();
