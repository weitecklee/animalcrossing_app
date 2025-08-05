'use client';

import { use, useContext, useEffect } from 'react';
import { StateContext } from '@/lib/stateContext';

type Params = Promise<{ villager: string }>;

export default function VillagerDialog({ params }: { params: Params }) {
  const { setDialogActive, setDialogVillager } = useContext(StateContext);

  const paramsUsed = use(params);

  useEffect(() => {
    setDialogActive(true);
    return () => {
      setDialogActive(false);
    };
  }, [setDialogActive]);

  useEffect(() => {
    setDialogVillager(paramsUsed.villager);
  }, [setDialogVillager, paramsUsed]);

  return <></>;
}
