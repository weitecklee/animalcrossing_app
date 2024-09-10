'use server';

import { SearchFilter, SearchOptions } from '@/types';
import connectToMongo from './connectToMongo';

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

  const db = await connectToMongo();
  const searchResults = await db
    .collection('data')
    .find(searchFilter)
    .project({ name: 1, _id: 0 })
    .toArray();

  return searchResults.map((a) => a.name);
}
