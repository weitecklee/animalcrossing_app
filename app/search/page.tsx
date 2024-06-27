'use client';

import IconGrid from '@/components/iconGrid';
import IconGridAll from '@/components/iconGridAll';
import { NAMES, PERSONALITIES, SPECIES } from '@/lib/constants';
import searchLocal from '@/lib/searchLocal';
import useScreen from '@/lib/useScreen';
import { SearchOptions } from '@/types';
import {
  Autocomplete,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from '../loading';

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

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (checkSearchOptions(searchOptions)) {
      setConductSearch(true);
      setSearching(true);
      searchLocal(searchOptions).then((res) => {
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
          </Grid>
        </Grid>
        <Divider
          orientation={smallScreen ? 'horizontal' : 'vertical'}
          flexItem
          sx={{ padding: 1 }}
        />
        <Grid item xs>
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
