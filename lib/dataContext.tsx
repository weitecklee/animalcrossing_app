import { createContext, ReactNode } from "react";
import getData from "./getData";

const data = getData();

export const DataContext = createContext({});

export const DataProvider = ({ children}: {children: ReactNode}) => {

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}