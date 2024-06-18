import { Grid } from '@mui/material';
import VillagerInfo from './villagerInfo';

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
