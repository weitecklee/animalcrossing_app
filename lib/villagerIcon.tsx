import Image from 'next/image';
import { useContext } from 'react';
import { ScreenContext } from "./screenContext";
import { DataContext } from './dataContext';
import CRBadge from './crBadge';
import { Box } from '@mui/material';
import { rgbDataURL } from './functions';
import nookipediaData from './nookipediaData';
import { StateContext } from './stateContext';

export default function VillagerIcon({ villager } : {
  villager: string,
}) {


  console.log("historyMap in VillagerIcon");

  const { historyMap } = useContext(DataContext);
  const { mediumScreen } = useContext(ScreenContext);
  const { setDialogVillager, setShowVillagerDialog } = useContext(StateContext);

  const villagerData = nookipediaData.get(villager)!;
  const isResident = !!historyMap.get(villager);

  return (
      <Box>
        <CRBadge invisible={!historyMap.get(villager)?.currentResident}>
          <Image
            src={villagerData.nh_details.icon_url}
            alt={villager}
            title={villager}
            height={mediumScreen ? 48 : 64}
            width={mediumScreen ? 48 : 64}
            onClick={() => {
                setDialogVillager(villager);
                setShowVillagerDialog(true);
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
  );

}