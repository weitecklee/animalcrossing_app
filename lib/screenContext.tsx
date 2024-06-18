'use client';

import { createContext, ReactNode } from 'react';
import useScreen from './useScreen';

export const ScreenContext = createContext({
  mediumScreen: false,
  smallScreen: false,
});

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const screen = useScreen();
  return (
    <ScreenContext.Provider value={screen}>{children}</ScreenContext.Provider>
  );
};
