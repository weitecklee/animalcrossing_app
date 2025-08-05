'use client';

import CustomDialog from '@/components/customDialog';
import { useRouter } from 'next/navigation';
import { DialogContent } from '@mui/material';
import StatBreakdown from '@/app/stats/[stat]/statBreakdown';

type Params = Promise<{ stat: string }>;

export default function StatDialog({ params }: { params: Params }) {
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
