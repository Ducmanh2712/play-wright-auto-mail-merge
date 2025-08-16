(() => {
    'use strict';
    const e = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } };
    async function t(e, t, l) {
        const o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            return await new Promise((r, a) => {
                o.sendMessage({ source: e, type: t, data: l }, (e) => {
                    o.lastError ? a(new Error(`Error sending message: ${o.lastError.message}`)) : r(e);
                });
            });
        } catch (e) {
            throw (console.error(`[messageHelpers] Error in sending message: ${e.message}`), e);
        }
    }
    const l = async (e, t) => {
        const l = 'undefined' != typeof browser ? browser.storage.local : chrome.storage.local,
            o = 'undefined' != typeof browser ? browser.runtime : chrome.runtime;
        try {
            const r = await l.get([e]);
            if (o.lastError) throw new Error(`Error retrieving ${e}: ${o.lastError.message}`);
            return null != r[e] ? r[e] : t;
        } catch (t) {
            throw (console.error(`[storageHelpers] Error retrieving ${e}:`, t), t);
        }
    };
    Promise.resolve();
    async function o(e) {
        return new Promise((t) => setTimeout(t, e));
    }
    let r, a, n, c, s;
    async function i() {
        ((r = await l(e.POWER_ON.key, e.POWER_ON.defaultValue)), (a = await l(e.API_KEY.key, e.API_KEY.defaultValue)));
        const t = await l(e.ZALO.key, e.ZALO.defaultValue);
        ((n = t.delayClick), (c = t.loop), (s = t.isActive));
    }
    console.log('Run file zalo...', window.location.href);
    let u = !1;
    async function d() {
        for (var e = '', t = 0; t < 30; t++) {
            if ((await o(1e3), y(['[class*="challenge-container"] [class="challenge-view"]>div[style*="color: red"]']))) {
                var l = w('[class*="challenge-container"] [class="challenge-view"]>div[style*="color: red"]');
                if ((console.log('Text Error:', l), l.length > 0)) {
                    if (c) {
                        document.querySelector('[class*="challenge-container"] [class="challenge-view"] div[style*="refresh.png"]').click();
                        continue;
                    }
                    return void console.log('Giải captcha thất bại');
                }
            }
            var r = document.querySelector('[class*="challenge-container"] [class="challenge-view"] img');
            if (r && e !== r.src) {
                var a = w('[class*="challenge-container"] [class="challenge-view"]>div[class*="1320"]');
                if (null === a) continue;
                ((a = a.trim()), console.log('Câu hỏi Select Object :', a), (e = r.src));
                const t = await h(e, a);
                if ('' === t) {
                    if (c) {
                        document.querySelector('[class*="challenge-container"] [class="challenge-view"] div[style*="refresh.png"]').click();
                        continue;
                    }
                } else {
                    const e = await m(t, 30);
                    if (!e && c) {
                        document.querySelector('[class*="challenge-container"] [class="challenge-view"] div[style*="refresh.png"]').click();
                        continue;
                    }
                    console.log('Kết quả:', e);
                    for (const t of e.objects) {
                        let e = parseInt(t, 10);
                        (document.querySelectorAll('tr>td')[e - 1].click(), await o(n));
                    }
                    (await o(1e3), document.querySelector('[class*="challenge-container"] [class="challenge-view"]>div>div>div').click());
                }
            }
        }
    }
    function y(e) {
        for (const t of e) {
            const e = document.querySelector(t);
            if (e) return e;
        }
        return null;
    }
    function f(e) {
        return !!document.querySelector(e);
    }
    async function g(e, t) {
        const l = Date.now() + t;
        for (; Date.now() < l; ) {
            for (const t of e) {
                if (document.querySelector(t)) return !0;
            }
            await o(500);
        }
        return !1;
    }
    function w(e) {
        const t = document.querySelector(e);
        return t ? t.textContent.trim() : '';
    }
    async function h(e, l) {
        const o = JSON.stringify({ clientKey: a, task: { type: 'ZaloSelectObjectTask', imageUrl: e, other: l } });
        try {
            const e = await t('ZALO', 'createTask', o);
            return e || (console.error('[zalo] No taskId returned from createTask'), '');
        } catch (e) {
            return (console.error('[zalo] Failed to create task:', e), '');
        }
    }
    async function m(e, l) {
        const o = JSON.stringify({ clientKey: a, taskId: e });
        try {
            const e = await t('ZALO', 'getTaskResult', { data: o, timeWait: l });
            return e ? ('fail' === e.status ? (console.error('[zalo] API error:', e), null) : e.solution ? e.solution : (console.error('[zalo] Invalid API response: missing solution'), null)) : (console.error('[zalo] No result returned from getTaskResult'), null);
        } catch (e) {
            return (console.error('[zalo] Failed to get task result:', e), null);
        }
    }
    (new MutationObserver(async (e, t) => {
        await (async function (e) {
            if ((await i(), r && s && a && 'YOUR_CLIEN_KEY' !== a))
                for (const t of e)
                    if ('childList' === t.type && document.querySelector('[class*="challenge-container"]') && !u) {
                        ((u = !0), await o(1e3));
                        try {
                            if (!(await g(['[class="challenge-view"] img'], 1e4))) return;
                            for (let e = 0; e < 20; e++) {
                                if (f('[class="challenge-view"] img')) {
                                    await d();
                                    break;
                                }
                                await o(500);
                            }
                        } catch (e) {
                            console.error('Captcha xử lý lỗi:', e);
                        } finally {
                            u = !1;
                        }
                    }
        })(e);
    }).observe(document.body, { childList: !0, subtree: !0 }),
        (async () => {
            await i();
        })());
})();
