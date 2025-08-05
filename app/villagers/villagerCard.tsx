'use client';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { dayOrDays, fixName } from '@/lib/functions';
import { History, NookipediaVillager } from '@/types';
import IconWithText from '@/components/iconWithText';
import { ScreenContext } from '@/lib/screenContext';
import { coustard } from '@/app/theme';
import CRIcon from '@/components/crIcon';
import Link from 'next/link';
import CustomImage from '@/components/customImage';

const lowElevation = 4;
const highElevation = 14;

export default function VillagerCard({
  history,
  villagerData,
}: {
  history: History;
  villagerData: NookipediaVillager;
}) {
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();
  const [elevation, setElevation] = useState(lowElevation);

  return (
    <Grid>
      <Link href={`/villagers/${fixName(history.name)}`} scroll={false}>
        <Paper
          elevation={elevation}
          sx={{
            background: theme.palette.success.light,
            position: 'relative',
            cursor: 'pointer',
          }}
          onMouseOver={() => {
            setElevation(highElevation);
          }}
          onMouseOut={() => {
            setElevation(lowElevation);
          }}
        >
          <Box width={mediumScreen ? '7rem' : '20rem'}>
            <Stack direction={mediumScreen ? 'column' : 'row'}>
              <Box
                position="relative"
                height={mediumScreen ? '7rem' : '10rem'}
                width={mediumScreen ? '7rem' : '20rem'}
                maxWidth={mediumScreen ? '100%' : '50%'}
                maxHeight="100%"
              >
                <CustomImage
                  src={villagerData.nh_details.photo_url}
                  alt={`${history.name} photo`}
                  title={history.name}
                  fill
                  blurColor={villagerData.title_color}
                />
              </Box>
              <Box padding={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant={mediumScreen ? 'subtitle2' : 'h6'}
                    fontFamily={coustard.style.fontFamily}
                  >
                    {history.name}
                  </Typography>
                  {history.currentResident ? <CRIcon /> : ''}
                </Stack>
                <IconWithText
                  Icon={ArrowForwardRoundedIcon}
                  text={history.startDateString}
                  screenBoolean={mediumScreen}
                />
                {history.photo ? (
                  <IconWithText
                    Icon={CameraAltRoundedIcon}
                    text={history.photoDateString}
                    screenBoolean={mediumScreen}
                  />
                ) : (
                  ''
                )}
                {!history.currentResident ? (
                  <IconWithText
                    Icon={ArrowBackRoundedIcon}
                    text={history.endDateString}
                    screenBoolean={mediumScreen}
                  />
                ) : (
                  ''
                )}
                <IconWithText
                  Icon={AccessTimeRoundedIcon}
                  text={dayOrDays(history.duration)}
                  screenBoolean={mediumScreen}
                />
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Link>
    </Grid>
  );
}
