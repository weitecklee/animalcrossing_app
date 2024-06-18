'use client';

import CustomDialog from '@/components/customDialog';
import { useRouter } from 'next/navigation';
import StatBreakdown from '@/app/stats/[stat]/page';
import { DialogContent } from '@mui/material';

export default function StatDialog({ params }: { params: { stat: string } }) {
  const router = useRouter();

  return (
    <CustomDialog
      open={true}
      onClose={() => {
        router.back();
      }}
      zIndex={1200}
      maxWidth={false}
    >
      <DialogContent>
        <StatBreakdown params={params} />
      </DialogContent>
    </CustomDialog>
  );
}
