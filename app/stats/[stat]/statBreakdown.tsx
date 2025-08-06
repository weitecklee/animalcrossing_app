'use client';

import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { use, useContext } from 'react';
import { DataContext } from '@/lib/dataContext';
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import Loading from '@/app/loading';
import PhotoDialog from '../photoDialog';
import TitleChip from '../titleChip';
import { notFound } from 'next/navigation';
import CustomChip from '@/components/customChip';
import LengthOfStay from './lengthOfStay';
import { StatParams } from '@/types';

export default function StatBreakdown({ params }: { params: StatParams }) {
  const { historyMap, calculatedStats } = useContext(DataContext);

  if (!historyMap.size) {
    return <Loading />;
  }

  const stat = use(params).stat;

  const {
    speciesData,
    personalityData,
    genderData,
    photoData,
    islandmatesData,
    durationData,
    noPhotoData,
  } = calculatedStats;

  if (stat === 'lengthOfStay') {
    return <LengthOfStay durationData={durationData} historyMap={historyMap} />;
  }

  if (stat === 'species') {
    return (
      <>
        <TitleChip title="Species Breakdown" />
        {speciesData.map((traitData) => (
          <Box key={traitData.trait}>
            <Divider>
              <CustomChip label={`${traitData.trait}: ${traitData.count}`} />
            </Divider>
            <IconGrid traitData={traitData} />
          </Box>
        ))}
      </>
    );
  }

  if (stat === 'personality') {
    return (
      <>
        <TitleChip title="Personality Breakdown" />
        {personalityData.map((traitData) => (
          <Box key={traitData.trait}>
            <Divider>
              <CustomChip label={`${traitData.trait}: ${traitData.count}`} />
            </Divider>
            <IconGrid traitData={traitData} />
          </Box>
        ))}
      </>
    );
  }

  if (stat === 'gender') {
    return (
      <>
        <TitleChip title="Gender Breakdown" />
        {genderData.map((traitData) => (
          <Box key={traitData.trait}>
            <Divider>
              <CustomChip label={`${traitData.trait}: ${traitData.count}`} />
            </Divider>
            <IconGrid traitData={traitData} />
          </Box>
        ))}
      </>
    );
  }

  if (stat === 'photos') {
    return (
      <PhotoDialog
        photoData={photoData}
        noPhotoData={noPhotoData}
        historyMap={historyMap}
      />
    );
  }

  if (stat === 'islandmates') {
    return (
      <>
        <TitleChip title="Islandmates Breakdown" />
        <List>
          {islandmatesData.map((islandmates) =>
            islandmates.villagers.map((villager) => (
              <ListItem
                key={villager}
                disablePadding
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box display="flex" alignItems="center">
                  <VillagerIcon villager={villager} />
                  <Typography>&nbsp;&nbsp;{islandmates.trait}</Typography>
                </Box>
              </ListItem>
            )),
          )}
        </List>
      </>
    );
  }

  return notFound();
}
