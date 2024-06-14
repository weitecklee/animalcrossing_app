'use client';

import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import ViewTimelineRoundedIcon from '@mui/icons-material/ViewTimelineRounded';
import { Alert, Badge, Box, Button, Snackbar } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Zoom from 'chartjs-plugin-zoom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Draggable from 'react-draggable';
import { DataContext } from "@/lib/dataContext";
import TimelineTooltip from './timelineTooltip';
import { ScreenContext } from '@/lib/screenContext';
import calculateStats from '@/lib/calculateStats';
import { StateContext } from '@/lib/stateContext';
import nookipediaData from '@/lib/nookipediaData';
import { coustard } from '@/app/theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  TimeScale,
  Zoom,
);

const options = {
  indexAxis: 'y' as const ,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 1,
      borderSkipped: false,
      borderColor: '#000',
      borderRadius: Number.MAX_SAFE_INTEGER,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original', minRange: 86400000 * 365 },
        y: { min: 'original', max: 'original', minRange: 20 },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      min: new Date('2020/03/25').valueOf() - 86400000,
      max: new Date().valueOf() + 86400000,
      time: {
        minUnit: 'month',
        displayFormats: {
          day: 'MMM d yyyy',
        },
      },
    },
    y: {
      display: false,
    }
  }
} as any;

const options2 = JSON.parse(JSON.stringify(options));
options2.plugins.zoom.limits = {
  x: { min: 'original', max: 'original', minRange: 30 },
  y: { min: 'original', max: 'original', minRange: 20 },
};

