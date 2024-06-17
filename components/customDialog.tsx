import { Dialog } from '@mui/material';
import { useContext } from 'react';
import { CustomDialogProps } from '@/types';
import { ScreenContext } from '@/lib/screenContext';

export default function CustomDialog({zIndex, ...props}: CustomDialogProps) {

  const { smallScreen } = useContext(ScreenContext);

  return <Dialog
    {...props}
    maxWidth="xl"
    sx={{
      zIndex,
    }}
    PaperProps={{sx: smallScreen ? {
      maxWidth: "100%",
      mx: "16px",
    } : {}}}
  />
}