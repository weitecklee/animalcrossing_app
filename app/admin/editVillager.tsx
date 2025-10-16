'use client';

import { NAMES } from '@/lib/constants';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import logout from './logout';
import { useRouter } from 'next/navigation';
import EditInfo from './editInfo';
import { fixName } from '@/lib/functions';
import VillagerInfo from '../villagers/[villager]/villagerInfo';
import { DataContext } from '@/lib/dataContext';

export default function EditVillager() {
  const [inputValue, setInputValue] = useState<string>('');
  const [villager, setVillager] = useState<string | null>('');
  const router = useRouter();

  const { calculatedStats } = useContext(DataContext);
  const { currentResidents } = calculatedStats;

  return (
    <Stack spacing={2}>
      <Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            logout().then(() => {
              router.refresh();
            });
          }}
        >
          Logout
        </Button>
      </Box>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          options={currentResidents ?? []}
          sx={{ width: '13rem' }}
          inputValue={inputValue}
          onInputChange={(e, name) => setInputValue(name)}
          value={villager}
          onChange={(e, name) => setVillager(name)}
          renderInput={(params) => (
            <TextField {...params} label="Current Residents" />
          )}
        />
        <Autocomplete
          options={NAMES}
          sx={{ width: '13rem' }}
          inputValue={inputValue}
          onInputChange={(e, name) => setInputValue(name)}
          value={villager}
          onChange={(e, name) => setVillager(name)}
          renderInput={(params) => (
            <TextField {...params} label="All Villagers" />
          )}
        />
      </Stack>
      {villager && (
        <Grid container justifyContent="center" spacing={4}>
          <VillagerInfo params={{ villager: fixName(villager) }} />
        </Grid>
      )}
      {villager && <EditInfo villager={villager} />}
    </Stack>
  );
}
