(() => {
    'use strict';
    var e,
        t,
        o,
        i = {
            4038: (e, t, o) => {
                var i = o(6540),
                    r = o(5338),
                    s = o(5072),
                    n = o.n(s),
                    a = o(7825),
                    c = o.n(a),
                    l = o(7659),
                    h = o.n(l),
                    g = o(5056),
                    d = o.n(g),
                    u = o(540),
                    y = o.n(u),
                    p = o(1113),
                    f = o.n(p),
                    m = o(7589),
                    w = {};
                ((w.styleTagTransform = f()), (w.setAttributes = d()), (w.insert = h().bind(null, 'head')), (w.domAPI = c()), (w.insertStyleElement = y()));
                n()(m.A, w);
                m.A && m.A.locals && m.A.locals;
                var k = o(5915),
                    E = o(5712),
                    C = o(7767),
                    A = o(6115),
                    b = o(1147),
                    x = o(5979),
                    v = o(8027),
                    S = o(4848);
                const T = function (e) {
                    let { isPowerOn: t, onTogglePower: o } = e;
                    const i = 'function' == typeof o ? o : () => {};
                    let r = t ? '#dd00ac' : '#82160a';
                    return (0, S.jsxs)(k.s, { w: 'full', height: '60px', justifyContent: 'space-between', alignItems: 'center', px: 1, children: [(0, S.jsx)(b._, { src: '/icons/logo.png', alt: 'Captcha logo', height: '35px' }), (0, S.jsx)(x.$, { borderRadius: '100%', p: 0, onClick: i, bg: 'rgba(0,0,0,0)', _hover: { bg: 'rgba(0,0,0,0.1)' }, children: (0, S.jsx)(v.e9S, { fill: r, width: '48px', height: '48px', style: { transform: t ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease-in-out' } }) })] });
                };
                var j = o(7500),
                    O = o(5599),
                    P = o(8070);
                class _ {
                    static #e = (() => ('undefined' != typeof browser ? browser.storage.local : chrome.storage.local))();
                    static #t = (() => ('undefined' != typeof browser ? browser.runtime : chrome.runtime))();
                    static async get(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        console.debug(`[BrowserStorageHelper] Getting key: ${e}`);
                        try {
                            return await new Promise((o, i) => {
                                this.#e.get(e, (r) => {
                                    this.#t.lastError ? (console.error(`[BrowserStorageHelper] Error getting key "${e}": ${this.#t.lastError.message}`), i(new Error(`Error getting key "${e}": ${this.#t.lastError.message}`))) : (console.debug(`[BrowserStorageHelper] Retrieved key "${e}":`, r[e]), o(void 0 !== r[e] ? r[e] : t));
                                });
                            });
                        } catch (t) {
                            throw (console.error(`[BrowserStorageHelper] Error in get "${e}":`, t), t);
                        }
                    }
                    static async set(e, t) {
                        console.debug(`[BrowserStorageHelper] Setting key: ${e}, value:`, t);
                        try {
                            await new Promise((o, i) => {
                                this.#e.set({ [e]: t }, () => {
                                    this.#t.lastError ? (console.error(`[BrowserStorageHelper] Error setting key "${e}": ${this.#t.lastError.message}`), i(new Error(`Error setting key "${e}": ${this.#t.lastError.message}`))) : (console.debug(`[BrowserStorageHelper] Successfully set key "${e}"`), o());
                                });
                            });
                        } catch (t) {
                            throw (console.error(`[BrowserStorageHelper] Error in set "${e}":`, t), t);
                        }
                    }
                    static async remove(e) {
                        console.debug(`[BrowserStorageHelper] Removing key: ${e}`);
                        try {
                            await new Promise((t, o) => {
                                this.#e.remove(e, () => {
                                    this.#t.lastError ? (console.error(`[BrowserStorageHelper] Error removing key "${e}": ${this.#t.lastError.message}`), o(new Error(`Error removing key "${e}": ${this.#t.lastError.message}`))) : (console.debug(`[BrowserStorageHelper] Successfully removed key "${e}"`), t());
                                });
                            });
                        } catch (t) {
                            throw (console.error(`[BrowserStorageHelper] Error in remove "${e}":`, t), t);
                        }
                    }
                    static async clear() {
                        console.debug('[BrowserStorageHelper] Clearing all storage');
                        try {
                            await new Promise((e, t) => {
                                this.#e.clear(() => {
                                    this.#t.lastError ? (console.error(`[BrowserStorageHelper] Error clearing storage: ${this.#t.lastError.message}`), t(new Error(`Error clearing storage: ${this.#t.lastError.message}`))) : (console.debug('[BrowserStorageHelper] Successfully cleared storage'), e());
                                });
                            });
                        } catch (e) {
                            throw (console.error('[BrowserStorageHelper] Error in clear:', e), e);
                        }
                    }
                    static async getRuntimeURL(e) {
                        console.debug(`[BrowserStorageHelper] Getting runtime URL for: ${e}`);
                        try {
                            if (!this.#t) throw new Error('Runtime API not available');
                            const t = this.#t.getURL(e);
                            return (console.debug(`[BrowserStorageHelper] Runtime URL: ${t}`), t);
                        } catch (e) {
                            throw (console.error('[BrowserStorageHelper] Error in getRuntimeURL:', e), e);
                        }
                    }
                }
                const L = _,
                    $ = { API_KEY: { key: 'api_key', defaultValue: '' }, POWER_ON: { key: 'power_on', defaultValue: !0 }, TIKTOK: { key: 'tiktok', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, FUNCAPTCHA: { key: 'funcaptcha', defaultValue: { delayClick: 100, loop: !0, isActive: !0, maxImageCaptcha: 25 } }, ZALO: { key: 'zalo', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, SHOPEE: { key: 'shopee', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } }, RECAPTCHAV2: { key: 'reCaptchav2', defaultValue: { delayClick: 500, loop: !0, isActive: !0, useToken: !1 } }, AMZN: { key: 'amzn', defaultValue: { delayClick: 100, loop: !0, isActive: !0 } }, GEETEST: { key: 'geetest', defaultValue: { delayClick: 500, delaySwipe: 15, loop: !0, isActive: !0 } }, SLIDE_ALL: { key: 'slide_all', defaultValue: { delaySwipe: 15, loop: !0, isActive: !0 } } },
                    H = { GET_BALANCE_URL: 'https://api.omocaptcha.com/v2/getBalance', CREATE_JOB_URL: 'https://api.omocaptcha.com/v2/createTask', GET_RESULT_URL: 'https://api.omocaptcha.com/v2/getTaskResult', REPORT_URL: 'https://api.omocaptcha.com/v2/report' },
                    I = (e) => {
                        const t = parseFloat(e);
                        return isNaN(t) ? '0.00000' : t.toFixed(5);
                    };
                const R = function (e) {
                    let { isPowerOn: t } = e;
                    const [o, r] = (0, i.useState)(''),
                        [s, n] = (0, i.useState)('0'),
                        [a, c] = (0, i.useState)('0'),
                        [l, h] = (0, i.useState)(''),
                        [g, d] = (0, i.useState)(!1),
                        u = (0, i.useRef)(null),
                        y = (0, A.d)(),
                        p = void 0 !== t && !t,
                        f = (0, i.useCallback)(async (e) => {
                            if (!e) return { error: !0, message: 'API Key is empty' };
                            try {
                                const t = await fetch(H.GET_BALANCE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }, body: JSON.stringify({ clientKey: e }) });
                                return await t.json();
                            } catch (e) {
                                return (console.error('[fetchUserBalance] Error:', e), { error: !0, message: 'Fetch failed' });
                            }
                        }, []),
                        m = (0, i.useCallback)(async () => {
                            try {
                                if (!$.API_KEY?.key) throw new Error('API_KEY configuration is missing');
                                const e = await L.get($.API_KEY.key);
                                if (!e || 'YOUR_CLIEN_KEY' === e) return;
                                (r(e), d(!0));
                                const t = await f(e);
                                0 === t.errorId ? (n(t.balance ?? '0'), c(t.quantity ?? '0'), h(t.package_name ?? '')) : (n('0'), c('0'), h(''));
                            } catch (e) {
                                (console.error('[fetchApiKey] Error:', e), n('0'), c('0'), h(''), await L.set($.API_KEY.key, ''), y({ title: 'Error', description: 'Invalid API key', status: 'error', duration: 3e3, isClosable: !0 }));
                            } finally {
                                d(!1);
                            }
                        }, [f, y]);
                    (0, i.useEffect)(
                        () => (
                            m(),
                            () => {
                                u.current && clearTimeout(u.current);
                            }
                        ),
                        [m]
                    );
                    let w = t ? '#dd00ac' : '#82160a';
                    return (0, S.jsxs)(k.s, {
                        flexDirection: 'column',
                        gap: 1,
                        style: p ? { opacity: 0.5, pointerEvents: 'none' } : {},
                        justifyContent: 'flex-start',
                        mb: 2,
                        children: [
                            (0, S.jsxs)(k.s, { className: 'key-manager', justifyContent: 'space-between', children: [(0, S.jsx)(j.E, { fontSize: 14, fontWeight: 'semibold', children: 'Your balance' }), (0, S.jsx)(k.s, { alignItems: 'center', children: g ? (0, S.jsx)(O.y, { size: 'sm', color: w }) : (0, S.jsx)(j.E, { color: w, fontWeight: 'semibold', fontSize: 14, children: I(s) }) })] }),
                            (0, S.jsxs)(k.s, { className: 'key-manager', justifyContent: 'space-between', children: [(0, S.jsx)(j.E, { fontSize: 14, fontWeight: 'semibold', children: 'Your quantity' }), (0, S.jsx)(k.s, { alignItems: 'center', children: g ? (0, S.jsx)(O.y, { size: 'sm', color: w }) : (0, S.jsx)(j.E, { color: w, fontWeight: 'semibold', fontSize: 14, children: a }) })] }),
                            (0, S.jsxs)(k.s, { className: 'key-manager', justifyContent: 'space-between', children: [(0, S.jsx)(j.E, { fontSize: 14, fontWeight: 'semibold', children: 'Combo name' }), (0, S.jsx)(k.s, { alignItems: 'center', children: g ? (0, S.jsx)(O.y, { size: 'sm', color: w }) : (0, S.jsx)(j.E, { color: w, fontWeight: 'semibold', fontSize: 14, children: l }) })] }),
                            (0, S.jsx)(E.c, { mb: 1 }),
                            (0, S.jsxs)(k.s, {
                                flexDirection: 'column',
                                borderY: '1px dotted gray.dark',
                                gap: 1,
                                children: [
                                    (0, S.jsx)(j.E, { fontSize: 14, fontWeight: 'semibold', children: 'Your client key' }),
                                    (0, S.jsx)(P.p, {
                                        placeholder: 'Enter your client key here',
                                        fontSize: '14px',
                                        color: 'white',
                                        value: o,
                                        onChange: (e) => {
                                            const t = e.target.value;
                                            (r(t),
                                                u.current && clearTimeout(u.current),
                                                (u.current = setTimeout(async () => {
                                                    try {
                                                        if (!$.API_KEY?.key) throw new Error('API_KEY configuration is missing');
                                                        (await L.set($.API_KEY.key, t), m());
                                                    } catch (e) {
                                                        (console.error('[handleApiKeyChange] Error:', e), y({ title: 'Error', description: 'Failed to save API key', status: 'error', duration: 3e3, isClosable: !0 }));
                                                    }
                                                }, 1e3)));
                                        }
                                    })
                                ]
                            })
                        ]
                    });
                };
                var N = o(6272),
                    F = o(356),
                    D = o(9879);
                const z = function (e) {
                    let { isPowerOn: t } = e;
                    const o = (0, C.Zp)(),
                        [r, s] = (0, i.useState)([]),
                        n = (0, A.d)(),
                        a = void 0 !== t && !t;
                    return (
                        (0, i.useEffect)(() => {
                            (async () => {
                                try {
                                    if (!($.TIKTOK?.key && $.FUNCAPTCHA?.key && $.ZALO?.key && $.SHOPEE?.key && $.RECAPTCHAV2?.key && $.AMZN?.key && $.GEETEST?.key && $.SLIDE_ALL?.key)) throw new Error('CAPTCHA configuration is missing');
                                    const e = await L.get($.TIKTOK.key, $.TIKTOK.defaultValue);
                                    console.log('tikTokActive', e);
                                    const t = await L.get($.FUNCAPTCHA.key, $.FUNCAPTCHA.defaultValue);
                                    console.log('funCaptchaActive', t);
                                    const o = await L.get($.ZALO.key, $.ZALO.defaultValue);
                                    console.log('zaloActive', o);
                                    const i = await L.get($.SHOPEE.key, $.SHOPEE.defaultValue);
                                    console.log('shopeeActive', i);
                                    const r = await L.get($.RECAPTCHAV2.key, $.RECAPTCHAV2.defaultValue);
                                    console.log('reCaptchav2Active', r);
                                    const n = await L.get($.AMZN.key, $.AMZN.defaultValue);
                                    console.log('amznActive', n);
                                    const a = await L.get($.GEETEST.key, $.GEETEST.defaultValue);
                                    console.log('geetestActive', a);
                                    const c = await L.get($.SLIDE_ALL.key, $.SLIDE_ALL.defaultValue);
                                    (console.log('slideAllActive', c),
                                        s([
                                            { id: 1, domain: 'Tiktok', name: 'Tiktok', img: '/icons/Tiktok/logo.png', isActive: e.isActive },
                                            { id: 2, domain: 'FunCaptcha', name: 'FunCaptcha Image', img: '/icons/FunCaptcha/logo.png', isActive: t.isActive },
                                            { id: 3, domain: 'Zalo', name: 'Zalo', img: '/icons/Zalo/logo.png', isActive: o.isActive },
                                            { id: 4, domain: 'Shopee', name: 'Shopee', img: '/icons/Shopee/logo.png', isActive: i.isActive },
                                            { id: 5, domain: 'reCaptchav2', name: 'reCaptcha-v2', img: '/icons/reCaptchav2/logo.png', isActive: r.isActive },
                                            { id: 6, domain: 'Amzn', name: 'Amzn', img: '/icons/Amzn/logo.png', isActive: n.isActive },
                                            { id: 7, domain: 'Geetest', name: 'Geetest', img: '/icons/Geetest/logo.png', isActive: a.isActive },
                                            { id: 8, domain: 'SlideAll', name: 'SlideAll', img: '/icons/SlideAll/icon128.png', isActive: c.isActive }
                                        ]));
                                } catch (e) {
                                    (console.error('[initializeCaptchas] Error:', e), n({ title: 'Error', description: 'Failed to load CAPTCHA configurations', status: 'error', duration: 3e3, isClosable: !0 }));
                                }
                            })();
                        }, [n]),
                        (0, S.jsxs)(k.s, {
                            flexDirection: 'column',
                            gap: 4,
                            style: a ? { opacity: 0.5, pointerEvents: 'none' } : {},
                            mt: 2,
                            children: [
                                (0, S.jsx)(j.E, { textAlign: 'start', fontSize: 14, fontWeight: 'semibold', children: 'Available Captchas' }),
                                (0, S.jsx)(k.s, {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    maxHeight: '100vh',
                                    overflowY: 'auto',
                                    children:
                                        r?.length > 0
                                            ? r.map((e) => {
                                                  const t = e?.id > 8;
                                                  return (0, S.jsxs)(
                                                      N.m,
                                                      {
                                                          children: [
                                                              (0, S.jsxs)(k.s, {
                                                                  justifyContent: 'space-between',
                                                                  children: [
                                                                      (0, S.jsx)(k.s, { flex: 9, gap: 1, justifyContent: 'space-between', alignItems: 'center', _hover: { opacity: t ? 1 : 0.7 }, cursor: t ? 'not-allowed' : 'pointer', onClick: () => !t && o(`/captcha/${e.domain}`), children: (0, S.jsxs)(k.s, { gap: 2, alignItems: 'center', children: [(0, S.jsx)(b._, { src: e?.img, width: '24px', alt: `${e?.name} logo` }), (0, S.jsx)(j.E, { children: e?.name })] }) }),
                                                                      (0, S.jsxs)(k.s, {
                                                                          gap: 2,
                                                                          alignItems: 'center',
                                                                          flex: 1,
                                                                          children: [
                                                                              (0, S.jsx)(F.d, {
                                                                                  size: 'md',
                                                                                  isChecked: e?.isActive,
                                                                                  onChange: (t) =>
                                                                                      (async (e, t) => {
                                                                                          const o = r.map((e) => (e?.id === t ? { ...e, isActive: !e?.isActive } : e));
                                                                                          s(o);
                                                                                          const i = o.find((e) => e.id === t);
                                                                                          if (i) {
                                                                                              const e = i.isActive;
                                                                                              console.log('domain', i);
                                                                                              try {
                                                                                                  switch (i.domain) {
                                                                                                      case 'Tiktok':
                                                                                                          if (!$.TIKTOK?.key) throw new Error('TIKTOK configuration is missing');
                                                                                                          const t = await L.get($.TIKTOK.key);
                                                                                                          await L.set($.TIKTOK.key, { ...t, isActive: e });
                                                                                                          break;
                                                                                                      case 'FunCaptcha':
                                                                                                          if (!$.FUNCAPTCHA?.key) throw new Error('FUNCAPTCHA configuration is missing');
                                                                                                          const o = await L.get($.FUNCAPTCHA.key);
                                                                                                          await L.set($.FUNCAPTCHA.key, { ...o, isActive: e });
                                                                                                          break;
                                                                                                      case 'Zalo':
                                                                                                          if (!$.ZALO?.key) throw new Error('ZALO configuration is missing');
                                                                                                          const i = await L.get($.ZALO.key);
                                                                                                          await L.set($.ZALO.key, { ...i, isActive: e });
                                                                                                          break;
                                                                                                      case 'Shopee':
                                                                                                          if (!$.SHOPEE?.key) throw new Error('SHOPEE configuration is missing');
                                                                                                          const r = await L.get($.SHOPEE.key);
                                                                                                          await L.set($.SHOPEE.key, { ...r, isActive: e });
                                                                                                          break;
                                                                                                      case 'reCaptchav2':
                                                                                                          if (!$.RECAPTCHAV2?.key) throw new Error('RECAPTCHAV2 configuration is missing');
                                                                                                          const s = await L.get($.RECAPTCHAV2.key);
                                                                                                          await L.set($.RECAPTCHAV2.key, { ...s, isActive: e });
                                                                                                          break;
                                                                                                      case 'Amzn':
                                                                                                          if (!$.AMZN?.key) throw new Error('AMZN configuration is missing');
                                                                                                          const n = await L.get($.AMZN.key);
                                                                                                          await L.set($.AMZN.key, { ...n, isActive: e });
                                                                                                          break;
                                                                                                      case 'Geetest':
                                                                                                          if (!$.GEETEST?.key) throw new Error('GEETEST configuration is missing');
                                                                                                          const a = await L.get($.GEETEST.key);
                                                                                                          await L.set($.GEETEST.key, { ...a, isActive: e });
                                                                                                          break;
                                                                                                      case 'SlideAll':
                                                                                                          if (!$.SLIDE_ALL?.key) throw new Error('SLIDE_ALL configuration is missing');
                                                                                                          const c = await L.get($.SLIDE_ALL.key);
                                                                                                          await L.set($.SLIDE_ALL.key, { ...c, isActive: e });
                                                                                                  }
                                                                                              } catch (e) {
                                                                                                  (console.error('[handleToggleActiveCaptcha] Error:', e), n({ title: 'Error', description: `Failed to update ${i.domain} configuration`, status: 'error', duration: 3e3, isClosable: !0 }));
                                                                                              }
                                                                                          }
                                                                                      })(0, e?.id),
                                                                                  _hover: { transform: t ? 'none' : 'scale(1.125)' },
                                                                                  isDisabled: t,
                                                                                  sx: { '.chakra-switch__track': { bg: t ? 'gray.500' : 'gray.400', _checked: { bg: 'linear-gradient(to right, #dd00ac, #8328bf)' }, borderRadius: 'full' }, '.chakra-switch__thumb': { bg: 'gray.100', borderRadius: '50%' } }
                                                                              }),
                                                                              (0, S.jsx)(D.oLC, { _hover: { opacity: t ? 1 : 0.7 }, cursor: t ? 'not-allowed' : 'pointer', onClick: () => !t && o(`/captcha/${e.domain}`) })
                                                                          ]
                                                                      })
                                                                  ]
                                                              }),
                                                              (0, S.jsx)(E.c, { my: 2 })
                                                          ]
                                                      },
                                                      `captcha-${e?.id}`
                                                  );
                                              })
                                            : (0, S.jsx)(j.E, { children: 'No captchas available' })
                                })
                            ]
                        })
                    );
                };
                const K = function () {
                    const [e, t] = (0, i.useState)(!1),
                        o = (0, A.d)();
                    return (
                        (0, i.useEffect)(() => {
                            (async () => {
                                try {
                                    if (!$.POWER_ON?.key) throw new Error('POWER_ON configuration is missing');
                                    const e = await L.get($.POWER_ON.key, $.POWER_ON.defaultValue);
                                    t(!!e);
                                } catch (e) {
                                    (console.error('[HomePage] Error initializing power state:', e), o({ title: 'Error', description: 'Failed to load power state', status: 'error', duration: 3e3, isClosable: !0 }));
                                }
                            })();
                        }, [o]),
                        (0, S.jsxs)(k.s, {
                            w: 'full',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            children: [
                                (0, S.jsx)(T, {
                                    isPowerOn: e,
                                    onTogglePower: async () => {
                                        const i = !e;
                                        t(i);
                                        try {
                                            if (!$.POWER_ON?.key) throw new Error('POWER_ON configuration is missing');
                                            await L.set($.POWER_ON.key, i);
                                        } catch (e) {
                                            (console.error('[HomePage] Error updating power state:', e), o({ title: 'Error', description: 'Failed to update power state', status: 'error', duration: 3e3, isClosable: !0 }));
                                        }
                                    }
                                }),
                                (0, S.jsx)(E.c, { mb: 2 }),
                                (0, S.jsx)(R, { isPowerOn: e }),
                                (0, S.jsx)(E.c, {}),
                                (0, S.jsx)(z, { isPowerOn: e })
                            ]
                        })
                    );
                };
                var Z = o(763),
                    V = o(5399),
                    M = o(4976);
                const U = function (e) {
                    let { _captcha: t } = e;
                    const o = t && 'object' == typeof t ? t : { domain: 'Unknown', img: '' };
                    return (0, S.jsxs)(k.s, { alignItems: 'center', justifyContent: 'space-between', px: 1, height: '60px', children: [(0, S.jsx)(x.$, { p: 0, borderRadius: '100%', as: M.N_, to: '/', bg: 'rgba(0,0,0,0)', _hover: { bg: 'rgba(0,0,0,0.1)' }, children: (0, S.jsx)(V.xrT, { size: '24px' }) }), (0, S.jsx)(j.E, { fontSize: 20, fontWeight: 'bold', children: o.domain }), (0, S.jsx)(b._, { src: o.img || '/icons/placeholder.png', maxWidth: '48px', alt: o.domain })] });
                };
                var G = o(1351);
                const B = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 500), (this.delaySwipe = 15), (this.loop = !0), (this.img = '/icons/Tiktok/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.TIKTOK?.key) throw new Error('TIKTOK configuration key is missing');
                            const e = await L.get($.TIKTOK.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.delaySwipe && (this.delaySwipe = e.delaySwipe), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.TIKTOK.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[TikTokConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[TikTokConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.TIKTOK?.key) throw new Error('TIKTOK configuration key is missing');
                            return (await L.set($.TIKTOK.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[TikTokConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const W = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 100), (this.loop = !0), (this.img = '/icons/FunCaptcha/icon48.png'), (this.isActive = !0), (this.maxImageCaptcha = 25));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.FUNCAPTCHA?.key) throw new Error('FUNCAPTCHA configuration key is missing');
                            const e = await L.get($.FUNCAPTCHA.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.loop && (this.loop = e.loop), void 0 !== e.maxImageCaptcha && (this.maxImageCaptcha = e.maxImageCaptcha)) : await L.set($.FUNCAPTCHA.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[FunCaptchaConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[FunCaptchaConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.FUNCAPTCHA?.key) throw new Error('FUNCAPTCHA configuration key is missing');
                            return (await L.set($.FUNCAPTCHA.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[FunCaptchaConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const Y = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 500), (this.loop = !0), (this.img = '/icons/Zalo/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.ZALO?.key) throw new Error('ZALO configuration key is missing');
                            const e = await L.get($.ZALO.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.ZALO.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[ZaloConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[ZaloConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.ZALO?.key) throw new Error('ZALO configuration key is missing');
                            return (await L.set($.ZALO.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[ZaloConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const q = class {
                    constructor(e) {
                        ((this.domain = e), (this.delaySwipe = 15), (this.loop = !0), (this.img = '/icons/Shopee/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.SHOPEE?.key) throw new Error('SHOPEE configuration key is missing');
                            const e = await L.get($.SHOPEE.key);
                            return (e ? (void 0 !== e.delaySwipe && (this.delaySwipe = e.delaySwipe), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.SHOPEE.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[ShopeeConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[ShopeeConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.SHOPEE?.key) throw new Error('SHOPEE configuration key is missing');
                            return (await L.set($.SHOPEE.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[ShopeeConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const J = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 100), (this.loop = !0), (this.img = '/icons/reCaptchav2/icon48.png'), (this.isActive = !0), (this.useToken = !1));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.RECAPTCHAV2?.key) throw new Error('RECAPTCHAV2 configuration key is missing');
                            const e = await L.get($.RECAPTCHAV2.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.loop && (this.loop = e.loop), void 0 !== e.useToken && (this.useToken = e.useToken)) : await L.set($.RECAPTCHAV2.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[Recaptchav2Config] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[Recaptchav2Config] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.RECAPTCHAV2?.key) throw new Error('RECAPTCHAV2 configuration key is missing');
                            return (await L.set($.RECAPTCHAV2.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[Recaptchav2Config] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const X = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 500), (this.loop = !0), (this.img = '/icons/Amzn/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.AMZN?.key) throw new Error('AMZN configuration key is missing');
                            const e = await L.get($.AMZN.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.AMZN.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[AmznConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[AmznConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.AMZN?.key) throw new Error('AMZN configuration key is missing');
                            return (await L.set($.AMZN.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[AmznConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const Q = class {
                    constructor(e) {
                        ((this.domain = e), (this.delayClick = 500), (this.delaySwipe = 15), (this.loop = !0), (this.img = '/icons/Geetest/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.GEETEST?.key) throw new Error('GEETEST configuration key is missing');
                            const e = await L.get($.GEETEST.key);
                            return (e ? (void 0 !== e.delayClick && (this.delayClick = e.delayClick), void 0 !== e.delaySwipe && (this.delaySwipe = e.delaySwipe), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.GEETEST.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[GeetestConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[GeetestConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.GEETEST?.key) throw new Error('GEETEST configuration key is missing');
                            return (await L.set($.GEETEST.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[GeetestConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const ee = class {
                    constructor(e) {
                        ((this.domain = e), (this.delaySwipe = 15), (this.loop = !0), (this.img = '/icons/SlideAll/icon48.png'), (this.isActive = !0));
                    }
                    async syncDataFromLocalChrome() {
                        try {
                            if (!$.SLIDE_ALL?.key) throw new Error('SLIDE_ALL configuration key is missing');
                            const e = await L.get($.SLIDE_ALL.key);
                            return (e ? (void 0 !== e.delaySwipe && (this.delaySwipe = e.delaySwipe), void 0 !== e.loop && (this.loop = e.loop)) : await L.set($.SLIDE_ALL.key, { ...this }), this);
                        } catch (e) {
                            throw (console.error(`[SlideAllConfig] Error syncing data: ${e.message}`), e);
                        }
                    }
                    async updateAttribute(e, t) {
                        if (!this.hasOwnProperty(e)) return (console.warn(`[SlideAllConfig] Attribute ${e} does not exist`), this);
                        this[e] = t;
                        try {
                            if (!$.SLIDE_ALL?.key) throw new Error('SLIDE_ALL configuration key is missing');
                            return (await L.set($.SLIDE_ALL.key, { ...this }), this);
                        } catch (t) {
                            throw (console.error(`[SlideAllConfig] Error updating ${e}: ${t.message}`), t);
                        }
                    }
                };
                const te = new (class {
                    constructor() {
                        this.configs = {};
                    }
                    async addConfig(e) {
                        try {
                            if (!e?.domain) throw new Error('Config domain is missing');
                            (await e.syncDataFromLocalChrome(), (this.configs[e.domain] = e));
                        } catch (t) {
                            throw (console.error(`[IndexConfig] Error adding config for ${e?.domain || 'unknown'}: ${t.message}`), t);
                        }
                    }
                    getConfigByDomain(e) {
                        return this.configs[e] || null;
                    }
                    async updateConfig(e, t, o) {
                        const i = this.getConfigByDomain(e);
                        if (!i) return (console.warn(`[IndexConfig] Config for domain ${e} not found`), null);
                        try {
                            return (await i.updateAttribute(t, o), { ...this.configs[e] });
                        } catch (t) {
                            throw (console.error(`[IndexConfig] Error updating config for ${e}: ${t.message}`), t);
                        }
                    }
                })();
                (async () => {
                    try {
                        await Promise.all([te.addConfig(new B('Tiktok')), te.addConfig(new W('FunCaptcha')), te.addConfig(new Y('Zalo')), te.addConfig(new q('Shopee')), te.addConfig(new J('reCaptchav2')), te.addConfig(new X('Amzn')), te.addConfig(new Q('Geetest')), te.addConfig(new ee('SlideAll'))]);
                    } catch (e) {
                        console.error(`[CaptchaConfigManager] Error initializing configs: ${e.message}`);
                    }
                })();
                const oe = te;
                var ie = o(7613);
                const re = function () {
                    const { captchaDomain: e } = (0, C.g)(),
                        { colorMode: t } = (0, Z.G6)(),
                        [o, r] = (0, i.useState)({}),
                        s = (0, A.d)();
                    (0, i.useEffect)(() => {
                        const t = oe.getConfigByDomain(e);
                        t ? r(t) : (console.warn(`[CaptchaPage] No config found for domain: ${e}`), s({ title: 'Error', description: `No configuration found for ${e}`, status: 'error', duration: 3e3, isClosable: !0 }), r({}));
                    }, [e, s]);
                    const n = async (t, o) => {
                        try {
                            let i = o;
                            if ('delayClick' === t || 'delaySwipe' === t) {
                                if (((i = parseFloat(o)), isNaN(i) || i < 0)) throw new Error(`Invalid ${t} value`);
                            } else 'loop' === t && (i = o);
                            const s = await oe.updateConfig(e, t, i);
                            s && r(s);
                        } catch (e) {
                            (console.error(`[CaptchaPage] Error updating ${t}:`, e), s({ title: 'Error', description: `Failed to update ${t}`, status: 'error', duration: 3e3, isClosable: !0 }));
                        }
                    };
                    let a = 'linear-gradient(to right, #dd00ac, #8328bf)';
                    return (0, S.jsxs)(k.s, { w: 'full', className: 'captcha-page', flexDirection: 'column', justifyContent: 'flex-start', children: [(0, S.jsx)(U, { _captcha: o }), (0, S.jsx)(E.c, { mb: 2 }), void 0 !== o?.delayClick && (0, S.jsxs)(k.s, { w: 'full', className: 'delay-click-section', flexDirection: 'column', bg: 'light' === t ? '#F1F3F5' : 'rgba(63, 60, 120, 0.2)', pb: 2, borderRadius: 'lg', border: 'light' === t ? '1px solid #616060' : '1px solid #353535', mb: 1, children: [(0, S.jsxs)(k.s, { w: 'full', justifyContent: 'space-between', alignItems: 'center', p: 2, bg: 'light' === t ? '#CED4DA' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', children: [(0, S.jsxs)(k.s, { flex: 8, gap: 3, children: [(0, S.jsx)(G.efb, { fill: 'light' === t ? 'black' : 'white', size: '24px' }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', fontSize: 16, fontWeight: 'bold', children: 'Delay Click' })] }), (0, S.jsx)(P.p, { flex: 3, type: 'number', m: 1, color: 'light' === t ? 'black' : 'white', borderColor: 'light' === t ? 'gray' : 'white', _hover: { borderColor: 'light' === t ? 'black' : 'white' }, fontSize: 14, min: 0, value: o?.delayClick, onChange: (e) => n('delayClick', e.target.value) })] }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', py: 1, pl: 2, textAlign: 'start', fontStyle: 'italic', children: 'Time distance from two consecutive clicks in milliseconds.' })] }), void 0 !== o?.delaySwipe && (0, S.jsxs)(k.s, { w: 'full', className: 'delay-swipe-section', flexDirection: 'column', bg: 'light' === t ? '#F1F3F5' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', pb: 2, border: 'light' === t ? '1px solid #616060' : '1px solid #353535', mb: 1, children: [(0, S.jsxs)(k.s, { w: 'full', justifyContent: 'space-between', alignItems: 'center', p: 2, bg: 'light' === t ? '#CED4DA' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', children: [(0, S.jsxs)(k.s, { flex: 8, gap: 3, children: [(0, S.jsx)(ie.jG1, { fill: 'light' === t ? 'black' : 'white', size: '24px' }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', fontSize: 16, fontWeight: 'bold', children: 'Delay Swipe' })] }), (0, S.jsx)(P.p, { flex: 3, type: 'number', m: 1, color: 'light' === t ? 'black' : 'white', borderColor: 'light' === t ? 'gray' : 'white', _hover: { borderColor: 'light' === t ? 'black' : 'white' }, fontSize: 14, min: 0, value: o?.delaySwipe, onChange: (e) => n('delaySwipe', e.target.value) })] }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', py: 1, pl: 2, textAlign: 'start', fontStyle: 'italic', children: 'Time to swipe the object in milliseconds.' })] }), void 0 !== o?.loop && (0, S.jsxs)(k.s, { w: 'full', className: 'loop-section', flexDirection: 'column', bg: 'light' === t ? '#F1F3F5' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', pb: 2, border: 'light' === t ? '1px solid #616060' : '1px solid #353535', mb: 1, children: [(0, S.jsxs)(k.s, { w: 'full', justifyContent: 'space-between', alignItems: 'center', p: 2, bg: 'light' === t ? '#CED4DA' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', children: [(0, S.jsxs)(k.s, { flex: 8, gap: 3, children: [(0, S.jsx)(D.epd, { color: 'light' === t ? 'black' : 'white', size: '24px' }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', fontSize: 16, fontWeight: 'bold', children: 'Loop' })] }), (0, S.jsx)(F.d, { pr: 2, isChecked: o?.loop, onChange: () => n('loop', !o?.loop), sx: { '.chakra-switch__track': { bg: 'gray.400', _checked: { bg: a }, borderRadius: 'full' }, '.chakra-switch__thumb': { bg: 'gray.100', borderRadius: '50%' } } })] }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', py: 1, pl: 2, textAlign: 'start', fontStyle: 'italic', children: 'When loop is true, it will solve the CAPTCHA until it is solved successfully.' })] }), void 0 !== o?.useToken && (0, S.jsxs)(k.s, { w: 'full', className: 'loop-section', flexDirection: 'column', bg: 'light' === t ? '#F1F3F5' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', pb: 2, border: 'light' === t ? '1px solid #616060' : '1px solid #353535', mb: 1, children: [(0, S.jsxs)(k.s, { w: 'full', justifyContent: 'space-between', alignItems: 'center', p: 2, bg: 'light' === t ? '#CED4DA' : 'rgba(63, 60, 120, 0.2)', borderRadius: 'lg', children: [(0, S.jsxs)(k.s, { flex: 8, gap: 3, children: [(0, S.jsx)(v.pXu, { color: 'light' === t ? 'black' : 'white', size: '24px' }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', fontSize: 16, fontWeight: 'bold', children: 'Use Token' })] }), (0, S.jsx)(F.d, { pr: 2, isChecked: o?.useToken, onChange: () => n('useToken', !o?.useToken), sx: { '.chakra-switch__track': { bg: 'gray.400', _checked: { bg: a }, borderRadius: 'full' }, '.chakra-switch__thumb': { bg: 'gray.100', borderRadius: '50%' } } })] }), (0, S.jsx)(j.E, { color: 'light' === t ? 'black' : 'white', py: 1, pl: 2, textAlign: 'start', fontStyle: 'italic', children: "When useToken is true, it will solve the captcha using the website's data-sitekey." })] })] });
                };
                const se = function () {
                    return (0, S.jsxs)(C.BV, { children: [(0, S.jsx)(C.qh, { path: '/', element: (0, S.jsx)(K, {}) }), (0, S.jsx)(C.qh, { path: '/captcha/:captchaDomain', element: (0, S.jsx)(re, {}) }), (0, S.jsx)(C.qh, { path: '/*', element: (0, S.jsx)(C.C5, { to: '/' }) })] });
                };
                const ne = function () {
                    return (0, S.jsxs)(k.s, { justifyContent: 'center', alignItems: 'center', pt: 1, gap: 1, fontSize: 12, children: [(0, S.jsx)(j.E, { children: '©️ 2025 -' }), (0, S.jsx)(j.E, { as: 'a', href: 'https://omocaptcha.com/', target: '_blank', fontWeight: 'semibold', _hover: { color: 'blue.500' }, children: 'OMOcaptcha' })] });
                };
                const ae = function () {
                    return (0, S.jsxs)(k.s, { w: '100%', py: 2, px: 6, height: '100vh', className: 'App', flexDirection: 'column', justifyContent: 'space-between', children: [(0, S.jsx)(se, {}), (0, S.jsxs)(k.s, { flexDirection: 'column', justifyContent: 'center', children: [(0, S.jsx)(E.c, {}), (0, S.jsx)(ne, {})] })] });
                };
                var ce = o(4370),
                    le = o(319),
                    he = o(3048);
                let ge;
                ge = { global: (e) => ({ body: { color: (0, he.M)('black', 'white')(e), bg: (0, he.M)('gray.100', 'linear-gradient(to bottom right, #252350 0%, #0f1021 80%)')(e) } }) };
                const de = { config: { initialColorMode: 'dark', useSystemColorMode: !1 }, styles: ge, colors: { gray: { superlight: '#8e8e8e', light: '#616161', medium: '#494949', dark: '#1e1e1e' } } };
                if (!de) throw (console.error('[index.js] themeConfig is missing'), new Error('themeConfig is missing'));
                const ue = (0, ce.oY)({ ...de, config: { ...de.config, initialColorMode: 'dark', useSystemColorMode: !1 } }),
                    ye = document.getElementById('react-firefox-app');
                if (!ye) throw (console.error('[index.js] Root element not found'), new Error('Root element not found'));
                const pe = document.createElement('style');
                ((pe.innerHTML = "\n  body {\n    margin: 0;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n      sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  #react-firefox-app {\n    width: 360px;\n    height: 500px;\n    overflow: auto;\n  }\n\n  code {\n    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n      monospace;\n  }\n\n  #react-firefox-app::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  #react-firefox-app::-webkit-scrollbar-track {\n    background-color: #3f3f3f;\n  }\n\n  #react-firefox-app::-webkit-scrollbar-thumb {\n    background-color: #888;\n  }\n"), document.body.appendChild(pe));
                r.createRoot(ye).render((0, S.jsx)(le.s, { theme: ue, children: (0, S.jsx)(C.fS, { children: (0, S.jsx)(ae, {}) }) }));
            },
            7589: (e, t, o) => {
                o.d(t, { A: () => a });
                var i = o(1601),
                    r = o.n(i),
                    s = o(6314),
                    n = o.n(s)()(r());
                n.push([e.id, '.App {\n  text-align: center;\n}', '']);
                const a = n;
            }
        },
        r = {};
    function s(e) {
        var t = r[e];
        if (void 0 !== t) return t.exports;
        var o = (r[e] = { id: e, loaded: !1, exports: {} });
        return (i[e](o, o.exports, s), (o.loaded = !0), o.exports);
    }
    ((s.m = i),
        (e = []),
        (s.O = (t, o, i, r) => {
            if (!o) {
                var n = 1 / 0;
                for (h = 0; h < e.length; h++) {
                    ((o = e[h][0]), (i = e[h][1]), (r = e[h][2]));
                    for (var a = !0, c = 0; c < o.length; c++) (!1 & r || n >= r) && Object.keys(s.O).every((e) => s.O[e](o[c])) ? o.splice(c--, 1) : ((a = !1), r < n && (n = r));
                    if (a) {
                        e.splice(h--, 1);
                        var l = i();
                        void 0 !== l && (t = l);
                    }
                }
                return t;
            }
            r = r || 0;
            for (var h = e.length; h > 0 && e[h - 1][2] > r; h--) e[h] = e[h - 1];
            e[h] = [o, i, r];
        }),
        (s.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return (s.d(t, { a: t }), t);
        }),
        (o = Object.getPrototypeOf ? (e) => Object.getPrototypeOf(e) : (e) => e.__proto__),
        (s.t = function (e, i) {
            if ((1 & i && (e = this(e)), 8 & i)) return e;
            if ('object' == typeof e && e) {
                if (4 & i && e.__esModule) return e;
                if (16 & i && 'function' == typeof e.then) return e;
            }
            var r = Object.create(null);
            s.r(r);
            var n = {};
            t = t || [null, o({}), o([]), o(o)];
            for (var a = 2 & i && e; 'object' == typeof a && !~t.indexOf(a); a = o(a)) Object.getOwnPropertyNames(a).forEach((t) => (n[t] = () => e[t]));
            return ((n.default = () => e), s.d(r, n), r);
        }),
        (s.d = (e, t) => {
            for (var o in t) s.o(t, o) && !s.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
        }),
        (s.g = (function () {
            if ('object' == typeof globalThis) return globalThis;
            try {
                return this || new Function('return this')();
            } catch (e) {
                if ('object' == typeof window) return window;
            }
        })()),
        (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (s.r = (e) => {
            ('undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 }));
        }),
        (s.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
        (() => {
            var e = { 887: 0 };
            s.O.j = (t) => 0 === e[t];
            var t = (t, o) => {
                    var i,
                        r,
                        n = o[0],
                        a = o[1],
                        c = o[2],
                        l = 0;
                    if (n.some((t) => 0 !== e[t])) {
                        for (i in a) s.o(a, i) && (s.m[i] = a[i]);
                        if (c) var h = c(s);
                    }
                    for (t && t(o); l < n.length; l++) ((r = n[l]), s.o(e, r) && e[r] && e[r][0](), (e[r] = 0));
                    return s.O(h);
                },
                o = (self.webpackChunkomo_captcha = self.webpackChunkomo_captcha || []);
            (o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o))));
        })(),
        (s.nc = void 0));
    var n = s.O(void 0, [459], () => s(4038));
    n = s.O(n);
})();
