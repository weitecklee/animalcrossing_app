import assembleData from "@/lib/assembleData";
import VillagerCard from "./villagerCard";
import nookipediaData from "@/lib/nookipediaData";
import { Grid } from "@mui/material";

export default async function Villagers() {

  const { histories } = await assembleData();

  return <>
    <Grid container spacing={2} py={2} justifyContent='center'>
      {histories.map((history) => (
          <VillagerCard
            key={history.name}
            history={history}
            villagerData={nookipediaData.get(history.name)!}
          />
      ))}
    </Grid>
  </>

}