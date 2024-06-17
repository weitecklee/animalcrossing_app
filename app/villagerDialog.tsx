'use client';

import CustomDialog from '@/components/customDialog';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import VillagerInfo from '@/app/villagers/[villager]/villagerInfo';
import { useContext } from 'react';
import { StateContext } from '@/lib/stateContext';

export default function VillagerDialog() {
  const router = useRouter();
  const { dialogActive, dialogVillager } = useContext(StateContext);

  return <CustomDialog
    open={dialogActive}
    onClose={() => {router.back();}}
    zIndex={1300}
  >
    <Grid
      container
      justifyContent='center'
      padding={4}
      spacing={4}
    >
      <VillagerInfo params={{villager: dialogVillager}}/>
    </Grid>
  </CustomDialog>
}