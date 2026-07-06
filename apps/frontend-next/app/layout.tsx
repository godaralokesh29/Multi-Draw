import type { Metadata } from "next";
import { Handjet } from "next/font/google";
import "./globals.css";

const handjet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duodle - Collaborative Whiteboarding",
  description: "Create beautiful hand-drawn style diagrams and collaborate with your team in real-time.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect fill='%232563eb' width='180' height='180' rx='40'/><path d='M60 120l30-60 30 60' stroke='white' stroke-width='4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${handjet.variable} font-(family-name:--font-handjet) antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
