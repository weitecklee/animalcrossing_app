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
import { useState } from 'react';
import VillagerPage from '../villagers/[villager]/page';
import logout from './logout';
import { useRouter } from 'next/navigation';
import EditInfo from './editInfo';
import { fixName } from '@/lib/functions';
import VillagerInfo from '../villagers/[villager]/villagerInfo';

export default function EditVillager() {
  const [inputValue, setInputValue] = useState<string>('');
  const [villager, setVillager] = useState<string | null>('');
  const router = useRouter();

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
      <Autocomplete
        freeSolo
        options={NAMES}
        sx={{ width: '13rem' }}
        inputValue={inputValue}
        onInputChange={(e, name) => setInputValue(name)}
        value={villager}
        onChange={(e, name) => setVillager(name)}
        renderInput={(params) => <TextField {...params} label="Villager" />}
      />
      {villager && (
        <Grid container justifyContent="center" spacing={4}>
          <VillagerInfo params={{ villager: fixName(villager) }} />
        </Grid>
      )}
      {villager && <EditInfo villager={villager} />}
    </Stack>
  );
}
