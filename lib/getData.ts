'use server';

import { EventDocument, HistoryDocument } from '@/types';
import { cache } from 'react';
import connectToMongo from './connectToMongo';

async function getData(): Promise<{
  historyData: HistoryDocument[];
  eventsData: EventDocument[];
}> {
  const db = await connectToMongo();
  const historyData = (await db
    .collection('history')
    .find({})
    .project({ _id: 0 })
    .toArray()) as HistoryDocument[];

  const eventsData = (await db
    .collection('events')
    .find({})
    .sort({ date: -1, event: -1 })
    .limit(10)
    .project({ _id: 0 })
    .toArray()) as EventDocument[];

  return {
    historyData,
    eventsData,
  };
}

export default cache(getData);
