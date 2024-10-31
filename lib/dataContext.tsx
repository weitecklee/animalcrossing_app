'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import assembleData from './assembleData';
import { CalculatedStats, DataContextProps } from '@/types';
import calculateStats from './calculateStats';

const refreshData = () => {};

export const DataContext = createContext({
  historyMap: new Map(),
  eventsData: [],
  calculatedStats: {} as CalculatedStats,
  refreshData,
} as DataContextProps);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState({
    historyMap: new Map(),
    eventsData: [],
    calculatedStats: {} as CalculatedStats,
    refreshData,
  } as DataContextProps);

  const fetchData = () => {
    assembleData().then((res) => {
      setData({
        ...res,
        calculatedStats: calculateStats(res.historyMap),
        refreshData,
      });
    });
  };

  useEffect(fetchData, []);

  return (
    <DataContext.Provider value={{ ...data, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
