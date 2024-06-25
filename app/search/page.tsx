'use client';

import IconGrid from '@/components/iconGrid';
import { NAMES, PERSONALITIES, SPECIES } from '@/lib/constants';
import searchByFilter from '@/lib/searchByFilter';
import { SearchOptions } from '@/types';
import { Autocomplete, TextField, Typography } from '@mui/material';
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

export default function Page() {
  const [nameFilter, setNameFilter] = useState('');
  const debouncedNameFilter = useDebounce(nameFilter, 500);
  const [filteredVillagers, setFilteredVillagers] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    name: '',
    species: null,
    personality: null,
  });

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (!Object.values(searchOptions).every((a) => !a)) {
      searchByFilter(searchOptions).then((res) => {
        setFilteredVillagers(res);
      });
    } else {
      setFilteredVillagers([]);
    }
  }, [searchOptions]);

  return (
    <>
      <TextField
        label="Name"
        value={nameFilter}
        sx={{ width: '20rem' }}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <Autocomplete
        options={SPECIES}
        sx={{ width: '20rem' }}
        value={searchOptions.species}
        onChange={(e, species) =>
          setSearchOptions((prev) => ({ ...prev, species }))
        }
        renderInput={(params) => <TextField {...params} label="Species" />}
      />
      <Autocomplete
        options={PERSONALITIES}
        sx={{ width: '20rem' }}
        value={searchOptions.personality}
        onChange={(e, personality) =>
          setSearchOptions((prev) => ({ ...prev, personality }))
        }
        renderInput={(params) => <TextField {...params} label="Personality" />}
      />
      {filteredVillagers.length ? (
        <IconGrid villagers={filteredVillagers} />
      ) : (
        <Typography>No results</Typography>
      )}
    </>
  );
}
