import GoogleMailMerge from '#modules/google-mail-merge.js';
const config = {
    email: '',
    password: '',
    recoveryEmail: '',
    sheetLink: '',
    subject: 'test con mèo',
    body: '<h1>cặc cặc cặc</h1>'
};

const main = async () => {
    const mailMerge = new GoogleMailMerge(config);
    await mailMerge.init();
    await mailMerge.login();
    await mailMerge.startMailMerge(config.subject, config.body);
};

main();
