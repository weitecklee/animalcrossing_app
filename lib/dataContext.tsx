'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import assembleData from './assembleData';
import { CalculatedStats, DataContextProps } from '@/types';
import calculateStats from './calculateStats';

export const DataContext = createContext({
  historyMap: new Map(),
  eventsData: [],
  calculatedStats: {} as CalculatedStats,
} as DataContextProps);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    historyMap: new Map(),
    eventsData: [],
    calculatedStats: {} as CalculatedStats,
  } as DataContextProps);

  useEffect(() => {
    assembleData().then((res) => {
      setData({ ...res, calculatedStats: calculateStats(res.historyMap) });
    });
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
