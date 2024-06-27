'use client';

import IconGrid from '@/components/iconGrid';
import IconGridAll from '@/components/iconGridAll';
import { NAMES, PERSONALITIES, SPECIES } from '@/lib/constants';
import searchLocal from '@/lib/searchLocal';
import searchMongo from '@/lib/searchMongo';
import { SearchOptions } from '@/types';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

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
  const [shouldUseMongo, setShouldUseMongo] = useState(false);

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (checkSearchOptions(searchOptions)) {
      setConductSearch(true);
      console.time('search');
      if (shouldUseMongo) {
        searchMongo(searchOptions).then((res) => {
          if (res.length) {
            setResultsFound(true);
            setFilteredVillagers(res);
          } else {
            setResultsFound(false);
          }
          console.timeEnd('search');
        });
      } else {
        searchLocal(searchOptions).then((res) => {
          if (res.length) {
            setResultsFound(true);
            setFilteredVillagers(res);
          } else {
            setResultsFound(false);
          }
          console.timeEnd('search');
        });
      }
    } else {
      setConductSearch(false);
      setFilteredVillagers([]);
    }
  }, [searchOptions, shouldUseMongo]);

  return (
    <>
      <Grid container spacing={1} paddingY={1}>
        <Grid item>
          <Autocomplete
            freeSolo
            options={NAMES}
            sx={{ width: '15rem' }}
            inputValue={nameFilter}
            onInputChange={(e, name) => setNameFilter(name)}
            renderInput={(params) => <TextField {...params} label="Name" />}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={SPECIES}
            sx={{ width: '15rem' }}
            value={searchOptions.species}
            onChange={(e, species) =>
              setSearchOptions((prev) => ({ ...prev, species }))
            }
            renderInput={(params) => <TextField {...params} label="Species" />}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={PERSONALITIES}
            sx={{ width: '15rem' }}
            value={searchOptions.personality}
            onChange={(e, personality) =>
              setSearchOptions((prev) => ({ ...prev, personality }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Personality" />
            )}
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
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={shouldUseMongo}
                onChange={(e) => setShouldUseMongo(e.target.checked)}
              />
            }
            label="Mongo"
          />
        </Grid>
      </Grid>
      {conductSearch ? (
        resultsFound ? (
          <IconGrid villagers={filteredVillagers} />
        ) : (
          <Typography>No results.</Typography>
        )
      ) : (
        <IconGridAll />
      )}
    </>
  );
}
