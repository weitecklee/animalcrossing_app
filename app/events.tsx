'use client';

import {
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { dateFormatter } from '@/lib/functions';
import { DataContext } from '@/lib/dataContext';
import { ScreenContext } from '@/lib/screenContext';
import nookipediaData from '@/lib/nookipediaData';
import VillagerIcon from '@/components/villagerIcon';
import Loading from './loading';
import CustomChip from '@/components/customChip';

const determinePronoun = (villager: string) =>
  nookipediaData.get(villager)!.gender === 'Male' ? 'his' : 'her';

const rewordEvent = (villager: string, event: string): string => {
  if (event === 'gave photo') {
    return `${villager} gave ${determinePronoun(villager)} photo`;
  }
  if (event === 'birthday') {
    return `${villager} celebrated ${determinePronoun(villager)} birthday`;
  }
  return `${villager} ${event}`;
};

export default function Events() {
  const { mediumScreen } = useContext(ScreenContext);
  const theme = useTheme();
  const { eventsData } = useContext(DataContext);

  return (
    <Paper
      elevation={4}
      sx={{
        background: theme.palette.success.light,
        px: mediumScreen ? 1 : 2,
        height: { xs: '100%', md: 'auto' },
        overflow: 'auto',
      }}
    >
      <List dense={mediumScreen}>
        <Divider>
          <CustomChip label="Latest Happenings" />
        </Divider>
        {!!eventsData.length ? (
          eventsData.map((eventDatum) => {
            const { date, event, villager } = eventDatum;
            const listItemKey = `${villager} ${event}`;
            return (
              <ListItem key={listItemKey}>
                <ListItemAvatar sx={{ pr: 1 }}>
                  <VillagerIcon villager={villager} />
                </ListItemAvatar>
                <ListItemText
                  primary={rewordEvent(villager, event)}
                  secondary={dateFormatter(new Date(date))}
                />
              </ListItem>
            );
          })
        ) : (
          <Loading />
        )}
      </List>
    </Paper>
  );
}
