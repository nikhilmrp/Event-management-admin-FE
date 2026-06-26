import { Outfit } from "next/font/google";
import "./globals.css";

import AuthGuard from "@/components/auth/AuthGuard";
import { ToastProvider } from "@/components/ui/toast";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { ConfigrationProvider } from "@/context/configrationContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
            <AuthGuard>
              <ConfigrationProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </ConfigrationProvider>
            </AuthGuard>
          </AuthProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
