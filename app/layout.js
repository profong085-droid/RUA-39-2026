import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  metadataBase: new URL('https://rua-39.website'),
  title: 'RUA - ការបញ្ចប់ការសិក្សា ៤ ឆ្នាំ | Graduation 2026',
  description: 'វេបសាយ RUA សម្រាប់ប្រមូលផ្តុំការ ចងចាំ ៤ ឆ្នាំ នៃការបញ្ចប់ការសិក្សា | A celebration of 4 years of academic journey at RUA.',
  keywords: 'RUA, Graduation, 2026, Royal University of Agriculture, ការបញ្ចប់ការសិក្សា',
  openGraph: {
    title: 'RUA Graduation 2026',
    description: 'Celebrating 4 years of academic excellence',
    type: 'website',
  },
  verification: {
    google: 'o1ZQ3lo6lA2J-GcaL-QK4BNEMNGVQbTB4jVPo1SgU2c',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
