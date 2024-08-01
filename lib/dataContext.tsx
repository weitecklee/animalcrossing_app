'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import assembleData from './assembleData';
import { DataContextProps } from '@/types';

export const DataContext = createContext({
  historyMap: new Map(),
  eventsData: [],
  popularityMap: new Map(),
} as DataContextProps);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    historyMap: new Map(),
    eventsData: [],
    popularityMap: new Map(),
  } as DataContextProps);

  useEffect(() => {
    assembleData().then((res) => setData(res));
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
