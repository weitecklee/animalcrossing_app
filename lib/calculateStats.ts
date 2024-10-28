import {
  CalculatedStats,
  Duration,
  History,
  PhotoStats,
  PhotoStats2,
  Trait,
} from '@/types';
import nookipediaData from './nookipediaData';
import { calculateDays } from './functions';
import { cache } from 'react';

function calculateStats(historyMap: Map<string, History>): CalculatedStats {
  const durationMap: Map<number, Duration> = new Map();
  const noPhotoMap: Map<number, Duration> = new Map();
  const speciesMap: Map<string, Trait> = new Map();
  const personalityMap: Map<string, Trait> = new Map();
  const genderMap: Map<string, Trait> = new Map();
  const photoMap: Map<number, Duration> = new Map();
  const islandmatesMap: Map<number, Duration> = new Map();
  const photoStats: PhotoStats = {
    average: 0,
    count: 0,
  };
  const photoStats2: PhotoStats2 = {
    shortestAfterGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 10000,
    },
    longestAfterGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 0,
    },
    longestWithoutGiving: {
      trait: '',
      count: 0,
      villagers: [],
      duration: 0,
    },
  };
  const currentResidents: string[] = [];
  const timelineLabels: string[] = [];
  const timelineData: number[][] = [];
  const timelineColors: string[] = [];
  const timelineData2: number[] = [];
  const timelineNameMap: Map<string, number> = new Map();

  Array.from(historyMap.values()).forEach((history, i) => {
    if (history.currentResident) {
      currentResidents.push(history.name);
    }
    if (history.photo) {
      photoStats.count++;
      photoStats.average += history.daysToPhoto;
      if (!photoMap.has(history.daysToPhoto)) {
        photoMap.set(history.daysToPhoto, {
          trait: history.daysToPhoto.toString(),
          count: 0,
          villagers: [],
          duration: history.daysToPhoto,
        });
      }
      const tmp = photoMap.get(history.daysToPhoto)!;
      tmp.count++;
      tmp.villagers.push(history.name);
      const stayAfterGiving = calculateDays(
        history.photoDateDate,
        history.endDateDate,
      );
      if (!history.currentResident) {
        if (stayAfterGiving < photoStats2.shortestAfterGiving.duration) {
          photoStats2.shortestAfterGiving.duration = stayAfterGiving;
          photoStats2.shortestAfterGiving.villagers = [history.name];
        } else if (
          stayAfterGiving === photoStats2.shortestAfterGiving.duration
        ) {
          photoStats2.shortestAfterGiving.villagers.push(history.name);
        }
      }
      if (stayAfterGiving > photoStats2.longestAfterGiving.duration) {
        photoStats2.longestAfterGiving.duration = stayAfterGiving;
        photoStats2.longestAfterGiving.villagers = [history.name];
      } else if (stayAfterGiving === photoStats2.longestAfterGiving.duration) {
        photoStats2.longestAfterGiving.villagers.push(history.name);
      }
    } else {
      if (!noPhotoMap.has(history.duration)) {
        noPhotoMap.set(history.duration, {
          trait: history.duration.toString(),
          count: 0,
          villagers: [],
          duration: history.duration,
        });
      }
      const tmp = noPhotoMap.get(history.duration)!;
      tmp.count++;
      tmp.villagers.push(history.name);
    }
    if (!durationMap.has(history.duration)) {
      durationMap.set(history.duration, {
        trait: history.duration.toString(),
        count: 0,
        villagers: [],
        duration: history.duration,
      });
    }
    const tmpDuration = durationMap.get(history.duration)!;
    tmpDuration.count++;
    tmpDuration.villagers.push(history.name);
    const species = nookipediaData.get(history.name)!.species;
    if (!speciesMap.has(species)) {
      speciesMap.set(species, {
        trait: species,
        count: 0,
        villagers: [],
      });
    }
    const tmp = speciesMap.get(species)!;
    tmp.count++;
    tmp.villagers.push(history.name);
    const personality = nookipediaData.get(history.name)!.personality;
    if (!personalityMap.has(personality)) {
      personalityMap.set(personality, {
        trait: personality,
        count: 0,
        villagers: [],
      });
    }
    const tmp2 = personalityMap.get(personality)!;
    tmp2.count++;
    tmp2.villagers.push(history.name);
    const gender = nookipediaData.get(history.name)!.gender;
    if (!genderMap.has(gender)) {
      genderMap.set(gender, {
        trait: gender,
        count: 0,
        villagers: [],
      });
    }
    const tmp3 = genderMap.get(gender)!;
    tmp3.count++;
    tmp3.villagers.push(history.name);
    if (history.currentResident) {
      const lastIslandmate =
        history.islandmates[history.islandmates.length - 1];
      if (!historyMap.has(lastIslandmate)) {
        history.islandmates.pop();
      }
    }
    if (!islandmatesMap.has(history.islandmates.length)) {
      islandmatesMap.set(history.islandmates.length, {
        trait: history.islandmates.length.toString(),
        count: 0,
        villagers: [],
        duration: history.islandmates.length,
      });
    }
    const tmp4 = islandmatesMap.get(history.islandmates.length)!;
    tmp4.count++;
    tmp4.villagers.push(history.name);
    timelineLabels.push(history.name);
    timelineData.push([
      history.startDateDate.valueOf(),
      history.endDateDate.valueOf(),
    ]);
    timelineColors.push('#' + nookipediaData.get(history.name)?.title_color!);
    timelineData2.push(history.duration);
    timelineNameMap.set(history.name, i);
  });

  const speciesData = Array.from(speciesMap.values());
  speciesData.sort((a, b) => b.count - a.count);
  const personalityData = Array.from(personalityMap.values());
  personalityData.sort((a, b) => b.count - a.count);
  const genderData = Array.from(genderMap.values());
  genderData.sort((a, b) => b.count - a.count);
  const photoData = Array.from(photoMap.values());
  photoData.sort((a, b) => a.duration - b.duration);
  photoStats.average /= photoStats.count;
  const islandmatesData = Array.from(islandmatesMap.values());
  islandmatesData.sort((a, b) => b.duration - a.duration);
  const durationData = Array.from(durationMap.values());
  durationData.sort((a, b) => b.duration - a.duration);

  const noPhotoData = Array.from(noPhotoMap.values());
  noPhotoData.sort((a, b) => b.duration - a.duration);

  photoStats2.longestWithoutGiving = noPhotoData[0];
  photoStats2.longestAfterGiving.trait =
    photoStats2.longestAfterGiving.duration.toString();
  photoStats2.shortestAfterGiving.trait =
    photoStats2.shortestAfterGiving.duration.toString();

  const timelineData3: number[] = [];
  const timelineLabels3: string[] = [];
  const timelineColors3: string[] = [];
  const timelineNameMap3: Map<string, number> = new Map();

  let i = 0;

  for (const duration of durationData) {
    for (const villager of duration.villagers) {
      timelineLabels3.push(villager);
      timelineData3.push(duration.duration);
      timelineColors3.push('#' + nookipediaData.get(villager)?.title_color!);
      timelineNameMap3.set(villager, i);
      i++;
    }
  }

  return {
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    durationData,
    noPhotoData,
    photoStats2,
    timelineColors,
    timelineColors3,
    timelineData,
    timelineData2,
    timelineData3,
    timelineLabels,
    timelineLabels3,
    timelineNameMap,
    timelineNameMap3,
  };
}

export default cache(calculateStats);
