import { Grid } from '@mui/material';
import VillagerInfo from './villagerInfo';
import { NAMES } from '@/lib/constants';
import { fixName } from '@/lib/functions';
import { use } from 'react';
import { VillagerParams } from '@/types';

export const dynamicParams = false;

export function generateStaticParams() {
  return NAMES.map((name) => ({ villager: fixName(name) }));
}

export default function VillagerPage({ params }: { params: VillagerParams }) {
  return (
    <Grid container justifyContent="center" spacing={4}>
      <VillagerInfo params={use(params)} />
    </Grid>
  );
}
