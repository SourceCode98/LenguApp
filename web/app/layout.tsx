import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/Providers';
import { TopBar } from '@/components/TopBar';
import { AccessGate } from '@/components/AccessGate';
import './globals.css';
import '@/styles/host.css';
import '@/styles/scenes-2d.css';
import '@/styles/games.css';
import '@/styles/scenes-lengua.css';
import '@/styles/games-lengua.css';
import '@/styles/activities.css';
import '@/styles/sketch.css';

export const metadata: Metadata = {
  title: 'LenguApp',
  description: 'Plataforma de Español y Lengua Castellana para colegios de Colombia, grados 6° a 11°, alineada a los Estándares y DBA del MEN.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@500&family=Literata:opsz,wght@7..72,400;7..72,600&family=Kalam:wght@400;700&family=Patrick+Hand&display=swap" />
      </head>
      <body>
        {/* Filtro de trazo a mano: solo se aplica a pseudo-elementos de bordes, nunca al texto. */}
        <svg className="sk-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="sk-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <Providers>
          <TopBar />
          <main className="wrap"><AccessGate>{children}</AccessGate></main>
        </Providers>
      </body>
    </html>
  );
}
