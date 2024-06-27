'use client';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import Image from 'next/image';
import {
  ElementType,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import FavIcon from '@/public/lasagnark8.png';
import { ScreenContext } from '@/lib/screenContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { coustard } from './theme';

const pages = ['Villagers', 'Timeline', 'Stats', 'Search', 'About'];

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const { smallScreen } = useContext(ScreenContext);
  const [titleComponent, setTitleComponent] = useState<ElementType<any>>('h2');
  useEffect(() => {
    setTitleComponent(smallScreen ? 'h4' : 'h2');
  }, [smallScreen]);
  const router = useRouter();

  return (
    <>
      <Slide appear={false} direction="down" in={!useScrollTrigger()}>
        <AppBar color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  onClick={handleClick}
                  sx={{
                    ':hover': {
                      bgcolor: 'success.main',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{ paper: { sx: { bgcolor: 'secondary.main' } } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        router.push(`/${page.toLowerCase()}`);
                        handleClose();
                      }}
                      sx={{
                        bgcolor: 'secondary.main',
                        ':hover': {
                          bgcolor: 'success.main',
                        },
                        fontFamily: coustard.style.fontFamily,
                      }}
                    >
                      {<Link href={`/${page.toLowerCase()}`}>{page}</Link>}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <IconButton
                size="small"
                sx={{
                  mr: 1,
                  ':hover': {
                    bgcolor: 'success.main',
                  },
                }}
                onClick={() => router.push('/')}
              >
                <Image
                  src={FavIcon}
                  alt="Animal Crossing Leaf"
                  height={45}
                  priority
                />
              </IconButton>
              <Typography
                variant="title"
                sx={{
                  cursor: 'pointer',
                }}
                component={titleComponent}
                onClick={() => router.push('/')}
              >
                My Animal Crossing Island
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{
                      color: 'black',
                      bgcolor: 'secondary.main',
                      ml: 1,
                      ':hover': {
                        bgcolor: 'success.main',
                      },
                    }}
                    variant="navButton"
                    onClick={() => router.push(`/${page.toLowerCase()}`)}
                  >
                    {<Link href={`/${page.toLowerCase()}`}>{page}</Link>}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}
