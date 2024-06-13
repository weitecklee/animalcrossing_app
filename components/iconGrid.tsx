import { Grid } from '@mui/material';
import VillagerIcon from './villagerIcon';
import { Trait } from '@/types';

export default function IconGrid({ traitData, villagers, customOnClick } : {
  traitData?:  Trait,
  villagers?: string[],
  customOnClick?: () => void,
}) {

  if (!!traitData) {
    return (
      <Grid container spacing={0.5} paddingY={0.5}>
        {traitData.villagers.map((villager) =>
          <Grid key={villager}
            item
          >
            <VillagerIcon
              villager={villager}
              customOnClick={customOnClick}
            />
          </Grid>
        )}
      </Grid>
    )
  }

  return (
    <Grid container spacing={0.5} paddingY={0.5}>
      {villagers!.map((villager) =>
        <Grid key={villager}
          item
        >
          <VillagerIcon
            villager={villager}
            customOnClick={customOnClick}
          />
        </Grid>
      )}
    </Grid>
  )

}