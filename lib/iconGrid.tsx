import { Grid } from '@mui/material';
import VillagerIcon from './villagerIcon';

export default function IconGrid({ villagers } : {
  villagers: string[],
}) {

  return (
    <Grid container spacing={0.5} paddingY={0.5}>
      {villagers!.map((villager) =>
        <Grid key={villager}
          item
        >
          <VillagerIcon
            villager={villager}
          />
        </Grid>
      )}
    </Grid>
  )

}