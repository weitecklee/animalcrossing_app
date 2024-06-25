'use server';

import { NookipediaVillager, SearchFilter, SearchOptions } from '@/types';
import { cache } from 'react';

function escapeRegExp(regexString: string) {
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function searchByFilter(searchOptions: SearchOptions): Promise<string[]> {
  const searchFilter = {} as SearchFilter;
  if (searchOptions.name) {
    searchFilter.name = {
      $regex: escapeRegExp(searchOptions.name),
      $options: 'i',
    };
  }
  if (searchOptions.species.length) {
    searchFilter.species = { $in: searchOptions.species };
  }
  if (searchOptions.personality.length) {
    searchFilter.personality = { $in: searchOptions.personality };
  }
  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'data',
    filter: searchFilter,
    projection: { name: 1, _id: 0 },
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

  const filteredResults: { documents: { name: string }[] } = await res.json();
  return filteredResults.documents.map((a) => a.name);
}

export default cache(searchByFilter);
