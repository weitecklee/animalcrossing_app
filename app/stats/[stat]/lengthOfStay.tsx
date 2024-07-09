'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import VillagerIcon from '@/components/villagerIcon';
import TitleChip from '../titleChip';
import { Duration, History } from '@/types';
import { useContext } from 'react';
import { ScreenContext } from '@/lib/screenContext';

export default function LengthOfStay({
  durationData,
  historyMap,
}: {
  durationData: Duration[];
  historyMap: Map<string, History>;
}) {
  const { smallScreen } = useContext(ScreenContext);
  return (
    <>
      <TitleChip title={'Length of Stay Breakdown'} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Villager</TableCell>
            <TableCell align="center">Length of Stay (days)</TableCell>
            {smallScreen ? (
              ''
            ) : (
              <>
                <TableCell align="center">Move-in Date</TableCell>
                <TableCell align="center">Move-out Date</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {durationData.map((duration) =>
            duration.villagers.map((villager) => {
              const history = historyMap.get(villager)!;
              return (
                <TableRow key={villager}>
                  <TableCell align="center">
                    <VillagerIcon villager={villager} />
                  </TableCell>
                  <TableCell align="center">{duration.duration}</TableCell>
                  {smallScreen ? (
                    ''
                  ) : (
                    <>
                      <TableCell align="center">
                        {history.startDateString}
                      </TableCell>
                      <TableCell align="center">
                        {history.currentResident ? '-' : history.endDateString}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>
    </>
  );
}
