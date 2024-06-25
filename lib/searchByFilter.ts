'use server';

import { NookipediaVillager } from '@/types';
import { cache } from 'react';

function escapeRegExp(regexString: string) {
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function searchByFilter(nameFilter: string): Promise<string[]> {
  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'data',
    filter: { name: { $regex: escapeRegExp(nameFilter), $options: 'i' } },
  };

  const res = await fetch(`${process.env.API_URL}/action/find`, {
    method: 'POST',
    headers: {
      'api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/ejson',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const filteredResults: { documents: (NookipediaVillager & { _id: any })[] } =
    await res.json();
  const filteredNames = filteredResults.documents.map((doc) => {
    return doc.name;
  });
  return filteredNames;
}

export default cache(searchByFilter);
