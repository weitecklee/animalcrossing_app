'use client';

import { Grid, Typography } from '@mui/material';
import ErrorPNG from '../public/avatar19.png';
import Image from 'next/image';

export default function Error({error}: {error: Error & {digest?: string}}) {

  console.log(error);

  return <Grid
    container
    direction='column'
    alignItems='center'
    spacing={1}
  >
    <Grid item>
      <Typography variant='h5'>
        Seems like something went wrong...
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
}