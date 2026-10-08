'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // Only track once per browser session to prevent spamming Telegram on every refresh
    try {
      const hasLogged = sessionStorage.getItem('rua_visitor_logged');
      if (hasLogged) return;

      const track = async () => {
        try {
          // Gather screen and client info
          const screenWidth = window.screen.width || window.innerWidth;
          const screenHeight = window.screen.height || window.innerHeight;
          const screen = `${screenWidth} × ${screenHeight}`;
          const language = navigator.language || navigator.userLanguage || 'Unknown';
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Phnom_Penh';
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

          // Network info if available
          const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const networkType = conn ? (conn.effectiveType || conn.type || '') : '';

          // Battery status if supported
          let battery = null;
          if (typeof navigator.getBattery === 'function') {
            try {
              const b = await navigator.getBattery();
              battery = {
                level: Math.round(b.level * 100),
                charging: b.charging,
              };
            } catch {
              // Ignore battery error
            }
          }

          await fetch('/api/track-visitor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              page: window.location.pathname,
              fullUrl: window.location.href,
              referrer: document.referrer || 'ចូលផ្ទាល់ (Direct Visit)',
              screen,
              language,
              timezone,
              isDarkMode,
              networkType,
              battery,
            }),
          });

          sessionStorage.setItem('rua_visitor_logged', 'true');
        } catch (err) {
          // Suppress error to avoid disrupting user experience
        }
      };

      track();
    } catch (e) {
      // Storage access might fail in some private browsing modes
    }
  }, []);

  return null;
}
