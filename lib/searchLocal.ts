'use server';

import { SearchOptions } from '@/types';
import nookipediaData from './nookipediaData';

function escapeRegExp(regexString: string) {
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function convertToRegex(str: string) {
  return new RegExp(escapeRegExp(str), 'i');
}

const villagers = Array.from(nookipediaData.values());

export default async function searchLocal(
  searchOptions: SearchOptions,
): Promise<string[]> {
  const { name, species, personality, gender } = searchOptions;
  const regex = convertToRegex(name);
  return villagers
    .filter((villager) => {
      if (name.length && !regex.test(villager.name)) {
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
