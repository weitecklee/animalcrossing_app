'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AppBar, Box, Button, Chip, ClickAwayListener, DialogContent, Divider, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { dayOrDays } from '@/lib/functions';
import { DataContext } from "@/lib/dataContext";
import { Trait } from '@/types';
import CRIcon from '@/components/crIcon';
import CustomDialog from '@/components/customDialog';
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import calculateStats from '@/lib/calculateStats';
import { coustard, theme } from '@/app/theme';
import Loading from '@/app/loading';
import PhotoDialog from './photoDialog';

export default function Stats() {

  const { historyMap } = useContext(DataContext);

  const [dialogTraitData, setDialogTraitData] = useState<Trait[]>([]);
  const [showTraitDialog, setShowTraitDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showIslandmatesDialog, setShowIslandmatesDialog] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPhotoCollapse, setShowPhotoCollapse] = useState(false);
  const [traitDialogTitle, setTraitDialogTitle] = useState('');

  if (!historyMap.size) {
    return <Loading />;
  }

  const {
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    durationData,
    noPhotoData,
    photoStats2,
  } = calculateStats(historyMap);

  const BreakdownLink = ({traitData, onClick, trait} : {
    traitData?: Trait[],
    onClick?: () => void,
    trait?: string,
  }) => (
    <Button
      size="small"
      variant="contained"
      disableElevation
      color="secondary"
      sx={{
        fontFamily: coustard.style.fontFamily,
      }}
      onClick={() => {
        if (traitData && trait) {
          setTraitDialogTitle(trait);
          setDialogTraitData(traitData);
          setShowTraitDialog(true);
        } else {
          onClick!();
        }
      }}
    >
      Full breakdown
    </Button>
  );

  const TitleChip = ({title}: {title?: string}) => (
    <Box
      display="flex"
      justifyContent="center"
      mb={1}
      py={1}
      px={2}
      bgcolor={theme.palette.secondary.main}
      borderRadius={Number.MAX_SAFE_INTEGER}
    >
      <Typography fontFamily={coustard.style.fontFamily} fontSize='1.2rem'>{title || traitDialogTitle}</Typography>
    </Box>)

  return <>
    <Typography>
      Number of Villagers: {historyMap.size}
    </Typography>
    <Stack direction="row" alignItems="center">
      <CRIcon />
      <Typography component='span'>
        &ensp;Current Residents:
      </Typography>
    </Stack>
    <IconGrid villagers={currentResidents} />
    <Divider>
      <Chip label="Duration of Residence" color="secondary" />
    </Divider>
    <Typography>
      Average: {(Array.from(historyMap.values()).reduce((a, b) => a + b.duration, 0) / historyMap.size).toFixed(2)} days
      <br />
      Longest: {(durationData[0].duration)} days
      <br />
    </Typography>
    <IconGrid
      traitData={durationData[0]}
    />
    <Typography>
      Shortest: {dayOrDays(durationData[durationData.length - 1].duration)}
    </Typography>
    <IconGrid
      traitData={durationData[durationData.length - 1]}
    />
    <BreakdownLink onClick={() => {setShowDurationDialog(true);}} />
    <Divider>
      <Chip label="Species" color="secondary" />
    </Divider>
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid
      traitData={speciesData[0]}
    />
    <Typography>
      <BreakdownLink traitData={speciesData} trait='Species'/>
    </Typography>
    <Divider>
      <Chip label="Personality" color="secondary" />
    </Divider>
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid
      traitData={personalityData[0]}
    />
    <Typography>
      <BreakdownLink traitData={personalityData} trait='Personality' />
    </Typography>
    <Divider>
      <Chip label="Gender" color="secondary" />
    </Divider>
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink traitData={genderData} trait='Gender' />
    </Typography>
    <Divider>
      <Chip
        label="Photos"
        color="secondary"
        deleteIcon={
          <Tooltip
            title={
              <ClickAwayListener onClickAway={() => {setShowTooltip(false);}}>
                <Typography>
                  You can interact with villagers to raise your friendship level with them, usually by talking to them, giving them gifts, or completing tasks for them. Once this friendship level is high enough, villagers may randomly give you their photo after being gifted a high quality item. I usually try to wait till I have received a villager&#39;s photo before I let them leave the island.
                </Typography>
              </ClickAwayListener>
            }
            open={showTooltip}
          >
            <InfoOutlinedIcon />
          </Tooltip>
        }
        onDelete={() => {setShowTooltip((a) => !a)}}
      />
    </Divider>
    <Typography>
      Given: {photoStats.count} ({(photoStats.count / historyMap.size * 100).toFixed(2)}%)
      <br />
      Average time to give: {photoStats.average.toFixed(2)} days
      <br />
      Quickest: {photoData[0].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[0]}
    />
    <Typography>
      Slowest: {photoData[photoData.length - 1].trait} days
    </Typography>
    <IconGrid
      traitData={photoData[photoData.length - 1]}
    />
    <Typography>
      Shortest stay after giving photo: {dayOrDays(photoStats2.shortestAfterGiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.shortestAfterGiving}
    />
    <Typography>
      Longest stay after giving photo: {dayOrDays(photoStats2.longestAfterGiving.duration - 1)}
    </Typography>
    <IconGrid
      traitData={photoStats2.longestAfterGiving}
    />
    <Typography>
      Longest stay without giving photo: {photoStats2.longestWithoutGiving.duration} days
    </Typography>
    <IconGrid
      traitData={photoStats2.longestWithoutGiving}
    />
    <BreakdownLink onClick={() => {setShowPhotoDialog(true); setShowPhotoCollapse(true);}} />
    <Divider>
      <Chip label="Islandmates" color="secondary" />
    </Divider>
    <Typography>
      Most islandmates: {islandmatesData[0].trait}
    </Typography>
    <IconGrid
      traitData={islandmatesData[0]}
    />
    <Typography>
      Fewest islandmates: {islandmatesData[islandmatesData.length - 1].trait}
    </Typography>
    <IconGrid
      traitData={islandmatesData[islandmatesData.length - 1]}
      />
    <BreakdownLink onClick={() => {setShowIslandmatesDialog(true);}} />
    <CustomDialog
      open={showDurationDialog}
      onClose={() => setShowDurationDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title={'Duration of Residence'}/>
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
      </DialogContent>
    </CustomDialog>
    <CustomDialog
      open={showTraitDialog}
      onClose={() => setShowTraitDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip />
        {dialogTraitData.map((traitData) => (<Box key={traitData.trait}>
          <Divider>
            <Chip label={`${traitData.trait}: ${traitData.count}`} color="secondary" />
          </Divider>
          <IconGrid
            traitData={traitData}
          />
        </Box>))}
      </DialogContent>
    </CustomDialog>
    <PhotoDialog
      photoData={photoData}
      noPhotoData={noPhotoData}
      historyMap={historyMap}
      showPhotoCollapse={showPhotoCollapse}
      setShowPhotoCollapse={setShowPhotoCollapse}
      showPhotoDialog={showPhotoDialog}
      setShowPhotoDialog={setShowPhotoDialog}
    />
    <CustomDialog
      open={showIslandmatesDialog}
      onClose={() => setShowIslandmatesDialog(false)}
      maxWidth={false}
      zIndex={1200}
    >
      <DialogContent>
        <TitleChip title='Islandmates' />
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
      </DialogContent>
    </CustomDialog>
  </>

}