import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  metadataBase: new URL('https://rua-39.website'),
  title: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់៣៩ - RUA 2026',
  description: 'សៀវភៅអនុស្សាវរីយ៍៖ ចងក្រងស្នាមញញឹម រឿងរ៉ាវអតីតកាល និងមោទនភាពនៃនិស្សិតកសិកម្ម ជំនាន់ទី ៣៩ សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ឆ្នាំ 2026។ Royal University of Agriculture Class of 2026.',
  keywords: 'rua, សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម, ជំនាន់៣៩, 2026, កសិកម្ម, Agriculture, Royal University of Agriculture, កសិកកម្ម',
  openGraph: {
    title: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់៣៩ - RUA 2026',
    description: 'Celebrating 4 years of academic excellence at the Royal University of Agriculture (RUA)',
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
