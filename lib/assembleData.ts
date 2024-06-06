import {  EventDocument, History, } from "@/types";
import { calculateDays } from "./functions";
import getData from "./getData";
import { cache } from "react";

async function assembleData(): Promise<{
  histories: History[],
  eventsData: EventDocument[];
}> {

  const { eventsData, historyData } = await getData();

  historyData.sort((a, b) => a.startDate < b.startDate ? -1 : 1);

  const histories: History[] = historyData.map((doc) => {

    const history = {... doc} as History;
    history.startDateDate = new Date(history.startDate);
    history.startDateString = history.startDateDate.toLocaleDateString("en-ZA");

    if (!history.endDate) {
      history.currentResident = true;
      history.endDateDate = new Date();
      history.endDateDate.setHours(0, 0, 0);
      history.duration = calculateDays(history.startDateDate, history.endDateDate);
      history.endDateDate.setDate(history.endDateDate.getDate() + 30);
      history.endDateDate.setHours(0, 0, 0);
    } else {
      history.currentResident = false;
      history.endDateDate = new Date(history.endDate);
      history.duration = calculateDays(history.startDateDate, history.endDateDate);
    }
    history.endDateString = history.endDateDate.toLocaleDateString("en-ZA");

    if (history.photoDate) {
      history.photo = true
      history.photoDateDate = new Date(history.photoDate!);
      history.photoDateString = history.photoDateDate.toLocaleDateString("en-ZA");
      history.daysToPhoto = calculateDays(history.startDateDate, history.photoDateDate);
    } else {
      history.photo = false;
    }

    return history;

  });

  return {
    histories,
    eventsData,
  }

}

export default cache(assembleData)