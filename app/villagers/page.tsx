import assembleData from "@/lib/assembleData";
import { Typography } from "@mui/material";

export default async function Villagers() {

  const { histories } = await assembleData();

  return <>
    {histories.map((history) => <Typography key={history.name}>
      {history.name}
    </Typography>)}
  </>

}