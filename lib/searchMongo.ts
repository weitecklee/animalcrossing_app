'use server';

import { SearchFilter, SearchOptions } from '@/types';

function escapeRegExp(regexString: string) {
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function searchMongo(
  searchOptions: SearchOptions,
): Promise<string[]> {
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
  if (searchOptions.gender !== 'All') {
    searchFilter.gender = searchOptions.gender;
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
