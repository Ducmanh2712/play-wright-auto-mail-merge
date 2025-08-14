import { chromium } from 'playwright';

/**
 * @typedef {Object} GoogleMailMergeConfig
 * @property {string} email - mail google
 * @property {string} password - pass mail
 * @property {string} recoveryEmail - mail khôi phục
 * @property {string} sheetLink - link sheet
 */

/**
 * @class GoogleMailMerge
 */
class GoogleMailMerge {
    /**
     * tạo mới instance browser
     * @param {GoogleMailMergeConfig} config - config object
     */
    constructor(config) {
        /**
         * config object
         * @type {GoogleMailMergeConfig}
         * @readonly
         */
        this.config = {
            email: config.email,
            password: config.password,
            recoveryEmail: config.recoveryEmail,
            sheetLink: config.sheetLink
        };

        /**
         * browser
         * @type {import('playwright').Browser|null}
         */
        this.browser = null;

        /**
         * context
         * @type {import('playwright').BrowserContext|null}
         */
        this.context = null;

        /**
         * page
         * @type {import('playwright').Page|null}
         */
        this.page = null;
    }

    /**
     * khởi tạo trình duyệt
     * @returns {Promise<void>}
     */
    async init() {
        this.browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            args: ['--lang=en-US', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-features=VizDisplayCompositor', '--accept-lang=en-US,en;q=0.9', '--force-device-scale-factor=1', '--disable-translate', '--disable-translate-script-url', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--disable-setuid-sandbox', '--disable-notifications', '--disable-extensions', '--disable-webrtc', '--disable-webrtc-encryption', '--disable-webrtc-hw-encoding', '--disable-webrtc-hw-decoding', '--disable-webrtc-multiple-routes', '--disable-webrtc-hide-local-ips-with-mdns', '--disable-webrtc-apm-downmix-capture-audio-method', '--disable-chrome-wide-echo-cancellation', '--disable-webrtc-allow-wgc-screen-capturer', '--disable-webrtc-allow-wgc-window-capturer', '--disable-webrtc-wgc-require-border', '--disable-webrtc-hw-vp8-encoding', '--disable-webrtc-hw-vp9-encoding', '--disable-rtc-smoothness-algorithm', '--disable-webrtc-stun-origin', '--enforce-webrtc-ip-permission-check', '--force-webrtc-ip-handling-policy=disable_non_proxied_udp', '--disable-media-stream', '--disable-getUserMedia-screen-capturing', '--disable-background-media-suspend', '--disable-ipc-flooding-protection', '--deny-permission-prompts', '--disable-permissions-api', '--disable-media-device-access', '--block-new-web-contents', '--disable-default-apps', '--disable-media-device-enumeration', '--disable-save-password-bubble', '--disable-features=PasswordLeakDetection,WebRTC,MediaDevices,GetUserMedia,RTCPeerConnection,RTCDataChannel', '--disable-webrtc-network-predictor', '--disable-webrtc-stun-probe-trial', '--disable-webrtc-use-pipewire', '--disable-webrtc-logs', '--disable-webrtc-event-logging', '--disable-webrtc-remote-event-log', '--disable-webrtc-apm-debug-dump', '--disable-webrtc-apm-in-audio-service']
        });

        this.context = await this.browser.newContext({
            locale: 'en-US',
            extraHTTPHeaders: {
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        this.page = await this.context.newPage();
    }

    /**
     * kiểm tra có phải lỗi browser security không
     * @returns {Promise<boolean>}
     */
    async #isSecurityError() {
        try {
            const securityText = this.page.getByText("This browser or app may not be secure");
            await securityText.waitFor({ state: 'visible', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * đăng nhập vào google
     * @returns {Promise<void>}
     */
    async login() {
        await this.page.goto('https://accounts.google.com/?hl=en', { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('domcontentloaded');

        const emailInput = this.page.getByRole('textbox', { name: 'Email or phone' }).first();
        await emailInput.waitFor({ state: 'visible' });
        await emailInput.fill(this.config.email);

        const nextButton = this.page.getByRole('button', { name: 'Next' }).first();
        await nextButton.waitFor({ state: 'visible' });
        await nextButton.click();

        try {
            const passwordInput = this.page.getByRole('textbox', { name: 'Enter your password' }).first();
            await passwordInput.waitFor({ state: 'visible' });
            await passwordInput.fill(this.config.password);

            const passwordNextButton = this.page.getByRole('button', { name: 'Next' }).first();
            await passwordNextButton.waitFor({ state: 'visible' });
            await passwordNextButton.click();

            await this.#handleVerification();
        } catch (error) {
            if (await this.#isSecurityError()) {
                await this.close();
                throw new Error('security error');
            }
            throw error;
        }
    }

    /**
     * điền email khôi phục
     * @returns {Promise<void>}
     */
    async #handleVerification() {
        try {
            await this.page.waitForURL(/myaccount\.google\.com/, { timeout: 5000 });
        } catch {
            try {
                const verifyHeading = this.page.getByRole('heading', { name: "Verify it's you" }).first();
                await verifyHeading.waitFor({ state: 'visible', timeout: 2000 });

                const recoveryEmailLink = this.page.getByRole('link', { name: 'Confirm your recovery email' }).first();
                await recoveryEmailLink.waitFor({ state: 'visible' });
                await recoveryEmailLink.click();

                const recoveryEmailInput = this.page.getByRole('textbox', { name: 'Enter recovery email address' }).first();
                await recoveryEmailInput.waitFor({ state: 'visible' });
                await recoveryEmailInput.fill(this.config.recoveryEmail);

                const recoveryNextButton = this.page.getByRole('button', { name: 'Next' }).first();
                await recoveryNextButton.waitFor({ state: 'visible' });
                await recoveryNextButton.click();

                await this.page.waitForURL(/myaccount\.google\.com/, { timeout: 5000 });
            } catch {
                //
            }
        }
    }

    /**
     * mở sheet link
     * @returns {Promise<void>}
     */
    async #openSheet() {
        const accountButton = this.page.getByRole('button', { name: /Google Account/ }).first();
        await accountButton.waitFor({ state: 'visible', timeout: 3000 });

        await this.page.goto(this.config.sheetLink, { waitUntil: 'load' });
    }


    /**
     * @param {string} subject - subject
     * @param {string} body - body mail
     * @returns {Promise<void>}
     */
    async #sendTemplateMail(subject, body) {
            try {
                const dialog = this.page.getByRole('dialog', { name: 'Mail Merge for Gmail' });
                await dialog.waitFor({ state: 'visible', timeout: 10000 });

                const iframeContent = this.page
                    .getByRole('dialog', { name: 'Mail Merge for Gmail' })
                    .locator('iframe')
                    .first()
                    .contentFrame()
                    .locator('#sandboxFrame')
                    .contentFrame()
                    .locator('#userHtmlFrame')
                    .contentFrame();

                const editBtn = iframeContent.getByRole('button', { name: 'Edit template' });
                await editBtn.waitFor({ state: 'visible', timeout: 10000 });
                await editBtn.click();

                const subjectInput = iframeContent
                    .locator('div')
                    .filter({ hasText: /^Email subject$/ })
                    .getByRole('textbox');
                await subjectInput.waitFor({ state: 'visible', timeout: 10000 });

                await subjectInput.fill(subject);

                const moreBtn = iframeContent.getByRole('button', { name: 'More...' });
                await moreBtn.waitFor({ state: 'visible', timeout: 5000 });
                await moreBtn.click();

                const sourceBtn = iframeContent.getByRole('button', { name: 'Source code' });
                await sourceBtn.waitFor({ state: 'visible', timeout: 5000 });
                await sourceBtn.click();

                const htmlTextarea = iframeContent.locator('textarea[type="text"]');
                await htmlTextarea.waitFor({ state: 'visible', timeout: 10000 });

                await htmlTextarea.fill(body);

                const saveBtn = iframeContent.getByTitle('Save');
                await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
                await saveBtn.click();

                const saveCloseBtn = iframeContent.getByRole('button', { name: 'Save and close' });
                await saveCloseBtn.waitFor({ state: 'visible', timeout: 10000 });

                await saveCloseBtn.click();

                const sendButton = iframeContent.getByRole('button', { name: /^Send \d+ emails$/ });
                await sendButton.waitFor({ state: 'visible', timeout: 10000 });
                await sendButton.click();
                try {
                    const campaignMessage = iframeContent.getByText(/Your campaign is on the way/);
                    await campaignMessage.waitFor({ state: 'visible', timeout: 20000 });
                } catch {
                    //
                }
            } catch {
                //
        }
    }

    /**
     * chạy gửi mail merge
     * @param {string} subject - subject
     * @param {string} body - body mail
     * @returns {Promise<void>}
     */
    async startMailMerge(subject, body) {
        await this.#openSheet();

        const MAX_RETRIES = 30;
        const CLICK_DELAY = 1000;

        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const extensionsMenu = this.page.getByRole('menuitem', { name: 'Extensions' }).first();
                await extensionsMenu.waitFor({ state: 'visible', timeout: 5000 });
                await extensionsMenu.click();

                const mailMergeMenu = this.page.getByRole('menuitem', { name: /Mail Merge for Gmail/ }).first();
                await mailMergeMenu.waitFor({ state: 'visible', timeout: 500 });
                await mailMergeMenu.click();

                const startButton = this.page.getByRole('menuitem', { name: /Start/ }).first();
                await startButton.waitFor({ state: 'visible', timeout: 500 });
                await startButton.click();

                break;
            } catch (error) {
                if (i === MAX_RETRIES - 1) {
                    throw error;
                }

                await this.page.keyboard.press('Escape');
                await this.page.waitForTimeout(CLICK_DELAY);
            }
        }

        await this.#sendTemplateMail(subject, body);
    }

    /**
     * đóng browser
     * @returns {Promise<void>}
     */
    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
export default GoogleMailMerge;
