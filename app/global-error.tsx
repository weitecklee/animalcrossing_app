'use client';

import { Grid, Typography } from '@mui/material';
import ErrorPNG from '../public/avatar19.png';
import Image from 'next/image';
import { ThemeProvider } from '@mui/material/styles';
import { ScreenProvider } from "@/lib/screenContext";
import { Container, CssBaseline } from "@mui/material";
import TopBar from "@/lib/topBar";
import { theme } from "@/lib/theme";

export default function Error({error}: {error: Error & {digest?: string}}) {

  console.log(error);

  return <html lang="en">
    <body>
      <ThemeProvider theme={theme}>
        <ScreenProvider>
            <CssBaseline />
            <TopBar />
            <Container maxWidth='xl' sx={{pt: 1}}>
            <Grid
              container
              direction='column'
              alignItems='center'
              spacing={1}
            >
              <Grid item>
                <Typography variant='h5'>
                  Seems like something went globally wrong...
                </Typography>
              </Grid>
              <Grid item>
                <Image
                  src={ErrorPNG}
                  alt="Confused"
                  priority
                  style={{
                    width: '90vw',
                    maxWidth: 309,
                    height: 'auto',
                  }}
                />
              </Grid>
            </Grid>
            </Container>
        </ScreenProvider>
      </ThemeProvider>
    </body>
  </html>


}