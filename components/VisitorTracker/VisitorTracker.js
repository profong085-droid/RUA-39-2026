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
          await fetch('/api/track-visitor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              page: window.location.pathname,
              referrer: document.referrer || 'Direct Visit',
            }),
          });
          sessionStorage.setItem('rua_visitor_logged', 'true');
        } catch (err) {
          // Suppress error in console to not disrupt user experience
        }
      };

      track();
    } catch (e) {
      // Storage access might fail in some restricted private modes
    }
  }, []);

  return null;
}
