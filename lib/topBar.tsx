'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Image from 'next/image';
import { MouseEvent, useContext, useState } from 'react';
import FavIcon from '../public/lasagnark8.png';
import { ScreenContext } from './screenContext';

const pages = ['Villagers', 'Timeline', 'Stats', 'About'];

export default function TopBar() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { smallScreen } = useContext(ScreenContext)

  return (<>
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      <AppBar color="secondary">
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                onClick={handleClick}
                sx={{
                  ':hover': {
                    bgcolor: "success.main",
                  }
                }}>
                <MenuIcon/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {pages.map((page) => <MenuItem
                  key={page}
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{
                    bgcolor: 'secondary.main',
                    ':hover': {
                      bgcolor: "success.main",
                    },
                  }}
                >
                  {page}
                </MenuItem>)}
              </Menu>
            </Box>
            <IconButton
              size="small"
              sx={{
                mr: 1,
                ':hover': {
                  bgcolor: "success.main"
                }
              }}
            >
              <Image
                src={FavIcon}
                alt="Animal Crossing Leaf"
                height={45}
              />
            </IconButton>
            <Typography
              variant="title"
              sx={{cursor: "pointer"}}
              component={smallScreen ? 'h4': 'h2'}
            >
              My Animal Crossing Island
            </Typography>
            <Box sx={{flexGrow: 1}}/>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    color: 'black',
                    bgcolor: 'secondary.main',
                    ml: 1,
                    ':hover': {
                      bgcolor: "success.main",
                    },
                  }}
                  variant='navButton'
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
    <Toolbar />
  </>)
}