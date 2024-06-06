import nookipediaData from './nookipediaData';
import { calculateDays } from '../lib/functions';
import { Duration, History, PhotoStats2, PreparedData} from '@/types';

export default function prepareData(histories: History[]): PreparedData {

  const historyMap: Map<string,History> = new Map();
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
  }

  const timelineLabels: string[] = [];
  const timelineData: number[][] = [];
  const timelineColors: string[] = [];
  const durationMap: Map<number, Duration> = new Map();
  const timelineData2: number[] = [];
  const timelineNameMap: Map<string, number> = new Map();
  const noPhotoMap: Map<number, Duration> = new Map();
  let i = 0;

  for (const history of histories) {
    history.startDateDate = new Date(history.startDate);
    if (!history.endDate) {
      history.endDateDate = new Date();
      history.endDateDate.setHours(0, 0, 0);
      history.duration = calculateDays(history.startDateDate, history.endDateDate);
      history.endDateDate.setDate(history.endDateDate.getDate() + 30);
      history.endDateDate.setHours(0, 0, 0);
    } else {
      history.endDateDate = new Date(history.endDate);
      history.duration = calculateDays(history.startDateDate, history.endDateDate);
    }
    history.endDateString = history.endDateDate.toLocaleDateString("en-ZA");
    if (history.photo) {
      history.photoDateDate = new Date(history.photoDate!);
      const stayAfterGiving = calculateDays(history.photoDateDate, history.endDateDate);
      if (!history.currentResident) {
        if (stayAfterGiving < photoStats2.shortestAfterGiving.duration) {
          photoStats2.shortestAfterGiving.duration = stayAfterGiving;
          photoStats2.shortestAfterGiving.villagers = [history.name];
        } else if (stayAfterGiving === photoStats2.shortestAfterGiving.duration) {
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
      })
    }
    const tmpDuration = durationMap.get(history.duration)!;
    tmpDuration.count++;
    tmpDuration.villagers.push(history.name);
    historyMap.set(history.name, history);
    timelineLabels.push(history.name);
    timelineData.push([history.startDateDate.valueOf(), history.endDateDate.valueOf()])
    timelineColors.push('#' + nookipediaData.get(history.name)?.title_color!)
    timelineData2.push(history.duration);
    timelineNameMap.set(history.name, i);
    i++;
  }

  const durationData = Array.from(durationMap.values());
  durationData.sort((a, b) => b.duration - a.duration);

  const timelineData3: number[] = [];
  const timelineLabels3: string[] = [];
  const timelineColors3: string[] = [];
  const timelineNameMap3: Map<string, number> = new Map();
  i = 0;

  for (const duration of durationData) {
    for (const villager of duration.villagers) {
      timelineLabels3.push(villager);
      timelineData3.push(duration.duration);
      timelineColors3.push('#' + nookipediaData.get(villager)?.title_color!);
      timelineNameMap3.set(villager, i);
      i++;
    }
  }

  const noPhotoData = Array.from(noPhotoMap.values());
  noPhotoData.sort((a, b) => b.duration - a.duration);

  photoStats2.longestWithoutGiving = noPhotoData[0];
  photoStats2.longestAfterGiving.trait = photoStats2.longestAfterGiving.duration.toString();
  photoStats2.shortestAfterGiving.trait = photoStats2.shortestAfterGiving.duration.toString();

  return {
    durationData,
    historyMap,
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
  }
}