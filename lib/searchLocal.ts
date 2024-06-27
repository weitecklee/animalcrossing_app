'use server';

import { SearchOptions } from '@/types';
import nookipediaData from './nookipediaData';

const villagers = Array.from(nookipediaData.values());

export default async function searchLocal(
  searchOptions: SearchOptions,
): Promise<string[]> {
  const { name, species, personality, gender } = searchOptions;
  return villagers
    .filter((villager) => {
      if (name.length && !villager.name.includes(name)) {
        return false;
      }
      if (species.length && !species.includes(villager.species)) {
        return false;
      }
      if (personality.length && !personality.includes(villager.personality)) {
        return false;
      }
      if (gender !== 'All' && villager.gender !== gender) {
        return false;
      }
      return true;
    })
    .map((villager) => villager.name);
}
