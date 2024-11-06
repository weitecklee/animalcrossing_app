'use client';

import IconGrid from '@/components/iconGrid';
import IconGridAll from '@/components/iconGridAll';
import { NAMES, PERSONALITIES, SPECIES } from '@/lib/constants';
import useScreen from '@/lib/useScreen';
import { AdvancedSearchOptions, SearchOptions } from '@/types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import searchMongo, { advancedSearchMongo } from '@/lib/searchMongo';
import { dateISOFormatter } from '@/lib/functions';
import { theme } from '../theme';
import { ExpandMore } from '@mui/icons-material';

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function checkSearchOptions(opt: SearchOptions) {
  return !!(
    opt.name ||
    opt.species.length ||
    opt.personality.length ||
    opt.gender !== 'All'
  );
}

function checkAdvancedSearchOptions(opt: AdvancedSearchOptions) {
  return !!(opt.residence !== 'All' || opt.fromDate || opt.toDate);
}

export default function Page() {
  const [nameFilter, setNameFilter] = useState('');
  const debouncedNameFilter = useDebounce(nameFilter, 250);
  const [filteredVillagers, setFilteredVillagers] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    name: '',
    species: [],
    personality: [],
    gender: 'All',
  });
  const [conductSearch, setConductSearch] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);
  const [autocompleteSize, setAutocompleteSize] = useState<'small' | 'medium'>(
    'medium',
  );
  const { smallScreen } = useScreen();
  const [searching, setSearching] = useState(false);
  const initialFromDate = '2020-03-25';
  const initialToDate = dateISOFormatter(new Date());
  const [advancedSearchOptions, setAdvancedSearchOptions] =
    useState<AdvancedSearchOptions>({
      residence: 'All',
      fromDate: initialFromDate,
      toDate: initialToDate,
    });
  const [advancedSearchError, setAdvancedSearchError] = useState(false);

  const handleAdvancedSearch = () => {
    if (checkAdvancedSearchOptions(advancedSearchOptions)) {
      setConductSearch(true);
      setSearching(true);
      advancedSearchMongo(
        advancedSearchOptions,
        checkSearchOptions(searchOptions) ? searchOptions : null,
      ).then((res) => {
        setSearching(false);
        if (res.length) {
          setResultsFound(true);
          setFilteredVillagers(res);
        } else {
          setResultsFound(false);
        }
      });
    } else {
      setConductSearch(false);
      setFilteredVillagers([]);
    }
  };

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (checkSearchOptions(searchOptions)) {
      setConductSearch(true);
      setSearching(true);
      searchMongo(searchOptions).then((res) => {
        setSearching(false);
        if (res.length) {
          setResultsFound(true);
          setFilteredVillagers(res);
        } else {
          setResultsFound(false);
        }
      });
    } else {
      setConductSearch(false);
      setFilteredVillagers([]);
    }
  }, [searchOptions]);

  useEffect(() => {
    setAutocompleteSize(smallScreen ? 'small' : 'medium');
  }, [smallScreen]);

  useEffect(() => {
    setAdvancedSearchError(
      advancedSearchOptions.fromDate > advancedSearchOptions.toDate,
    );
  }, [advancedSearchOptions.fromDate, advancedSearchOptions.toDate]);

  return (
    <>
      <Grid
        container
        spacing={1}
        paddingY={1}
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Grid item xs={12} sm="auto">
          <Grid container spacing={2} direction={{ xs: 'row', sm: 'column' }}>
            <Grid item>
              <Autocomplete
                freeSolo
                options={NAMES}
                sx={{ width: '13rem' }}
                inputValue={nameFilter}
                onInputChange={(e, name) => setNameFilter(name)}
                renderInput={(params) => <TextField {...params} label="Name" />}
                size={autocompleteSize}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={SPECIES}
                sx={{ width: '13rem' }}
                value={searchOptions.species}
                onChange={(e, species) =>
                  setSearchOptions((prev) => ({ ...prev, species }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Species" />
                )}
                ChipProps={{ variant: 'outlined' }}
                size={autocompleteSize}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={PERSONALITIES}
                sx={{ width: '13rem' }}
                value={searchOptions.personality}
                onChange={(e, personality) =>
                  setSearchOptions((prev) => ({ ...prev, personality }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Personality" />
                )}
                ChipProps={{ variant: 'outlined' }}
                size={autocompleteSize}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{ width: '10rem' }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={searchOptions.gender}
                  onChange={(e) =>
                    setSearchOptions((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  label="Gender"
                  size={autocompleteSize}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                disableElevation
                color="inherit"
                variant="contained"
                onClick={() => {
                  setNameFilter('');
                  setSearchOptions({
                    name: '',
                    species: [],
                    personality: [],
                    gender: 'All',
                  });
                  setAdvancedSearchOptions({
                    residence: 'All',
                    fromDate: initialFromDate,
                    toDate: initialToDate,
                  });
                }}
              >
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Accordion sx={{ bgcolor: theme.palette.success.light }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  Advanced Search
                </AccordionSummary>
                <AccordionDetails>
                  <Stack gap={2}>
                    <FormControl sx={{ width: '10rem' }}>
                      <InputLabel>Residence</InputLabel>
                      <Select
                        value={advancedSearchOptions.residence}
                        onChange={(e) =>
                          setAdvancedSearchOptions((prev) => ({
                            ...prev,
                            residence: e.target.value,
                          }))
                        }
                        label="Residence"
                        size={autocompleteSize}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Residents only">
                          Residents only
                        </MenuItem>
                        <MenuItem value="Non-residents only">
                          Non-residents only
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Typography>Date Range of Residence</Typography>
                    <TextField
                      label="From"
                      type="date"
                      value={advancedSearchOptions.fromDate}
                      onChange={(e) =>
                        setAdvancedSearchOptions((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      sx={{ height: '100%', width: '13rem' }}
                      disabled={
                        advancedSearchOptions.residence === 'Non-residents only'
                      }
                      error={advancedSearchError}
                    />
                    <TextField
                      label="To"
                      type="date"
                      value={advancedSearchOptions.toDate}
                      onChange={(e) =>
                        setAdvancedSearchOptions((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      sx={{ height: '100%', width: '13rem' }}
                      disabled={
                        advancedSearchOptions.residence === 'Non-residents only'
                      }
                      error={advancedSearchError}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAdvancedSearch}
                      disabled={advancedSearchError}
                    >
                      Search
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          orientation={smallScreen ? 'horizontal' : 'vertical'}
          flexItem
          sx={{ padding: 1 }}
        />
        <Grid item xs data-testid="searchResults">
          {conductSearch ? (
            searching ? (
              <Loading />
            ) : resultsFound ? (
              <IconGrid villagers={filteredVillagers} />
            ) : (
              <Typography>No results.</Typography>
            )
          ) : (
            <IconGridAll />
          )}
        </Grid>
      </Grid>
    </>
  );
}
