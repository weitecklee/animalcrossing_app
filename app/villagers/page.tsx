'use client';

import VillagerCard from './villagerCard';
import nookipediaData from '@/lib/nookipediaData';
import { Box, Fab, Fade, Grid, Stack } from '@mui/material';
import Legend from './legend';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '@/lib/dataContext';
import Loading from '@/app/loading';
import {
  KeyboardDoubleArrowDownRounded,
  KeyboardDoubleArrowUpRounded,
} from '@mui/icons-material';

export default function Villagers() {
  const { historyMap } = useContext(DataContext);
  const [showScroll, setShowScroll] = useState(false);
  const timeoutID = useRef<NodeJS.Timeout>(undefined);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setShowScroll(true);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setShowScroll(false);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!!historyMap.size ? (
        <Box position="relative">
          <Legend />
          <Grid container spacing={2} py={2} justifyContent="center">
            {Array.from(historyMap.values()).map((history) => (
              <VillagerCard
                key={history.name}
                history={history}
                villagerData={nookipediaData.get(history.name)!}
              />
            ))}
          </Grid>
          <Box ref={bottomRef}>
            <Legend />
          </Box>
          <Fade in={showScroll}>
            <Box position="absolute" right="8px">
              <Stack
                spacing={2}
                position="fixed"
                top="50%"
                sx={{
                  transform: 'translate(-100%, -50%)',
                }}
              >
                <Fab
                  size="small"
                  color="secondary"
                  sx={{
                    ':hover': {
                      bgcolor: 'white',
                    },
                  }}
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <KeyboardDoubleArrowUpRounded />
                </Fab>
                <Fab
                  size="small"
                  color="secondary"
                  sx={{
                    ':hover': {
                      bgcolor: 'white',
                    },
                  }}
                  onClick={() => {
                    bottomRef.current!.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <KeyboardDoubleArrowDownRounded />
                </Fab>
              </Stack>
            </Box>
          </Fade>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
}
