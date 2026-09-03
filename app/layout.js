import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  metadataBase: new URL('https://rua-39.website'),
  title: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់៣៩ - RUA 2026',
  description: 'សៀវភៅអនុស្សាវរីយ៍៖ ចងក្រងស្នាមញញឹម រឿងរ៉ាវអតីតកាល និងមោទនភាពនៃនិស្សិតកសិកម្ម ជំនាន់ទី ៣៩ សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ឆ្នាំ 2026។ Royal University of Agriculture Class of 2026.',
  keywords: 'rua, សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម, ជំនាន់៣៩, 2026, កសិកម្ម, Agriculture, Royal University of Agriculture, កសិកម្មជំនាន់៣៩, បញ្ចប់ការសិក្សា, graduation, rua alumni, អតីតនិស្សិតកសិកម្ម, និស្សិតកសិកម្ម, សាកលវិទ្យាល័យ',
  openGraph: {
    title: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់៣៩ - RUA 2026',
    description: 'Celebrating 4 years of academic excellence at the Royal University of Agriculture (RUA)',
    url: 'https://rua-39.website',
    siteName: 'RUA Graduation 2026',
    images: [
      {
        url: '/photo/IMG_9298%20(3).JPG',
        width: 1200,
        height: 630,
        alt: 'RUA 39 Graduation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់៣៩ - RUA 2026',
    description: 'Celebrating 4 years of academic excellence at the Royal University of Agriculture (RUA)',
    images: ['/photo/IMG_9298%20(3).JPG'],
  },
  verification: {
    google: 'o1ZQ3lo6lA2J-GcaL-QK4BNEMNGVQbTB4jVPo1SgU2c',
  },
  icons: {
    icon: '/logo/rua2.png',
    shortcut: '/logo/rua2.png',
    apple: '/logo/rua2.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Royal University of Agriculture Class of 2026',
  alternateName: 'សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ជំនាន់ទី៣៩',
  url: 'https://rua-39.website',
  logo: 'https://rua-39.website/logo/rua2.png',
  description: 'សៀវភៅអនុស្សាវរីយ៍៖ ចងក្រងស្នាមញញឹម រឿងរ៉ាវអតីតកាល និងមោទនភាពនៃនិស្សិតកសិកម្ម ជំនាន់ទី ៣៩ សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម ឆ្នាំ 2026។'
};

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
