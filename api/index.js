export default async function handler(req, res) {
    const BOT_TOKEN = '8863273546:AAHyrvzwZ0DSSbT2XHTdGWuirmjH1ktLcFw';
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const data = await response.json();
        res.json({ ok: true, data });
    } catch (error) {
        res.json({ ok: false, error: error.message });
    }
}
