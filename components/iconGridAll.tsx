import { Grid } from '@mui/material';
import VillagerIcon from './villagerIcon';
import { NAMES } from '@/lib/constants';
import { memo } from 'react';

function IconGridAll() {
  return (
    <Grid container spacing={0.5} paddingY={0.5}>
      {NAMES.map((villager) => (
        <Grid key={villager} item>
          <VillagerIcon villager={villager} />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(IconGridAll);
