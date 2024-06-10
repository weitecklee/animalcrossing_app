import CustomDialog from '@/lib/customDialog';
import { dayOrDays } from '@/lib/functions';
import { ScreenContext } from '@/lib/screenContext';
import VillagerIcon from '@/lib/villagerIcon';
import { Duration, History } from '@/types';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import { Box, Chip, Collapse, DialogContent, Divider, Fab, List, ListItem, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

export default function PhotoDialog({ photoData, noPhotoData, historyMap, showPhotoDialog, setShowPhotoDialog, showPhotoCollapse, setShowPhotoCollapse }: {
  photoData: Duration[],
  noPhotoData: Duration[]
  historyMap: Map<string, History>,
  showPhotoDialog: boolean,
  setShowPhotoDialog: Dispatch<SetStateAction<boolean>>,
  showPhotoCollapse: boolean,
  setShowPhotoCollapse: Dispatch<SetStateAction<boolean>>,
}) {

  const { smallScreen } = useContext(ScreenContext);
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
    return <CustomDialog
      open={smallScreen && showPhotoDialog}
      onClose={() => setShowPhotoDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <Collapse
        in={showPhotoCollapse}
        orientation="horizontal"
        onExited={() => {
          setPhotoDialogTab((a) => !a);
          setShowPhotoCollapse(true);
        }}
      >
        <DialogContent>
          {photoDialogTab ? PhotoDialogContent : PhotoDialogContent2}
        </DialogContent>
      </Collapse>
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
        onClick={() => setShowPhotoCollapse(false)}
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
        onClick={() => setShowPhotoCollapse(false)}
      >
        <ArrowForwardRounded />
      </Fab>
    </CustomDialog>
  }

  return <CustomDialog
    open={!smallScreen && showPhotoDialog}
    onClose={() => setShowPhotoDialog(false)}
    maxWidth={false}
    zIndex={1200}
  >
    <DialogContent>
      <Stack direction="row" spacing={2}>
        {PhotoDialogContent}
        <Divider orientation='vertical' flexItem/>
        {PhotoDialogContent2}
      </Stack>
    </DialogContent>
  </CustomDialog>

}