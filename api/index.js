export default async function handler(req, res) {
    const BOT_TOKEN = '8863273546:AAHyrvzwZ0DSSbT2XHTdGWuirmjH1ktLcFw';
    const TELEGRAM_IPS = ['149.154.167.220', '149.154.167.99', '149.154.165.220'];
    
    const { method, url, body } = req;
    
    // پاسخ ساده
    if (url === '/api/index' || url === '/api' || url === '/') {
        // تست IP ها
        const results = [];
        for (const ip of TELEGRAM_IPS) {
            try {
                const response = await fetch(`https://${ip}/bot${BOT_TOKEN}/getMe`, {
                    headers: { 'Host': 'api.telegram.org' }
                });
                results.push({ ip, ok: response.ok });
            } catch (error) {
                results.push({ ip, error: error.message });
            }
        }
        res.json({ results });
        return;
    }
    
    res.status(200).send('OK');
}
