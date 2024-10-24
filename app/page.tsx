import { Box, Grid, Link, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Image from 'next/image';
import AvatarPNG from '@/public/avatar13.png';
import Events from './events';

export default function Home() {
  return (
    <Grid
      container
      justifyContent="space-between"
      direction="row-reverse"
      spacing={1}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{ pt: 1, pb: 2, height: { xs: '33dvh', md: 'auto' } }}
      >
        <Events />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography>Hello there!</Typography>
        <Typography>
          This is a site I made to showcase my&nbsp;
          <Box component="span" sx={{ fontStyle: 'italic' }}>
            Animal Crossing: New Horizons
          </Box>
          &nbsp;island.
          <br />
          <br />
          You can find the following pages and information:
          <br />
          &emsp;&emsp;
          <Typography variant="boldSpan">Villagers</Typography>
          : all the villagers that have been on my island
          <br />
          &emsp;&emsp;
          <Typography variant="boldSpan">Timeline</Typography>
          : a timeline chart of the villagers&apos; stays
          <br />
          &emsp;&emsp;
          <Typography variant="boldSpan">Stats</Typography>
          : all sorts of fun stats
          <br />
          &emsp;&emsp;
          <Typography variant="boldSpan">Search</Typography>
          : find villagers by traits
          <br />
          &emsp;&emsp;
          <Typography variant="boldSpan">About</Typography>
          : info about the game and me
          <br />
          <br />
          Enjoy your visit!
        </Typography>
        <Box py={2}>
          <Image
            src={AvatarPNG}
            alt="My Villager"
            priority
            style={{
              width: '90vw',
              maxWidth: 376,
              height: 'auto',
            }}
          />
        </Box>
        <Typography variant="caption">
          Special thanks to:
          <br />
          &emsp;&emsp;
          <Link
            href="https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/"
            target="_blank"
            rel="noreferrer"
          >
            Nintendo
            <OpenInNewRoundedIcon fontSize="inherit" />
          </Link>
          &nbsp;for making the Animal Crossing video games
          <br />
          &emsp;&emsp;
          <Link href="https://nookipedia.com/" target="_blank" rel="noopener">
            Nookipedia
            <OpenInNewRoundedIcon fontSize="inherit" />
          </Link>
          &nbsp;for providing all the villager data and media
          <br />
          <br />
          Made by&nbsp;
          <Link
            href="https://github.com/weitecklee"
            target="_blank"
            rel="noreferrer"
          >
            weitecklee
            <OpenInNewRoundedIcon fontSize="inherit" />
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
