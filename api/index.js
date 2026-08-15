export default async function handler(req, res) {
    const BOT_TOKEN = '8863273546:AAHyrvzwZ0DSSbT2XHTdGWuirmjH1ktLcFw';
    
    const TELEGRAM_IPS = [
        '149.154.167.220',
        '149.154.167.99',
        '149.154.165.220',
        '149.154.164.220',
        '149.154.163.220',
        '149.154.162.220',
        '149.154.161.220',
        '149.154.160.220',
    ];
    
    const { method, url, body } = req;
    
    // تست IP ها
    if (url === '/api/index/test') {
        const results = [];
        for (const ip of TELEGRAM_IPS) {
            try {
                const response = await fetch(`https://${ip}/bot${BOT_TOKEN}/getMe`, {
                    headers: { 'Host': 'api.telegram.org' }
                });
                results.push({ ip, status: response.status, ok: response.ok });
            } catch (error) {
                results.push({ ip, error: error.message });
            }
        }
        res.json({ results });
        return;
    }
    
    // webhook
    if (url === '/api/index' && method === 'POST' && body && body.message) {
        const webhookUrl = 'https://mojsara.ir/wp-content/plugins/signal-tel/telegram/bot.php';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const responseBody = await response.text();
        res.status(response.status).send(responseBody);
        return;
    }
    
    // bot
    if (req.query && req.query.method) {
        const telegramMethod = req.query.method;
        
        for (const ip of TELEGRAM_IPS) {
            try {
                const telegramUrl = `https://${ip}/bot${BOT_TOKEN}/${telegramMethod}`;
                const response = await fetch(telegramUrl, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Host': 'api.telegram.org'
                    },
                    body: method === 'POST' ? JSON.stringify(body) : null
                });
                if (response.ok) {
                    const responseBody = await response.text();
                    res.status(response.status).send(responseBody);
                    return;
                }
            } catch (error) {
                continue;
            }
        }
        
        res.status(500).json({ ok: false, error: 'all ips failed' });
        return;
    }
    
    res.status(200).send('OK');
}
