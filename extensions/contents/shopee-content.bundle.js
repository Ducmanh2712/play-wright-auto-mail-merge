(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, o) {
        const n = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((a, r) => {
                n.sendMessage({ source: e, type: t, data: o }, (e) => {
                    n.lastError ? r(new Error(`Error sending message: ${n.lastError.message}`)) : a(e);
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
            const a = await o.get([e]);
            if (n.lastError) throw new Error(`Error retrieving ${e}: ${n.lastError.message}`);
            return null != a[e] ? a[e] : t;
        } catch (t) {
            throw (console.error(`[storageHelpers] Error retrieving ${e}:`, t), t);
        }
    };
    Promise.resolve();
    async function n(e) {
        return new Promise((t) => setTimeout(t, e));
    }
    let a, r, i, s, c;
    console.log('Run shopee...', window.location.href);
    let l = !1;
    async function d() {
        console.log('[shopee] Da den captchaSlide()');
        for (var e = '', t = 0; t < 30; t++) {
            await n(1e3);
            var o = document.querySelector('[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(1) > img');
            if (o && e !== o.src) {
                e = o.src;
                var a = document.querySelector('[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(2) > img');
                const t = await g(e, a.src);
                if ('' === t) {
                    if (s) {
                        await f(a, 1);
                        continue;
                    }
                } else {
                    const o = await y(t, 30);
                    if ('Server 500' === o) {
                        e = '';
                        continue;
                    }
                    if ('' === o && s) {
                        await f(a, 1);
                        continue;
                    }
                    let n = parseInt(o.end.x, 10);
                    if ((await f(a, n), !s)) return;
                }
            }
        }
    }
    async function u() {
        console.log('[shopee] Đã vào captchaSlide_new');
        for (var e = '', t = 0; t < 30; t++) {
            await n(600 + 800 * Math.random());
            const t = document.querySelector('[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(1) > img'),
                o = document.querySelector('[id*="sliderContainer"]'),
                a = document.querySelector('[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(2) > img');
            if (t && o && a) {
                if (e !== t.src) {
                    e = t.src;
                    const n = await g(e, a.src, 'rotate');
                    if (!n) {
                        if ((console.warn('[shopee] Không lấy được taskId từ API'), s)) continue;
                        return;
                    }
                    const r = await y(n, 30);
                    if (!r || 'Server 500' === r) {
                        (console.warn('[shopee] Lỗi server hoặc rỗng, thử lại'), (e = ''));
                        continue;
                    }
                    if (!r.point || !r.point.x || !r.point.y) {
                        if ((console.error('[shopee] API trả về point không hợp lệ:', r), s)) continue;
                        return;
                    }
                    let i = parseFloat(r.point.x),
                        c = parseFloat(r.point.y);
                    const l = t.getBoundingClientRect(),
                        d = l.width / t.naturalWidth,
                        u = l.height / t.naturalHeight,
                        h = l.left + i * d,
                        p = l.top + c * u;
                    if ((console.log(`[shopee] API point=(${i},${c}), scale=(${d},${u}), targetScreen=(${h},${p})`), await m(o, a, h, p), !s)) return;
                }
            } else console.warn('[shopee] Không tìm thấy phần tử cần thiết');
        }
    }
    function h(e) {
        return !!document.querySelector(e);
    }
    async function p(e, t) {
        const o = Date.now() + t;
        for (; Date.now() < o; ) {
            for (const t of e) {
                if (document.querySelector(t)) return !0;
            }
            await n(500);
        }
        return !1;
    }
    function f(e, t) {
        return new Promise((o, n) => {
            if (!e) return (console.error('Element not found'), void n('Element not found'));
            function a() {
                const t = e.getBoundingClientRect();
                return { centerX: t.left + t.width / 2, centerY: t.top + t.height / 2 };
            }
            const r = new DataTransfer();
            function i(t, o, n) {
                const a = { bubbles: !0, cancelable: !0, clientX: o, clientY: n, dataTransfer: r, ...(arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}) },
                    i = t.includes('drag') ? new DragEvent(t, a) : new MouseEvent(t, a);
                e.dispatchEvent(i);
            }
            const s = a(),
                c = s.centerX + t;
            (i('pointerenter', s.centerX, s.centerY), i('mouseover', s.centerX, s.centerY), i('mousedown', s.centerX, s.centerY), i('dragstart', s.centerX, s.centerY));
            let l = s.centerX,
                d = 10,
                u = 3;
            !(function e() {
                const n = a();
                if (Math.abs(n.centerX - c) <= 1)
                    return void setTimeout(() => {
                        (i('dragend', n.centerX, n.centerY), i('mouseup', n.centerX, n.centerY), o());
                    }, 1e3);
                (c - n.centerX > t / 4 ? ((d = 10), (u = 3)) : ((d = 1), (u = 10)), (l += d * Math.sign(c - n.centerX)));
                const r = n.centerY;
                (i('mousemove', l, r), i('drag', l, r), setTimeout(e, u));
            })();
        });
    }
    async function m(e, t, o, n) {
        if (!e || !t) return void console.error('[shopee] ❌ Không tìm thấy phần tử để kéo');
        function a(e) {
            const t = e.getBoundingClientRect();
            return { x: t.left + t.width / 2, y: t.top + t.height / 2 };
        }
        const r = (e) => new Promise((t) => setTimeout(t, e)),
            i = new DataTransfer();
        function s(t, o, n) {
            const a = t.includes('drag') ? new DragEvent(t, { bubbles: !0, cancelable: !0, clientX: o, clientY: n, dataTransfer: i }) : new MouseEvent(t, { bubbles: !0, cancelable: !0, clientX: o, clientY: n });
            e.dispatchEvent(a);
        }
        const c = a(e);
        (s('pointerenter', c.x, c.y), s('mouseover', c.x, c.y), await r(50 + 150 * Math.random()), s('mousedown', c.x, c.y), s('dragstart', c.x, c.y));
        let l = c.x,
            d = c.y,
            u = !1,
            h = 1,
            p = 0;
        for (console.log(`[shopee] 🟢 Kéo từ (${c.x}, ${c.y}) đến (${o}, ${n})`); ; ) {
            const e = a(t),
                i = o - e.x,
                c = n - e.y,
                f = Math.sqrt(i * i + c * c);
            if (3 === h && f < 3) {
                (console.log(`[shopee] ✅ Snap cuối: cách ${f.toFixed(2)}px`), (l += i), (d += c), s('mousemove', l, d), s('drag', l, d));
                break;
            }
            if ((f < 2.5 && 1 === h && !u && (console.log('[shopee] 🟠 Vào phase 2: Overshoot'), (h = 2)), 2 === h && !u)) {
                const e = 3 + 2 * Math.random();
                ((l += (i / f) * e), (d += (c / f) * e + 1 * (Math.random() - 0.5)), s('mousemove', l, d), s('drag', l, d), (u = !0), await r(50 + 50 * Math.random()), (h = 3));
                continue;
            }
            let m;
            m = f > 50 ? 6 + 1.5 * Math.random() : f > 20 ? 3 + 1 * Math.random() : 1.5 + 0.5 * Math.random();
            const g = 0.5 + Math.random(),
                y = Math.sin((p / 200) * Math.PI) * g * 5;
            if (((l += (i / f) * m + 0.5 * (Math.random() - 0.5)), (d += (c / f) * m + y + 0.5 * (Math.random() - 0.5)), s('mousemove', l, d), s('drag', l, d), p % 10 == 0 && Math.random() < 0.4)) {
                (s('mousemove', l + 4 * (Math.random() - 0.5), d + 4 * (Math.random() - 0.5)), await r(10 + 30 * Math.random()));
            }
            let v;
            if ((p === Math.floor(100) && Math.random() < 0.8 && (console.log('[shopee] ⚪ Giả vờ pause giữa chừng'), await r(150 + 150 * Math.random())), (v = f > 50 ? 10 + 10 * Math.random() : f > 20 ? 20 + 20 * Math.random() : 30 + 20 * Math.random()), await r(v), p++, p > 200)) {
                console.warn('[shopee] ⚠️ Max step, dừng để tránh vòng lặp vô tận');
                break;
            }
        }
        (await r(80 + 50 * Math.random()), s('dragend', l, d), s('mouseup', l, d), console.log('[shopee] 🟢 Đã nhả chuột xong'));
    }
    async function g(e, o) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
        const a = JSON.stringify({ clientKey: r, task: { type: 'ShopeeSliderWebTask', typeCaptcha: n, imageBase64s: [e, o] } });
        try {
            const e = await t('SHOPEE', 'createTask', a);
            return e || (console.error('[shopee] No taskId returned from createTask'), '');
        } catch (e) {
            return (console.error('[shopee] Failed to create task:', e), '');
        }
    }
    async function y(e, o) {
        const n = JSON.stringify({ clientKey: r, taskId: e });
        try {
            const e = await t('SHOPEE', 'getTaskResult', { data: n, timeWait: o });
            return e ? ('fail' === e.status ? (console.error('[shopee] API error:', e), null) : e.solution ? e.solution : (console.error('[shopee] Invalid API response: missing solution'), '')) : (console.error('[shopee] No result returned from getTaskResult'), '');
        } catch (e) {
            return (console.error('[shopee] Failed to get task result:', e), '');
        }
    }
    (new MutationObserver(async (e, t) => {
        await (async function (e) {
            if (a && c && r && 'YOUR_CLIEN_KEY' !== r) {
                console.log('[shopee] handleElementMutation');
                for (const t of e)
                    if ('childList' === t.type) {
                        const e = document.querySelector('[role="dialog"] [id*="captchaMask"]'),
                            t = document.querySelector('[id*="NEW_CAPTCHA"] [id*="captchaMask"]');
                        if (e || t) {
                            if ((console.log('[shopee] Tim thay targetElement'), !l)) {
                                if (!r) return;
                                ((l = !0),
                                    await n(1e3),
                                    p(['[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(1) > img', '[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(2) > img', '[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(1) > img', '[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(2) > img'], 1e4).then(async (e) => {
                                        if (e)
                                            for (var t = 0; t < 20; t++) {
                                                if (h('[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(1) > img') && h('[role="dialog"] [id*="captchaMask"] div > div:nth-of-type(2) > img')) {
                                                    await d();
                                                    break;
                                                }
                                                if (h('[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(1) > img') && h('[id*="NEW_CAPTCHA"] [id*="captchaMask"] div > div:nth-of-type(2) > img')) {
                                                    await u();
                                                    break;
                                                }
                                                await n(500);
                                            }
                                    }));
                            }
                        } else (console.log('[shopee] Khong tim thay targetElement'), (l = !1));
                    }
            }
        })(e);
    }).observe(document.body, { childList: !0, subtree: !0 }),
        (async () => {
            await (async function () {
                ((a = await o(e.POWER_ON.key, e.POWER_ON.defaultValue)), (r = await o(e.API_KEY.key, e.API_KEY.defaultValue)));
                const t = await o(e.SHOPEE.key, e.SHOPEE.defaultValue);
                ((i = t.delaySwipe), (s = t.loop), (c = t.isActive));
            })();
        })());
})();
