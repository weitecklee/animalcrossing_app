'use client';

import CustomDialog from '@/components/customDialog';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import VillagerInfo from '@/app/villagers/[villager]/villagerInfo';
import { useContext, useEffect } from 'react';
import { StateContext } from '@/lib/stateContext';

export default function VillagerDialog({params}: {params: {villager: string}}) {
  const router = useRouter();
  const { setDialogActive } = useContext(StateContext);

  useEffect(() => {
    setDialogActive(true);
    return () => {
      setDialogActive(false);
    }
  }, [setDialogActive]);

  return <CustomDialog
    open={true}
    onClose={() => {router.back();}}
    zIndex={1300}
    hideBackdrop
  >
    <Grid
      container
      justifyContent='center'
      padding={4}
      spacing={4}
    >
      <VillagerInfo params={params}/>
    </Grid>
  </CustomDialog>
}