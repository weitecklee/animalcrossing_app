import { Grid } from '@mui/material';
import VillagerInfo from './villagerInfo';
import { NAMES } from '@/lib/constants';
import { fixName } from '@/lib/functions';

export const dynamicParams = false;

export function generateStaticParams() {
  return NAMES.map((name) => ({ villager: fixName(name) }));
}

export default function VillagerPage({
  params,
}: {
  params: { villager: string };
}) {
  return (
    <Grid container justifyContent="center" spacing={4}>
      <VillagerInfo params={params} />
    </Grid>
  );
}
