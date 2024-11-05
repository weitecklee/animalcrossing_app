'use server';

import { EventDocument, History } from '@/types';
import { calculateDays, dateISOFormatter } from './functions';
import getData from './getData';
import { cache } from 'react';

const currentDate = new Date();
// currentDate.setHours(0, 0, 0);
const endDate = new Date();
endDate.setDate(currentDate.getDate() + 30);
// endDate.setHours(0, 0, 0);

async function assembleData(): Promise<{
  historyMap: Map<string, History>;
  eventsData: EventDocument[];
}> {
  const { eventsData, historyData } = await getData();
  const historyMap: Map<string, History> = new Map();

  historyData.sort((a, b) => (a.startDate < b.startDate ? -1 : 1));

  historyData.forEach((doc) => {
    const history = { ...doc } as History;
    history.startDateDate = new Date(history.startDate);
    if (history.startDateDate > currentDate) {
      return;
    }
    history.startDateString = dateISOFormatter(history.startDateDate);

    if (!history.endDate) {
      history.currentResident = true;
      history.endDateDate = endDate;
      history.duration = calculateDays(history.startDateDate, currentDate);
    } else {
      history.currentResident = false;
      history.endDateDate = new Date(history.endDate);
      history.duration = calculateDays(
        history.startDateDate,
        history.endDateDate,
      );
    }
    history.endDateString = dateISOFormatter(history.endDateDate);

    if (history.photoDate) {
      history.photo = true;
      history.photoDateDate = new Date(history.photoDate!);
      history.photoDateString = dateISOFormatter(history.photoDateDate);
      history.daysToPhoto = calculateDays(
        history.startDateDate,
        history.photoDateDate,
      );
    } else {
      history.photo = false;
    }

    historyMap.set(history.name, history);
  });

  return {
    historyMap,
    eventsData,
  };
}

export default cache(assembleData);
