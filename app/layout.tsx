import {NextIntlClientProvider, hasLocale} from 'next-intl';


import {getLocale} from 'next-intl/server';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ProModal } from "@/components/pro-modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golferee",
  description: "Votre assistant personnel sur le green.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
// Ensure that the incoming `locale` is valid
const locale = await getLocale;


  return (
    
    <ClerkProvider>
      <html lang="locale" suppressHydrationWarning>
      <NextIntlClientProvider>
        <body className={cn("bg-secondary", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
