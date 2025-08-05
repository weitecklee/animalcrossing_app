import { Grid } from '@mui/material';
import { NAMES } from '@/lib/constants';
import { memo } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { ScreenContext } from '@/lib/screenContext';
import { DataContext } from '@/lib/dataContext';
import CRBadge from './crBadge';
import { Box } from '@mui/material';
import { fixName } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import VillagerTooltip from './villagerTooltip';
import Link from 'next/link';
import { StateContext } from '@/lib/stateContext';

function IconGridAll() {
  const { mediumScreen } = useContext(ScreenContext);
  const { historyMap } = useContext(DataContext);
  const { dialogActive } = useContext(StateContext);

  return (
    <Grid container spacing={0.5} paddingY={0.5}>
      {NAMES.map((villager) => {
        const villagerData = nookipediaData.get(villager)!;
        const isResident = !!historyMap.get(villager);
        return (
          <Grid key={villager}>
            <VillagerTooltip villager={villager}>
              <Link
                href={`/villagers/${fixName(villager)}`}
                replace={dialogActive}
                scroll={false}
              >
                <Box>
                  <CRBadge
                    invisible={!historyMap.get(villager)?.currentResident}
                  >
                    <Image
                      src={villagerData.nh_details.icon_url}
                      alt={villager}
                      title={villager}
                      height={mediumScreen ? 48 : 64}
                      width={mediumScreen ? 48 : 64}
                      style={{
                        cursor: 'pointer',
                        opacity: isResident ? 1 : 0.4,
                      }}
                    />
                  </CRBadge>
                </Box>
              </Link>
            </VillagerTooltip>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default memo(IconGridAll);
