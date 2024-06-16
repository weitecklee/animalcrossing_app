'use client';

import CustomDialog from '@/components/customDialog';
import VillagerPage from '@/app/villagers/[villager]/page';
import { useRouter } from 'next/navigation';

export default function VillagerDialog({params}: {params: {villager: string}}) {
  const router = useRouter();

  return <CustomDialog
    open={true}
    onClose={() => {router.back()}}
    zIndex={1300}
    hideBackdrop
  >
    <VillagerPage params={params}/>
  </CustomDialog>
}