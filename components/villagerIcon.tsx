import Image from 'next/image';
import { useContext } from 'react';
import { ScreenContext } from "@/lib/screenContext";
import { DataContext } from '@/lib/dataContext';
import CRBadge from './crBadge';
import { Box } from '@mui/material';
import { fixName, rgbDataURL } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import VillagerTooltip from './villagerTooltip';
import Link from 'next/link';
import { StateContext } from '@/lib/stateContext';

export default function VillagerIcon({ villager, customOnClick } : {
  villager: string,
  customOnClick?: () => void,
}) {

  const { mediumScreen } = useContext(ScreenContext);
  const { historyMap } = useContext(DataContext);
  const { dialogActive } = useContext(StateContext);

  const villagerData = nookipediaData.get(villager)!;
  const isResident = !!historyMap.get(villager);

  return <VillagerTooltip villager={villager}>
    <Link href={`/villagers/${fixName(villager)}`} replace={dialogActive} scroll={false}>
      <Box>
        <CRBadge invisible={!historyMap.get(villager)?.currentResident}>
          <Image
            src={villagerData.nh_details.icon_url}
            alt={villager}
            title={villager}
            height={mediumScreen ? 48 : 64}
            width={mediumScreen ? 48 : 64}
            style={{
              cursor: 'pointer',
              opacity: isResident ? 1 : .4,
            }}
            placeholder='blur'
            blurDataURL={rgbDataURL(villagerData.title_color)}
          />
        </CRBadge>
      </Box>
    </Link>
  </VillagerTooltip>;

}