import { Chip, ChipProps, Divider } from "@mui/material";

export default function StatsDivider(props: ChipProps) {
  return <Divider sx={{pt: 2, pb: 1}}>
    <Chip  {...props} color="secondary" />
  </Divider>
}
