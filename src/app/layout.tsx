// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import GSAPProvider from "@/components/providers/GSAPProvider";

export const metadata: Metadata = {
  title: "Oryzo Clone",
  description: "A creative 3D product website",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <GSAPProvider>
            {children}
          </GSAPProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}