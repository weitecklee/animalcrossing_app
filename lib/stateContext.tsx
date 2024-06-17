'use client';

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export const StateContext = createContext({
  dialogActive: false,
  setDialogActive: () => {},
} as {
  dialogActive: boolean,
  setDialogActive: Dispatch<SetStateAction<boolean>>,
});

export const StateProvider = ({ children }: {children: ReactNode}) => {

  const [dialogActive, setDialogActive] = useState(false);

  return (
    <StateContext.Provider value={{dialogActive, setDialogActive}}>
      {children}
    </StateContext.Provider>
  )
}