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

function checkSearchOptions(opt: SearchOptions) {
  return opt.name || opt.species.length || opt.personality.length;
}

export default function Page() {
  const [nameFilter, setNameFilter] = useState('');
  const debouncedNameFilter = useDebounce(nameFilter, 500);
  const [filteredVillagers, setFilteredVillagers] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    name: '',
    species: [],
    personality: [],
  });

  useEffect(() => {
    setSearchOptions((prev) => ({ ...prev, name: debouncedNameFilter }));
  }, [debouncedNameFilter]);

  useEffect(() => {
    if (checkSearchOptions(searchOptions)) {
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
        multiple
        disableCloseOnSelect
        options={SPECIES}
        sx={{ width: '20rem' }}
        value={searchOptions.species}
        onChange={(e, species) =>
          setSearchOptions((prev) => ({ ...prev, species }))
        }
        renderInput={(params) => <TextField {...params} label="Species" />}
      />
      <Autocomplete
        multiple
        disableCloseOnSelect
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
