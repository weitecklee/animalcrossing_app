import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/lib/theme";
import TopBar from "@/lib/topBar";
import { ScreenProvider } from "@/lib/screenContext";
import { Container, CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "My Animal Crossing Island",
  description: "Showcase of my Animal Crossing: New Horizons island and its villagers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ScreenProvider>
              <CssBaseline />
              <TopBar />
              <Container maxWidth='xl' sx={{pt: 1}}>
                {children}
              </Container>
            </ScreenProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
