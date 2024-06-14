import { Box, Typography } from '@mui/material';
import { coustard, theme } from '@/app/theme';

export default function TitleChip({title}: {title: string}) {
  return <Box
    display="flex"
    justifyContent="center"
    mb={1}
    py={1}
    px={2}
    bgcolor={theme.palette.secondary.main}
    borderRadius={Number.MAX_SAFE_INTEGER}
  >
    <Typography fontFamily={coustard.style.fontFamily} fontSize='1.2rem'>{title}</Typography>
  </Box>}