export default function Timeline() {

  const { historyMap } = useContext(DataContext);
  const { setDialogVillager } = useContext(StateContext);

  const {
    timelineColors,
    timelineColors3,
    timelineData,
    timelineData2,
    timelineData3,
    timelineLabels,
    timelineLabels3,
    timelineNameMap,
    timelineNameMap3,
  } = calculateStats(historyMap);
  const { smallScreen } = useContext(ScreenContext);

  const [timelineVillager, setTimelineVillager] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [timelineMode, setTimelineMode] = useState(0);
  const [barData, setBarData] = useState<number[][] | number[]>(timelineData);
  const [barLabels, setBarLabels] = useState(timelineLabels);
  const [barColors, setBarColors] = useState(timelineColors);
  const [barBackground, setBarBackground] = useState<number[][] | number[]>([0]);
  const lastBackgroundIndex = useRef(0);
  const lastBackgroundIndex2 = useRef(0);
  const lastBackgroundIndex3 = useRef(0);
  const timelineBackground = useRef<number[][]>(Array(historyMap.size).fill([]));
  const timelineBackground2 = useRef<number[]>(Array(historyMap.size).fill(0));
  const timelineBackground3 = useRef<number[]>(Array(historyMap.size).fill(0));

  useEffect(() => {
    options.plugins.tooltip.external = ({ tooltip }: { tooltip: any }) => {
      if (tooltip && tooltip.title) {
        setTimelineVillager(tooltip.title[0]);
        setShowTooltip(true);
      }
    };
    options2.plugins.tooltip.external = options.plugins.tooltip.external;
    options2.scales.x = {
      min: 0,
      max: Math.ceil(Math.max(... timelineData2) / 10 + .5) * 10,
    };
  }, [timelineData2]);

  const [barOptions, setBarOptions] = useState(options);

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  useEffect(() => {
    setOpenSnackbar(smallScreen);
  }, [smallScreen]);

  useEffect(() => {
    setDialogVillager(timelineVillager);
  }, [timelineVillager, setDialogVillager]);

  useEffect(() => {
    if (timelineMode === 0) {
      setBarOptions(options);
      setBarData(timelineData);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 1) {
      setBarOptions(options2);
      setBarData(timelineData2);
      setBarColors(timelineColors);
      setBarLabels(timelineLabels);
    } else if (timelineMode === 2) {
      setBarOptions(options2);
      setBarData(timelineData3);
      setBarColors(timelineColors3);
      setBarLabels(timelineLabels3);
    }

  }, [timelineMode, timelineData, timelineData2, timelineData3, timelineColors, timelineColors3, timelineLabels, timelineLabels3]);

  useEffect(() => {
    if (timelineVillager === '') {
      return;
    }
    if (timelineMode === 0) {
      timelineBackground.current[lastBackgroundIndex.current] = [];
      lastBackgroundIndex.current = timelineNameMap.get(timelineVillager)!;
      timelineBackground.current[lastBackgroundIndex.current] = [options.scales.x.min, options.scales.x.max];
      setBarBackground(timelineBackground.current);
    } else if (timelineMode === 1) {
      timelineBackground2.current[lastBackgroundIndex2.current] = 0;
      lastBackgroundIndex2.current = timelineNameMap.get(timelineVillager)!;
      timelineBackground2.current[lastBackgroundIndex2.current] = options2.scales.x.max;
      setBarBackground(timelineBackground2.current);
    } else if (timelineMode === 2) {
      timelineBackground3.current[lastBackgroundIndex3.current] = 0;
      lastBackgroundIndex3.current = timelineNameMap3.get(timelineVillager)!;
      timelineBackground3.current[lastBackgroundIndex3.current] = options2.scales.x.max;
      setBarBackground(timelineBackground3.current);
    }
  }, [timelineVillager, timelineMode, timelineNameMap, timelineNameMap3]);

  return <Box sx={{
    position: "relative",
    width: "100%",
    height: 'calc(100vh - 88px)',
  }}>
    <Snackbar
      open={openSnackbar}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity="warning"
        onClose={handleClose}
        sx={{
          width: "100%"
        }}
      >
        This page is best viewed on a large screen.
      </Alert>
    </Snackbar>
    <Bar
      data={{
        labels: barLabels,
        datasets: [
          {
            label: 'Villagers',
            data: barData,
            backgroundColor: barColors,
            grouped: false,
          },
          {
            label: 'Background',
            data: barBackground,
            backgroundColor: 'rgba(0, 0, 0, .25)',
            borderWidth: 0,
            borderRadius: 0,
            grouped: false,
            barPercentage: 1,
            categoryPercentage: 1,
            animation: false,
          },
        ]
      }}
      options={barOptions}
    />
    {showTooltip &&
      <TimelineTooltip
        villagerData={nookipediaData.get(timelineVillager)!}
        history={historyMap.get(timelineVillager)!}
      />
    }
    <Draggable
      handle="#dragFab"
      bounds="parent"
      cancel="#changeViewButton"
    >
      <Box
        sx={{
          position: "absolute",
          right: "1%",
          top: "50%",
        }}
      >
        <Badge
          id="dragFab"
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          badgeContent={<OpenWithRoundedIcon
            fontSize='small'
            sx={{
              cursor: 'grab',
              '&:hover': {
                cursor: 'grab',
              },
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          />}
        >
          <Button
            id="changeViewButton"
            variant="contained"
            color="secondary"
            startIcon={<ViewTimelineRoundedIcon />}
            onClick={() => {
              setTimelineMode((mode) => mode === 2 ? 0 : (mode + 1));
            }}
            sx={{
              boxShadow: 5,
              display: smallScreen ? "none" : "",
              ':hover': {
                bgcolor: "white"
              },
              fontFamily: coustard.style.fontFamily,
            }}
          >
            {timelineMode === 0 ? "Timeline view" : timelineMode === 1 ? "Lined-up view" : "Sorted view"}
          </Button>
          <Button
            id="changeViewButton"
            variant="contained"
            color="secondary"
            onClick={() => {
              setTimelineMode((mode) => mode === 2 ? 0 : (mode + 1));
            }}
            sx={{
              boxShadow: 5,
              display: smallScreen ? "" : "none",
              ':hover': {
                bgcolor: "white"
              },
            }}
          >
            <ViewTimelineRoundedIcon />
          </Button>
        </Badge>
      </Box>
    </Draggable>
  </Box>
}