import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/lib/theme";
import TopBar from "@/lib/topBar";
import { ScreenProvider } from "@/lib/screenContext";
import { Container, CssBaseline } from "@mui/material";
import { StateProvider } from "@/lib/stateContext";
import VillagerDialog from "@/lib/villagerDialog";
import { DataProvider } from "@/lib/dataContext";

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
            <DataProvider>
              <ScreenProvider>
                <StateProvider>
                  <CssBaseline />
                  <TopBar />
                  <VillagerDialog />
                  <Container maxWidth='xl' sx={{pt: 1}}>
                    {children}
                  </Container>
                </StateProvider>
              </ScreenProvider>
            </DataProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
