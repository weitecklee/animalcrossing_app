'use client';

import IconGrid from '@/components/iconGrid';
import { NAMES } from '@/lib/constants';
import searchByFilter from '@/lib/searchByFilter';
import { Autocomplete, Box, TextField } from '@mui/material';
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

  useEffect(() => {
    if (debouncedNameFilter) {
      searchByFilter(debouncedNameFilter).then((res) => {
        setFilteredVillagers(res);
      });
    } else {
      setFilteredVillagers([]);
    }
  }, [debouncedNameFilter]);

  return (
    <>
      <TextField
        label="Name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <IconGrid villagers={filteredVillagers} />
    </>
  );
}
