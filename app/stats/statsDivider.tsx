import { ChipProps, Divider } from '@mui/material';
import CustomChip from '@/components/customChip';

export default function StatsDivider(props: ChipProps) {
  return (
    <Divider sx={{ pt: 2, pb: 1 }}>
      <CustomChip {...props} />
    </Divider>
  );
}
