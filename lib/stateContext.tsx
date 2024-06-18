'use client';

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export const StateContext = createContext({
  dialogActive: false,
  setDialogActive: () => {},
  dialogVillager: '',
  setDialogVillager: () => {},
} as {
  dialogActive: boolean;
  setDialogActive: Dispatch<SetStateAction<boolean>>;
  dialogVillager: string;
  setDialogVillager: Dispatch<SetStateAction<string>>;
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [dialogActive, setDialogActive] = useState(false);
  const [dialogVillager, setDialogVillager] = useState('');

  return (
    <StateContext.Provider
      value={{
        dialogActive,
        setDialogActive,
        dialogVillager,
        setDialogVillager,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
