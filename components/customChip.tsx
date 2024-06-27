import { coustard } from '@/app/theme';
import { Chip, ChipProps } from '@mui/material';

export default function CustomChip(props: ChipProps) {
  return (
    <Chip
      {...props}
      color="secondary"
      sx={{ fontFamily: coustard.style.fontFamily }}
    />
  );
}
