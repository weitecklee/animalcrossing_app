import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/app/theme";
import TopBar from "./topBar";
import { ScreenProvider } from "@/lib/screenContext";
import { Container, CssBaseline } from "@mui/material";
import { DataProvider } from "@/lib/dataContext";
import { StateProvider } from "@/lib/stateContext";

export const metadata: Metadata = {
  title: "My Animal Crossing Island",
  description: "Showcase of my Animal Crossing: New Horizons island and its villagers",
  metadataBase: new URL('https://myacisland.vercel.app/'),
};

export default function RootLayout({
  children,
  villagerDialog,
  statDialog
}: Readonly<{
  children: React.ReactNode;
  villagerDialog: React.ReactNode;
  statDialog: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DataProvider>
              <ScreenProvider>
                <StateProvider>
                  <CssBaseline />
                  <TopBar />
                  <Container maxWidth='xl' sx={{pt: 1, pb: 2}}>
                    {children}
                  </Container>
                  {villagerDialog}
                  {statDialog}
                </StateProvider>
              </ScreenProvider>
            </DataProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
