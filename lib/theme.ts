'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Coustard, Montserrat } from "next/font/google";

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    boldSpan: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    boldSpan?: React.CSSProperties;
  }

  interface ButtonVariants {
    navButton: React.CSSProperties;
  }

  interface ButtonVariantsOptions {
    navButton?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    boldSpan: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    navButton: true;
  }
}

const montserrat = Montserrat({
  weight: 'variable',
  subsets: ["latin"],
});
const coustard = Coustard({
  weight: ['400'],
  subsets: ["latin"],
});

const theme0 = createTheme({
  palette: {
    primary: {
      main: "#418869",
    },
    secondary: {
      main: "#79d6c2",
    },
    success: {
      main: "#F5F7E1"
    }
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    title: {
      fontFamily: coustard.style.fontFamily, // Zilla Slab, Sanchez
    },
    boldSpan: {
      fontFamily: coustard.style.fontFamily, // Zilla Slab, Sanchez
    }
  },

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: coustard.style.fontFamily,
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: coustard.style.fontFamily,
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: coustard.style.fontFamily,
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'navButton' },
          style: {
            fontFamily: coustard.style.fontFamily,
            marginLeft: 1,
          }
        }
      ]
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },
  }
});

export const theme = responsiveFontSizes(theme0, {
  breakpoints: ['md'],
  factor: 2,
});

export const fadeTimeout = {
  appear: theme.transitions.duration.standard,
  enter: theme.transitions.duration.standard,
  exit: theme.transitions.duration.standard,
};