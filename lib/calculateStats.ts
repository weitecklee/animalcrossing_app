import { Duration, EventDocument, History, PhotoStats, Trait } from "@/types";
import nookipediaData from "./nookipediaData";
import { calculateDays } from "./functions";
import getData from "./getData";
import { cache } from "react";

async function calculateStats(): Promise<{
  histories: History[],
  speciesData: Trait[];
  personalityData: Trait[];
  genderData: Trait[];
  photoData: Duration[];
  photoStats: PhotoStats;
  currentResidents: string[];
  islandmatesData: Duration[];
  eventsData: EventDocument[];
}> {

  const { eventsData, historyData } = await getData();

  const speciesMap: Map<string, Trait> = new Map();
  const personalityMap: Map<string, Trait> = new Map();
  const genderMap: Map<string, Trait> = new Map();
  const photoMap: Map<number, Duration> = new Map();
  const islandmatesMap: Map<number, Duration> = new Map();
  const photoStats: PhotoStats = {
    average: 0,
    count: 0,
  };
  const currentResidents: string[] = [];

  historyData.sort((a, b) => a.startDate < b.startDate ? -1 : 1);

  const histories: History[] = historyData.map((doc) => {
    const historyDatum = {... doc} as History;
    const startDateDate = new Date(historyDatum.startDate);
    if (!historyDatum.endDate) {
      historyDatum.currentResident = true;
      currentResidents.push(historyDatum.name);
    } else {
      historyDatum.currentResident = false;
    }
    if (historyDatum.photoDate) {
      historyDatum.photo = true
      const photoDateDate = new Date(historyDatum.photoDate);
      historyDatum.photoDateString = photoDateDate.toLocaleDateString("en-ZA");
      historyDatum.daysToPhoto = calculateDays(startDateDate, photoDateDate);
      photoStats.count++;
      photoStats.average += historyDatum.daysToPhoto;
      if (!photoMap.has(historyDatum.daysToPhoto)) {
        photoMap.set(historyDatum.daysToPhoto, {
          trait: historyDatum.daysToPhoto.toString(),
          count: 0,
          villagers: [],
          duration: historyDatum.daysToPhoto,
        })
      }
      const tmp = photoMap.get(historyDatum.daysToPhoto)!;
      tmp.count++;
      tmp.villagers.push(historyDatum.name);

    } else {
      historyDatum.photo = false;
    }
    historyDatum.startDateString = startDateDate.toLocaleDateString("en-ZA");
    const species = nookipediaData.get(historyDatum.name)!.species;
    if (!speciesMap.has(species)) {
      speciesMap.set(species, {
        trait: species,
        count: 0,
        villagers: [],
      });
    }
    const tmp = speciesMap.get(species)!;
    tmp.count++;
    tmp.villagers.push(historyDatum.name);
    const personality = nookipediaData.get(historyDatum.name)!.personality;
    if (!personalityMap.has(personality)) {
      personalityMap.set(personality, {
        trait: personality,
        count: 0,
        villagers: [],
      });
    }
    const tmp2 = personalityMap.get(personality)!;
    tmp2.count++;
    tmp2.villagers.push(historyDatum.name);
    const gender = nookipediaData.get(historyDatum.name)!.gender;
    if (!genderMap.has(gender)) {
      genderMap.set(gender, {
        trait: gender,
        count: 0,
        villagers: [],
      });
    }
    const tmp3 = genderMap.get(gender)!;
    tmp3.count++;
    tmp3.villagers.push(historyDatum.name);
    if (!islandmatesMap.has(historyDatum.islandmates.length)) {
      islandmatesMap.set(historyDatum.islandmates.length, {
        trait: historyDatum.islandmates.length.toString(),
        count: 0,
        villagers: [],
        duration: historyDatum.islandmates.length,
      });
    }
    const tmp4 = islandmatesMap.get(historyDatum.islandmates.length)!;
    tmp4.count++;
    tmp4.villagers.push(historyDatum.name);
    return historyDatum;

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

  return {
    histories,
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    eventsData,
  }

}

export default cache(calculateStats)