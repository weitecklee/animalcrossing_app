'use server';

import { EventDocument, HistoryDocument } from "@/types";
import { cache } from "react";

async function getData(): Promise<{historyData: HistoryDocument[], eventsData: EventDocument[]}> {

  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'history',
    filter: {},
  };
  const res = await fetch(`${process.env.API_URL}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const historyResults: {documents: (HistoryDocument & {_id: any})[]} = await res.json();
  const historyData = historyResults.documents.map((doc) => {
    const { _id, ...others } = doc;
    return others;
  });

  const payload2 = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'events',
    filter: {},
    sort: {
      _id: -1,
    },
    limit: 10,
  };
  const res2 = await fetch(`${process.env.API_URL}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload2)
  });
  const eventsResults: {documents: (EventDocument & {_id: any})[]} = await res2.json();
  const eventsData = eventsResults.documents.map((doc) => {
    const { _id, ...others } = doc;
    return others;
  });

  return {historyData, eventsData};

}

export default cache(getData)