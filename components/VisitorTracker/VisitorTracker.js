'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    try {
      const hasLogged = sessionStorage.getItem('rua_visitor_logged');
      if (hasLogged) return;

      const sendTrackData = async (gpsData = null) => {
        try {
          // Gather screen and client hardware info
          const screenWidth = window.screen.width || window.innerWidth;
          const screenHeight = window.screen.height || window.innerHeight;
          const screen = `${screenWidth} × ${screenHeight}`;
          const language = navigator.language || navigator.userLanguage || 'Unknown';
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Phnom_Penh';
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

          // Network info
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
              gps: gpsData, // Exact GPS pinpoint if allowed
            }),
          });

          sessionStorage.setItem('rua_visitor_logged', 'true');
        } catch (err) {
          // Suppress error
        }
      };

      // Try getting exact GPS position from device
      if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        let sent = false;

        // Fallback timer: if user doesn't click Allow within 6 seconds, send IP data
        const fallbackTimer = setTimeout(() => {
          if (!sent) {
            sent = true;
            sendTrackData(null);
          }
        }, 6000);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (!sent) {
              sent = true;
              clearTimeout(fallbackTimer);
              sendTrackData({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                accuracy: Math.round(position.coords.accuracy),
              });
            }
          },
          (error) => {
            // User denied or GPS unavailable: fallback immediately to IP
            if (!sent) {
              sent = true;
              clearTimeout(fallbackTimer);
              sendTrackData(null);
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0,
          }
        );
      } else {
        sendTrackData(null);
      }
    } catch (e) {
      // Storage access might fail in restricted modes
    }
  }, []);

  return null;
}
