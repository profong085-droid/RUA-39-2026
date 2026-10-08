import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn('Telegram Bot Token or Chat ID is missing in environment variables.');
      return NextResponse.json(
        { error: 'Telegram credentials missing or Chat ID not configured' },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const clientPath = body.page || '/';
    const referrer = body.referrer || 'Direct Visit';

    // Get client IP address
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '';
    
    // In local development, fetch public IP for accurate testing
    const isLocal = !ip || ip === '::1' || ip === '127.0.0.1' || ip === 'localhost';
    if (isLocal) {
      try {
        const ipifyRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
        if (ipifyRes.ok) {
          const ipifyData = await ipifyRes.json();
          ip = ipifyData.ip || '127.0.0.1 (Localhost)';
        } else {
          ip = '127.0.0.1 (Localhost)';
        }
      } catch {
        ip = '127.0.0.1 (Localhost)';
      }
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Fetch IP Location details (if not localhost)
    let locationInfo = 'Unknown Location';
    let isp = 'Unknown ISP';
    let lat = null;
    let lon = null;

    if (ip && !ip.includes('127.0.0.1') && ip !== 'Unknown') {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,lat,lon,isp`,
          { next: { revalidate: 3600 } }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            const locParts = [geoData.city, geoData.regionName, geoData.country].filter(Boolean);
            locationInfo = `${locParts.join(', ')} (${geoData.countryCode || ''})`;
            isp = geoData.isp || 'Unknown';
            if (geoData.lat && geoData.lon) {
              lat = geoData.lat;
              lon = geoData.lon;
            }
          }
        }
      } catch (e) {
        console.error('Geo lookup error:', e);
      }
    }

    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Phnom_Penh',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    const mapLinkHtml = lat && lon
      ? `🗺️ <b>ផែនទី (Maps):</b> <a href="https://www.google.com/maps?q=${lat},${lon}">ចុចទីនេះដើម្បីបើក Google Maps 📍</a>\n`
      : '';

    const message = `🔔 <b>អ្នកចូលទស្សនាវេបសាយថ្មី (New Visitor)</b>
━━━━━━━━━━━━━━━━━━
🌐 <b>IP Address:</b> <code>${ip}</code>
📍 <b>ទីតាំង:</b> ${locationInfo}
🏢 <b>ISP / ប្រព័ន្ធ:</b> ${isp}
${mapLinkHtml}🔗 <b>ទំព័រ:</b> <code>${clientPath}</code>
↩️ <b>ប្រភព:</b> ${referrer}
🕒 <b>ម៉ោង (Cambodia):</b> ${currentTime}
📱 <b>ឧបករណ៍ / Browser:</b>
<code>${userAgent.substring(0, 160)}</code>
━━━━━━━━━━━━━━━━━━`;

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: false,
      }),
    });

    const teleData = await telegramRes.json();

    if (!teleData.ok) {
      console.error('Telegram API error:', teleData);
      return NextResponse.json({ success: false, error: teleData.description }, { status: 500 });
    }

    // Also send native interactive Telegram Location Map pin if coordinates are available
    if (lat && lon) {
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            latitude: lat,
            longitude: lon,
          }),
        });
      } catch (mapErr) {
        console.error('Telegram sendLocation error:', mapErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track visitor error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
