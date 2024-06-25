'use server';

import { EventDocument, HistoryDocument } from '@/types';
import { cache } from 'react';

async function getData(): Promise<{
  historyData: HistoryDocument[];
  eventsData: EventDocument[];
}> {
  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'history',
    filter: {},
    projection: { _id: 0 },
  };
  const res = await fetch(`${process.env.API_URL}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const historyResults: { documents: HistoryDocument[] } = await res.json();

  const payload2 = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'events',
    filter: {},
    sort: {
      _id: -1,
    },
    limit: 10,
    projection: { _id: 0 },
  };
  const res2 = await fetch(`${process.env.API_URL}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload2),
  });
  const eventsResults: { documents: EventDocument[] } = await res2.json();

  return {
    historyData: historyResults.documents,
    eventsData: eventsResults.documents,
  };
}

export default cache(getData);
