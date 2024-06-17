'use client';

import { Box, Chip, Divider, List, ListItem, Typography } from '@mui/material';
import { useContext } from 'react';
import { dayOrDays } from '@/lib/functions';
import { DataContext } from "@/lib/dataContext";
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import calculateStats from '@/lib/calculateStats';
import Loading from '@/app/loading';
import PhotoDialog from '../photoDialog';
import TitleChip from '../titleChip';
import { notFound } from 'next/navigation';

export default function StatBreakdown({ params } : { params: { stat: string } }) {

  const { historyMap } = useContext(DataContext);

  if (!historyMap.size) {
    return <Loading />;
  }

  const {
    speciesData,
    personalityData,
    genderData,
    photoData,
    islandmatesData,
    durationData,
    noPhotoData,
  } = calculateStats(historyMap);

  if (params.stat=== 'lengthOfStay') {
    return <>
      <TitleChip title={'Length of Stay Breakdown'}/>
      <List>
        {durationData.map((duration) => (
          duration.villagers.map((villager) => (
            <ListItem key={villager} disablePadding sx={{display: 'flex', justifyContent: 'center'}}>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{dayOrDays(duration.trait)}
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </>
  }

  if (params.stat === 'species') {
    return <>
      <TitleChip title='Species Breakdown'/>
      {speciesData.map((traitData) => (<Box key={traitData.trait}>
        <Divider>
          <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
        </Divider>
        <IconGrid
          traitData={traitData}
        />
      </Box>))}
    </>
  }

  if (params.stat === 'personality') {
    return <>
      <TitleChip title='Personality Breakdown'/>
      {personalityData.map((traitData) => (<Box key={traitData.trait}>
        <Divider>
          <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
        </Divider>
        <IconGrid
          traitData={traitData}
        />
      </Box>))}
    </>
  }

  if (params.stat === 'gender') {
    return <>
      <TitleChip title='Gender Breakdown'/>
      {genderData.map((traitData) => (<Box key={traitData.trait}>
        <Divider>
          <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
        </Divider>
        <IconGrid
          traitData={traitData}
        />
      </Box>))}
    </>
  }

  if (params.stat === 'photos') {
    return <PhotoDialog
      photoData={photoData}
      noPhotoData={noPhotoData}
      historyMap={historyMap}
    />
  }

  if (params.stat === 'islandmates') {
    return <>
      <TitleChip title='Islandmates Breakdown' />
      <List>
        {islandmatesData.map((islandmates) => (
          islandmates.villagers.map((villager) => (
            <ListItem key={villager} disablePadding sx={{display: 'flex', justifyContent: 'center'}}>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{islandmates.trait}
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </>
  }

  return notFound();
}