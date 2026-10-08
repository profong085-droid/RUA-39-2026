'use client';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import VisitorTracker from '@/components/VisitorTracker/VisitorTracker';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <VisitorTracker />
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
}
