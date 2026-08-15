export default async function handler(req, res) {
    const BOT_TOKEN = '8863273546:AAHyrvzwZ0DSSbT2XHTdGWuirmjH1ktLcFw';
    
    const { method, url, body } = req;
    
    // دریافت پیام از تلگرام (Webhook)
    if (url === '/api/index' && method === 'POST' && body && body.message) {
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
    
    // ارسال پیام به تلگرام
    if (req.query && req.query.method) {
        const telegramMethod = req.query.method;
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/${telegramMethod}`;
        
        try {
            const response = await fetch(telegramUrl, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
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
