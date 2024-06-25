import { ImageProps } from 'next/image';
import { DialogProps, TooltipProps } from '@mui/material';

export interface HistoryDocument {
  name: string;
  startDate: string;
  endDate: string;
  photoDate?: string;
  houseNumber: number;
  islandmates: string[];
}

export interface EventDocument {
  date: string;
  villager: string;
  event: string;
}

interface NH_Details {
  image_url: string;
  photo_url: string;
  icon_url: string;
  quote: string;
  'sub-personality': string;
  catchphrase: string;
  clothing: string;
  clothing_variation: string;
  fav_styles: string[];
  fav_colors: string[];
  hobby: string;
  house_interior_url: string;
  house_exterior_url: string;
  house_wallpaper: string;
  house_flooring: string;
  house_music: string;
  house_music_note: string;
}

export interface NookipediaVillager {
  url: string;
  name: string;
  alt_name: string;
  title_color: string;
  text_color: string;
  id: string;
  image_url: string;
  species: string;
  personality: string;
  gender: string;
  birthday_month: string;
  birthday_day: string;
  sign: string;
  quote: string;
  phrase: string;
  prev_phrases: string[];
  clothing: string;
  islander: boolean;
  debut: string;
  appearances: string[];
  nh_details: NH_Details;
  ja_name: string;
  ja_phrase: string;
}

export interface Trait {
  trait: string;
  count: number;
  villagers: string[];
}

export interface Duration extends Trait {
  duration: number;
}

export interface History extends HistoryDocument {
  currentResident: boolean;
  photo: boolean;
  startDateString: string;
  photoDateString: string;
  daysToPhoto: number;
  duration: number;
  startDateDate: Date;
  endDateDate: Date;
  endDateString: string;
  photoDateDate: Date;
}

export interface PhotoStats {
  average: number;
  count: number;
}

export interface PhotoStats2 {
  shortestAfterGiving: Duration;
  longestAfterGiving: Duration;
  longestWithoutGiving: Duration;
}

export interface CalculatedStats {
  speciesData: Trait[];
  personalityData: Trait[];
  genderData: Trait[];
  photoData: Duration[];
  photoStats: PhotoStats;
  currentResidents: string[];
  islandmatesData: Duration[];
  durationData: Duration[];
  noPhotoData: Duration[];
  photoStats2: PhotoStats2;
  timelineColors: string[];
  timelineColors3: string[];
  timelineData: number[][];
  timelineData2: number[];
  timelineData3: number[];
  timelineLabels: string[];
  timelineLabels3: string[];
  timelineNameMap: Map<string, number>;
  timelineNameMap3: Map<string, number>;
}

export interface DataContextProps {
  historyMap: Map<string, History>;
  eventsData: EventDocument[];
}

export interface CustomDialogProps extends DialogProps {
  zIndex: number;
}

export interface CustomImageProps extends ImageProps {
  blurColor: string;
}

export interface VillagerTooltipProps extends Omit<TooltipProps, 'title'> {
  villager: string;
}

export interface SearchOptions {
  name: string;
  species: string[];
  personality: string[];
}

export interface SearchFilter {
  name?: { $regex: string; $options: string };
  species?: { $in: string[] };
  personality?: { $in: string[] };
}
