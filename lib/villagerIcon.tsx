import Image from 'next/image';
import { useContext } from 'react';
import { ScreenContext } from "./screenContext";
import { DataContext } from './dataContext';
import CRBadge from './crBadge';
import { Box, useTheme } from '@mui/material';
import { rgbDataURL } from './functions';
import nookipediaData from './nookipediaData';
import { StateContext } from './stateContext';
import VillagerTooltip from './villagerTooltip';

export default function VillagerIcon({ villager, customOnClick } : {
  villager: string,
  customOnClick?: () => void,
}) {

  const theme = useTheme();
  const { mediumScreen } = useContext(ScreenContext);
  const { setDialogVillager, setShowVillagerDialog } = useContext(StateContext);
  const { historyMap } = useContext(DataContext);

  const villagerData = nookipediaData.get(villager)!;
  const isResident = !!historyMap.get(villager);

  return <VillagerTooltip villager={villager}>
    <Box>
      <CRBadge invisible={!historyMap.get(villager)?.currentResident}>
        <Image
          src={villagerData.nh_details.icon_url}
          alt={villager}
          title={villager}
          height={mediumScreen ? 48 : 64}
          width={mediumScreen ? 48 : 64}
          onClick={() => {
            if (customOnClick) {
              customOnClick();
              setTimeout(() => {
                setDialogVillager(villager);
              }, theme.transitions.duration.standard);
            } else {
              setDialogVillager(villager);
              setShowVillagerDialog(true);
            }
          }}
          style={{
            cursor: 'pointer',
            opacity: isResident ? 1 : .4,
          }}
          placeholder='blur'
          blurDataURL={rgbDataURL(villagerData.title_color)}
        />
      </CRBadge>
    </Box>
  </VillagerTooltip>;

}