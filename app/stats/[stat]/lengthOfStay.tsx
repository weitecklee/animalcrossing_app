'use client';

import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import VillagerIcon from '@/components/villagerIcon';
import TitleChip from '../titleChip';
import { Duration, History } from '@/types';
import { useContext, useState } from 'react';
import { ScreenContext } from '@/lib/screenContext';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function LengthOfStayRow({
  duration,
  history,
}: {
  duration: Duration;
  history: History;
}) {
  const [showCollapse, setShowCollapse] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <VillagerIcon villager={history.name} />
        </TableCell>
        <TableCell align="center">
          {duration.duration}
          <IconButton onClick={() => setShowCollapse((a) => !a)}>
            {showCollapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <Collapse in={showCollapse}>
            <Typography margin={1} fontSize="inherit">
              {history.startDateString} -{' '}
              {history.currentResident ? 'Present' : history.endDateString}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function LengthOfStay({
  durationData,
  historyMap,
}: {
  durationData: Duration[];
  historyMap: Map<string, History>;
}) {
  const { smallScreen } = useContext(ScreenContext);

  if (smallScreen) {
    return (
      <>
        <TitleChip title={'Length of Stay Breakdown'} />
        <Table size="small" key="smallScreenTable">
          <TableHead>
            <TableRow>
              <TableCell align="center">Villager</TableCell>
              <TableCell align="center">Length of Stay (days)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {durationData.map((duration) =>
              duration.villagers.map((villager) => {
                const history = historyMap.get(villager)!;

                return (
                  <LengthOfStayRow
                    key={villager}
                    duration={duration}
                    history={history}
                  />
                );
              }),
            )}
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <>
      <TitleChip title={'Length of Stay Breakdown'} />
      <Table size="small" key="regularScreenTable">
        <TableHead>
          <TableRow>
            <TableCell align="center">Villager</TableCell>
            <TableCell align="center">Length of Stay (days)</TableCell>
            <TableCell align="center">Move-in Date</TableCell>
            <TableCell align="center">Move-out Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {durationData.map((duration) =>
            duration.villagers.map((villager) => {
              const history = historyMap.get(villager)!;

              return (
                <TableRow key={villager}>
                  <TableCell align="center">
                    <VillagerIcon villager={history.name} />
                  </TableCell>
                  <TableCell align="center">{duration.duration}</TableCell>
                  <TableCell align="center">
                    {history.startDateString}
                  </TableCell>
                  <TableCell align="center">
                    {history.currentResident ? '-' : history.endDateString}
                  </TableCell>
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>
    </>
  );
}
