'use client';

import VillagerCard from "./villagerCard";
import nookipediaData from "@/lib/nookipediaData";
import { Grid } from "@mui/material";
import Legend from "./legend";
import { useContext } from "react";
import { DataContext } from "@/lib/dataContext";
import Loading from "../loading";

export default function Villagers() {

  const { historyMap } = useContext(DataContext);

  return <>
    <Legend />
    <Grid container spacing={2} py={2} justifyContent='center'>
      {!!historyMap ? Array.from(historyMap.values()).map((history) => (
        <VillagerCard
          key={history.name}
          history={history}
          villagerData={nookipediaData.get(history.name)!}
        />
      )) : <Grid item xs><Loading /></Grid>}
    </Grid>
    <Legend />
  </>

}