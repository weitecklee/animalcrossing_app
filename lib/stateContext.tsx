'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const StateContext = createContext<{
  showVillagerDialog: boolean,
  setShowVillagerDialog: Dispatch<SetStateAction<boolean>>,
  dialogVillager: string,
  setDialogVillager: Dispatch<SetStateAction<string>>,
}>({
  showVillagerDialog: false,
  setShowVillagerDialog: () => {},
  dialogVillager: '',
  setDialogVillager: () => {},
});

export const StateProvider = ({children}: {children: ReactNode}) => {

  const [showVillagerDialog, setShowVillagerDialog] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');

  return (
    <StateContext.Provider value={{
      showVillagerDialog,
      setShowVillagerDialog,
      dialogVillager,
      setDialogVillager,
    }}>
      {children}
    </StateContext.Provider>
  )
}