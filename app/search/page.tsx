'use client';

import IconGrid from '@/components/iconGrid';
import IconGridAll from '@/components/iconGridAll';
import { NAMES, PERSONALITIES, SPECIES } from '@/lib/constants';
import searchByFilter from '@/lib/searchByFilter';
import { SearchOptions } from '@/types';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
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
  return !!(opt.name || opt.species.length || opt.personality.length);
}

export default function Page() {
  const [nameFilter, setNameFilter] = useState('');
  const debouncedNameFilter = useDebounce(nameFilter, 250);
  const [filteredVillagers, setFilteredVillagers] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    name: '',
    species: [],
    personality: [],
  });
  const [conductSearch, setConductSearch] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (checkSearchOptions(searchOptions)) {
      setConductSearch(true);
      searchByFilter(searchOptions).then((res) => {
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
