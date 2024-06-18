'use client';

import { useContext, useEffect } from 'react';
import { StateContext } from '@/lib/stateContext';

export default function VillagerDialog({
  params,
}: {
  params: { villager: string };
}) {
  const { setDialogActive, setDialogVillager } = useContext(StateContext);

  useEffect(() => {
    setDialogActive(true);
    return () => {
      setDialogActive(false);
    };
  }, [setDialogActive]);

  useEffect(() => {
    setDialogVillager(params.villager);
  }, [setDialogVillager, params]);

  return <></>;
}
