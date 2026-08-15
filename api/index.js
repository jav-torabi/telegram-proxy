export default async function handler(req, res) {
    const BOT_TOKEN = '8863273546:AAHyrvzwZ0DSSbT2XHTdGWuirmjH1ktLcFw';
    const TELEGRAM_IP = '149.154.167.220';
    
    const { method, url, body } = req;
    
    if (url === '/webhook' && method === 'POST') {
        const webhookUrl = 'https://mojsara.ir/wp-content/plugins/signal-tel/telegram/bot.php';
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const responseBody = await response.text();
            res.status(response.status).send(responseBody);
        } catch (error) {
            res.status(500).json({ ok: false, error: error.message });
        }
        return;
    }
    
    if (url.startsWith('/bot')) {
        const telegramPath = url.replace('/bot', '');
        const telegramUrl = `https://${TELEGRAM_IP}/bot${BOT_TOKEN}${telegramPath}`;
        
        try {
            const response = await fetch(telegramUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Host': 'api.telegram.org'
                },
                body: method === 'POST' ? JSON.stringify(body) : null
            });
            const responseBody = await response.text();
            res.status(response.status).send(responseBody);
        } catch (error) {
            res.status(500).json({ ok: false, error: error.message });
        }
        return;
    }
    
    res.status(200).send('OK');
}
