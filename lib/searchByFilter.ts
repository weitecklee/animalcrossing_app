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
  if (searchOptions.species) {
    searchFilter.species = searchOptions.species;
  }
  if (searchOptions.personality) {
    searchFilter.personality = searchOptions.personality;
  }
  const payload = {
    dataSource: 'AnimalCrossing',
    database: 'lasagnark',
    collection: 'data',
    filter: searchFilter,
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
