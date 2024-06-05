import { useMediaQuery, useTheme } from "@mui/material";

const useScreen = () => {
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return {mediumScreen, smallScreen}

}

export default useScreen;