'use server';

import { AdvancedSearchOptions, SearchFilter, SearchOptions } from '@/types';
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

export async function advancedSearchMongo(
  advancedSearchOptions: AdvancedSearchOptions,
  searchOptions: SearchOptions | null,
): Promise<string[]> {
  const db = await connectToMongo();
  const { fromDate, toDate } = advancedSearchOptions;
  const fromDateDate = new Date(fromDate + 'T00:00:00Z');
  const toDateDate = new Date(toDate + 'T23:59:59Z');

  if (advancedSearchOptions.residence === 'Non-residents only') {
  } else {
    if (searchOptions) {
      return searchMongo(searchOptions)
        .then((res) =>
          db
            .collection('history')
            .find({
              $or: [
                {
                  startDate: { $lte: toDateDate },
                  endDate: { $gte: fromDateDate },
                },
                {
                  startDate: { $lte: toDateDate },
                  endDate: { $exists: false },
                },
              ],
              name: { $in: res },
            })
            .project({ name: 1, _id: 0 })
            .toArray(),
        )
        .then((res) => res.map((a) => a.name));
    }
    return db
      .collection('history')
      .find({
        $or: [
          {
            startDate: { $lte: toDateDate },
            endDate: { $gte: fromDateDate },
          },
          {
            startDate: { $lte: toDateDate },
            endDate: { $exists: false },
          },
        ],
      })
      .project({ name: 1, _id: 0 })
      .toArray()
      .then((res) => res.map((a) => a.name));
  }

  return [];
}
