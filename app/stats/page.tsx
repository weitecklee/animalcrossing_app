'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, ClickAwayListener, Stack, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { dayOrDays } from '@/lib/functions';
import { DataContext } from "@/lib/dataContext";
import CRIcon from '@/components/crIcon';
import IconGrid from '@/components/iconGrid';
import calculateStats from '@/lib/calculateStats';
import { coustard } from '@/app/theme';
import Loading from '@/app/loading';
import StatsDivider from './statsDivider';
import Link from 'next/link';

export default function Stats() {

  const { historyMap } = useContext(DataContext);

  const [showTooltip, setShowTooltip] = useState(false);

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
    photoStats2,
  } = calculateStats(historyMap);

  const BreakdownLink = ({stat} : {
    stat: string,
  }) => (
    <Link href={`/stats/${stat}`} scroll={false}>
      <Button
        size="small"
        variant="contained"
        disableElevation
        color="secondary"
        sx={{
          fontFamily: coustard.style.fontFamily,
        }}
      >
        Full breakdown
      </Button>
    </Link>
  );

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
    <StatsDivider label='Length of Stay' />
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
    <BreakdownLink stat='lengthOfStay' />
    <StatsDivider label='Species' />
    <Typography>
      Most common: {speciesData[0].trait}
    </Typography>
    <IconGrid
      traitData={speciesData[0]}
    />
    <Typography>
      <BreakdownLink stat='species'/>
    </Typography>
    <StatsDivider label='Personality' />
    <Typography>
      Most common: {personalityData[0].trait}
    </Typography>
    <IconGrid
      traitData={personalityData[0]}
    />
    <Typography>
      <BreakdownLink stat='personality' />
    </Typography>
    <StatsDivider label='Gender' />
    <Typography>
      {genderData[0].trait}: {genderData[0].count}
      <br />
      {genderData[1].trait}: {genderData[1].count}
      <br />
      <BreakdownLink stat='gender' />
    </Typography>
    <StatsDivider
      label="Photos"
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
    <BreakdownLink stat='photos' />
    <StatsDivider label='Islandmates' />
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
    <BreakdownLink stat='islandmates' />
  </>

}