'use client';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Stack, Typography } from '@mui/material';
import { ScreenContext } from '@/lib/screenContext';
import IconWithText from '@/components/iconWithText';
import CRIcon from '@/components/crIcon';
import { useContext } from 'react';

export default function Legend() {

  const { mediumScreen } = useContext(ScreenContext);

  return <>
    <Stack direction="row" alignItems="center">
      <CRIcon />
      <Typography variant={mediumScreen ? 'caption' : 'body1'} component='span'>
        &ensp;Current Resident
      </Typography>
    </Stack>
    <IconWithText
      Icon={ArrowForwardRoundedIcon}
      text={'Move-in date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={CameraAltRoundedIcon}
      text={'Photo date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={ArrowBackRoundedIcon}
      text={'Move-out date'}
      screenBoolean={mediumScreen}
    />
    <IconWithText
      Icon={AccessTimeRoundedIcon}
      text={'Length of stay'}
      screenBoolean={mediumScreen}
    />
  </>
}