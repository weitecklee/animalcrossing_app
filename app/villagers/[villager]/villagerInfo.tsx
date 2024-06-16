'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { dateFormatter, dayOrDays } from '@/lib/functions';
import CRIcon from '@/components/crIcon';
import nookipediaData from "@/lib/nookipediaData";
import { ScreenContext } from '@/lib/screenContext';
import { DataContext } from '@/lib/dataContext';
import { coustard } from '@/app/theme';
import IconGrid from '@/components/iconGrid';
import CustomImage from '@/components/customImage';
import { notFound } from 'next/navigation';
import Loading from '@/app/loading';

export default function VillagerInfo({ params } : { params: { villager: string } }) {

  const { mediumScreen } = useContext(ScreenContext);
  const villagerData = nookipediaData.get(params.villager);
  const [baseDim, setBaseDim] = useState(128);

  useEffect(() => {
    if (mediumScreen) {
      setBaseDim(64);
    } else {
      setBaseDim(128);
    }
  }, [mediumScreen])

  const { historyMap } = useContext(DataContext);

  if (!villagerData) {
    notFound();
  }

  const history = historyMap.get(params.villager);

  return (<>
    <Grid item>
      <Stack direction="row" spacing={2}>
        <CustomImage
          src={villagerData.image_url}
          alt={`${villagerData.name} image`}
          title={villagerData.name}
          width={2 * baseDim}
          height={3 * baseDim}
          blurColor={villagerData.title_color}
          key={villagerData.image_url}
        />
        <Stack alignItems="center">
          <CustomImage
            src={villagerData.nh_details.icon_url}
            alt={`${villagerData.name} icon`}
            title={villagerData.name}
            width={baseDim}
            height={baseDim}
            blurColor={villagerData.title_color}
            key={villagerData.nh_details.icon_url}
          />
          <CustomImage
            src={villagerData.nh_details.photo_url}
            alt={`${villagerData.name} photo`}
            title={villagerData.name}
            width={2 * baseDim}
            height={2 * baseDim}
            blurColor={villagerData.title_color}
            key={villagerData.nh_details.photo_url}
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
      {!historyMap.size ? <Loading /> : ''}
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
          Length of stay:&nbsp;
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
  </>)
}