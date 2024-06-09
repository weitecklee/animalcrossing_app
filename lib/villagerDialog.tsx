'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Dialog, Grid, Link, Stack, Typography } from '@mui/material';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { dateFormatter, dayOrDays } from '@/lib/functions';
import CRIcon from './crIcon';
import { rgbDataURL } from "./functions";
import nookipediaData from "./nookipediaData";
import { StateContext } from "./stateContext";
import { ScreenContext } from './screenContext';
import { DataContext } from './dataContext';
import { coustard } from './theme';
import IconGrid from './iconGrid';

export default function VillagerDialog() {

  console.log("historyMap in VillagerDialog");

  const { showVillagerDialog, setShowVillagerDialog, dialogVillager } = useContext(StateContext);
  const { mediumScreen, smallScreen } = useContext(ScreenContext);
  const villagerData = nookipediaData.get(dialogVillager);
  const [baseDim, setBaseDim] = useState(128);

  useEffect(() => {
    if (mediumScreen) {
      setBaseDim(64);
    } else {
      setBaseDim(128);
    }
  }, [mediumScreen])

  const data = useContext(DataContext);
  if (!data) {
    return;
  }
  const { historyMap } = data;

  if (!villagerData) {
    return;
  }

  const history = historyMap.get(dialogVillager);

  return <Dialog
    open={showVillagerDialog}
    onClose={() => setShowVillagerDialog(false)}
    maxWidth='xl'
    PaperProps={{sx: smallScreen ? {
      maxWidth: "100%",
      mx: "16px",
    } : {}}}
  >
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      padding={4}
      spacing={4}
    >
      <Grid item>
        <Stack direction="row" spacing={2}>
          <Image
            src={villagerData.image_url}
            alt={`${villagerData.name} image`}
            title={villagerData.name}
            width={2 * baseDim}
            height={3 * baseDim}
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
            placeholder='blur'
            blurDataURL={rgbDataURL(villagerData.title_color)}
          />
          <Stack alignItems="center">
            <Image
              src={villagerData.nh_details.icon_url}
              alt={`${villagerData.name} icon`}
              title={villagerData.name}
              width={baseDim}
              height={baseDim}
              sizes="100vw"
              style={{
                objectFit: 'contain',
              }}
              placeholder='blur'
              blurDataURL={rgbDataURL(villagerData.title_color)}
            />
            <Image
              src={villagerData.nh_details.photo_url}
              alt={`${villagerData.name} photo`}
              title={villagerData.name}
              width={2 * baseDim}
              height={2 * baseDim}
              sizes="100vw"
              style={{
                objectFit: 'contain',
              }}
              placeholder='blur'
              blurDataURL={rgbDataURL(villagerData.title_color)}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item maxWidth={mediumScreen? 40 * 8 : 64 * 9 }>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" fontFamily={coustard.style.fontFamily}>
            {villagerData.name}&ensp;{villagerData.ja_name}&ensp;
          </Typography>
          {history && history.currentResident ? <CRIcon /> : ''}
        </Stack>
        <Typography>
          {villagerData.personality} {villagerData.gender} {villagerData.species}
          <br />
          Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
          <br />
          Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
          <br />
          Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;&ensp;「{villagerData.ja_phrase}」</Box>
        </Typography>

        {history ?
          <Typography>
            <br />
            Moved in on {dateFormatter(history.startDateDate)}
          </Typography> : ''
        }
        {history?.photo ?
          <Typography>
            Gave photo on {dateFormatter(history.photoDateDate)}
            <br />
            Time to give: {history.daysToPhoto} days
          </Typography> : ''
        }
        {history && !history?.currentResident ?
          <Typography>
            Moved out on {dateFormatter(history.endDateDate)}
          </Typography> : ''
        }
        {history ? <>
          <Typography>
            Duration of residence:&nbsp;
            {dayOrDays(history.duration)}{history.currentResident && " and counting"}
          <br /><br />
            {history.islandmates.length} islandmates:
          </Typography>
          <IconGrid
            villagers={history.islandmates}
          />
          </>  : ''
        }
        <br />
        <Typography variant="body2">
          <Link
            href={villagerData.url}
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            Nookipedia page
            <OpenInNewRoundedIcon fontSize='inherit'/>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  </Dialog>
}