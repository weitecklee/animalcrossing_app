'use client';

import { dayOrDays } from '@/lib/functions';
import { ScreenContext } from '@/lib/screenContext';
import VillagerIcon from '@/components/villagerIcon';
import { Duration, History } from '@/types';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import { Box, Chip, Slide, Divider, Fab, List, ListItem, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import TitleChip from './titleChip';

export default function PhotoDialog({ photoData, noPhotoData, historyMap }: {
  photoData: Duration[],
  noPhotoData: Duration[]
  historyMap: Map<string, History>,
}) {

  const { smallScreen } = useContext(ScreenContext);
  const [showPhotoSlide, setShowPhotoSlide] = useState(true);
  const [photoDialogTab, setPhotoDialogTab] = useState(true);

  const PhotoDialogContent = (
    <Stack sx={{
      alignItems: "center"
    }}>
      <Divider>
        <Chip label="Time to give (stay after giving)" color="secondary" />
      </Divider>
      <List>
        {photoData.map((photo) => (
          photo.villagers.map((villager) => (
            <ListItem key={villager} disablePadding>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{photo.trait} days ({dayOrDays(historyMap.get(villager)!.duration - photo.duration)})
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </Stack>
  );

  const PhotoDialogContent2 = (
    <Stack sx={{
      alignItems: "center"
    }}>
      <Divider>
        <Chip label="Stay without giving" color="secondary" />
      </Divider>
      <List>
        {noPhotoData.map((noPhoto) => (
          noPhoto.villagers.map((villager) => (
            <ListItem key={villager} disablePadding>
              <Box display="flex" alignItems="center">
                <VillagerIcon
                  villager={villager}
                />
                <Typography>
                  &nbsp;&nbsp;{dayOrDays(noPhoto.duration)}
                </Typography>
              </Box>
            </ListItem>
        ))))}
      </List>
    </Stack>
  );

  if (smallScreen) {
    return <>
      <Slide
        in={showPhotoSlide}
        appear={false}
        onExited={() => {
          setPhotoDialogTab((a) => !a);
          setShowPhotoSlide(true);
        }}
        direction={ photoDialogTab ? 'right' : 'left'}
      >
        <Box>
          <TitleChip title='Photos Breakdown' />
          {photoDialogTab ? PhotoDialogContent : PhotoDialogContent2}
        </Box>
      </Slide>
      <Fab
        size="small"
        color="secondary"
        sx={{
          display: photoDialogTab ? "none" : "flex",
          ':hover': {
            bgcolor: "white"
          },
          position: "fixed",
          top: "50%",
          left: 8,
        }}
        onClick={() => setShowPhotoSlide(false)}
      >
        <ArrowBackRounded />
      </Fab>
      <Fab
        size="small"
        color="secondary"
        sx={{
          display: photoDialogTab ? "flex" : "none",
          ':hover': {
            bgcolor: "white"
          },
          position: "fixed",
          top: "50%",
          right: 8,
        }}
        onClick={() => setShowPhotoSlide(false)}
      >
        <ArrowForwardRounded />
      </Fab>
    </>
  }

  return <>
    <TitleChip title='Photos Breakdown' />
    <Stack direction="row" spacing={2} justifyContent="center">
      {PhotoDialogContent}
      <Divider orientation='vertical' flexItem/>
      {PhotoDialogContent2}
    </Stack>
  </>

}