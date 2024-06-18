import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { VillagerTooltipProps } from '@/types';
import { useContext } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Image from 'next/image';
import CRBadge from './crBadge';
import IconWithText from '@/components/iconWithText';
import { dayOrDays, rgbDataURL } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import { DataContext } from '@/lib/dataContext';
import { ScreenContext } from '@/lib/screenContext';
import { coustard } from '@/app/theme';

export default function VillagerTooltip({
  villager,
  ...props
}: VillagerTooltipProps) {
  const { historyMap } = useContext(DataContext);
  const { smallScreen } = useContext(ScreenContext);

  const villagerData = nookipediaData.get(villager)!;
  const history = historyMap.get(villager)!;

  return (
    <Tooltip
      {...props}
      enterDelay={500}
      title={
        <Box padding={1}>
          <Stack>
            <CRBadge invisible={!history.currentResident}>
              <Image
                src={villagerData.nh_details.icon_url}
                alt={villagerData.name}
                height={smallScreen ? 64 : 128}
                width={smallScreen ? 64 : 128}
                title={villagerData.name}
                placeholder="blur"
                blurDataURL={rgbDataURL(villagerData.title_color)}
                key={villagerData.nh_details.icon_url}
              />
            </CRBadge>
            <Typography
              display="inline"
              variant={smallScreen ? 'subtitle2' : 'h6'}
              fontFamily={coustard.style.fontFamily}
            >
              {villagerData.name}
            </Typography>
            <IconWithText
              Icon={ArrowForwardRoundedIcon}
              text={history.startDateString}
              screenBoolean={smallScreen}
            />
            {!history.currentResident ? (
              <IconWithText
                Icon={ArrowBackRoundedIcon}
                text={history.endDateString}
                screenBoolean={smallScreen}
              />
            ) : (
              ''
            )}
            <IconWithText
              Icon={AccessTimeRoundedIcon}
              text={dayOrDays(history.duration)}
              screenBoolean={smallScreen}
            />
          </Stack>
        </Box>
      }
    />
  );
}
