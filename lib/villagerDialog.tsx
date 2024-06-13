'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Collapse, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { dateFormatter, dayOrDays } from '@/lib/functions';
import CRIcon from './crIcon';
import nookipediaData from "./nookipediaData";
import { StateContext } from "./stateContext";
import { ScreenContext } from './screenContext';
import { DataContext } from './dataContext';
import { coustard } from './theme';
import IconGrid from './iconGrid';
import CustomDialog from './customDialog';
import CustomImage from './customImage';

export default function VillagerDialog() {

  const { showVillagerDialog, setShowVillagerDialog, dialogVillager, setDialogVillager } = useContext(StateContext);
  const { mediumScreen } = useContext(ScreenContext);
  const villagerData = nookipediaData.get(dialogVillager);
  const [baseDim, setBaseDim] = useState(128);
  const [showCollapse, setShowCollapse] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (mediumScreen) {
      setBaseDim(64);
    } else {
      setBaseDim(128);
    }
  }, [mediumScreen])

  const wait = 2750;

  useEffect(() => {

    const seq = ['Cookie', 'Celia', 'Clay', 'Julian', 'Anicotti', 'Apple', 'Boone'];
    if (dialogVillager === 'Boone') {
      seq.forEach((v, i) => {
        setTimeout(() => {
          setShowCollapse(false);
          setTimeout(() => {
            setDialogVillager(v);
          }, theme.transitions.duration.standard);
        }, wait * (i + 1));
      })
    }

  }, [dialogVillager, setDialogVillager, setShowCollapse, theme]);

  const { historyMap } = useContext(DataContext);

  if (!villagerData) {
    return;
  }

  const history = historyMap.get(dialogVillager);

  return <CustomDialog
    open={showVillagerDialog}
    onClose={() => setShowVillagerDialog(false)}
    zIndex={1300}
  >
    <Collapse
      in={showCollapse}
      onExited={() => setShowCollapse(true)}
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
            <Typography variant={mediumScreen ? 'subtitle2' : 'h6'} fontFamily={coustard.style.fontFamily}>
              {villagerData.name}&ensp;{villagerData.ja_name}&ensp;
            </Typography>
            {history && history.currentResident ? <CRIcon /> : ''}
          </Stack>
          <Typography variant={mediumScreen ? 'body2' : 'body1'}>
            {villagerData.personality} {villagerData.gender} {villagerData.species}
            <br />
            Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
            <br />
            Quote: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.quote}&quot;</Box>
            <br />
            Catchphrase: <Box component="span" sx={{fontStyle: 'italic'}}>&quot;{villagerData.nh_details.catchphrase}&quot;&ensp;「{villagerData.ja_phrase}」</Box>
          </Typography>

          {history ?
            <Typography variant={mediumScreen ? 'body2' : 'body1'}>
              <br />
              Moved in on {dateFormatter(history.startDateDate)}
            </Typography> : ''
          }
          {history?.photo ?
            <Typography variant={mediumScreen ? 'body2' : 'body1'}>
              Gave photo on {dateFormatter(history.photoDateDate)}
              <br />
              Time to give: {history.daysToPhoto} days
            </Typography> : ''
          }
          {history && !history?.currentResident ?
            <Typography variant={mediumScreen ? 'body2' : 'body1'}>
              Moved out on {dateFormatter(history.endDateDate)}
            </Typography> : ''
          }
          {history ? <>
            <Typography variant={mediumScreen ? 'body2' : 'body1'}>
              Duration of residence:&nbsp;
              {dayOrDays(history.duration)}{history.currentResident && " and counting"}
            <br /><br />
              {history.islandmates.length} islandmates:
            </Typography>
            <IconGrid
              villagers={history.islandmates}
              customOnClick={() => setShowCollapse(false)}
            />
            </>  : ''
          }
          <br />
          <Typography variant={mediumScreen ? 'caption' : 'body2'}>
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
    </Collapse>
  </CustomDialog>
}