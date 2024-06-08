import { Grid, Typography } from '@mui/material';
import ErrorPNG from '../public/avatar19.png';
import Image from 'next/image';

export default function Custom404() {

  return <Grid
    container
    direction='column'
    alignItems='center'
    spacing={1}
  >
    <Grid item>
      <Typography variant='h5'>
        There doesn&#39;t seem to be anything here...
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