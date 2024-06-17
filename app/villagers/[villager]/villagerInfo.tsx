'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { useContext } from "react";
import { dateFormatter, dayOrDays, fixName } from '@/lib/functions';
import CRIcon from '@/components/crIcon';
import nookipediaData from "@/lib/nookipediaData";
import { DataContext } from '@/lib/dataContext';
import { coustard } from '@/app/theme';
import IconGrid from '@/components/iconGrid';
import CustomImage from '@/components/customImage';
import { notFound } from 'next/navigation';
import Loading from '@/app/loading';

const baseDim = 128;
const unit1 = `${baseDim * 1}px`;
const unit2 = `${baseDim * 2}px`;
const unit3 = `${baseDim * 3}px`;

export default function VillagerInfo({ params } : { params: { villager: string } }) {

  const villagerName = fixName(params.villager);

  const villagerData = nookipediaData.get(villagerName);
  const { historyMap } = useContext(DataContext);

  if (!villagerData) {
    notFound();
  }

  const history = historyMap.get(villagerName);

  return (<>
    <Grid item xs={12} sm={6} md={5} position="relative">
      <Stack position="relative" direction="row" spacing={2} width="100%" height="100%" >
        <Box position="relative" height="auto" width={unit2}  maxWidth="50%" maxHeight="100%">
          <CustomImage
            fill
            src={villagerData.image_url}
            alt={`${villagerData.name} image`}
            title={villagerData.name}
            blurColor={villagerData.title_color}
            key={villagerData.image_url}
          />
        </Box>
        <Stack width={unit2} height="auto" position="relative" maxHeight="100%" maxWidth="50%" justifyContent="center" alignItems="center">
          <Box position="relative" width={unit1} height={unit1} maxHeight="100%" maxWidth="100%">
            <CustomImage
              src={villagerData.nh_details.icon_url}
              alt={`${villagerData.name} icon`}
              title={villagerData.name}
              fill
              blurColor={villagerData.title_color}
              key={villagerData.nh_details.icon_url}
            />
          </Box>
          <Box position="relative" width={unit2} height={unit2} maxWidth="100%">
            <CustomImage
              src={villagerData.nh_details.photo_url}
              alt={`${villagerData.name} photo`}
              title={villagerData.name}
              fill
              blurColor={villagerData.title_color}
              key={villagerData.nh_details.photo_url}
            />
          </Box>
        </Stack>
      </Stack>
    </Grid>
    <Grid item xs={12} sm={6} md={7} >
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