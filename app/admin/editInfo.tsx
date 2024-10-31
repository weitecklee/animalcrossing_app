import { DataContext } from '@/lib/dataContext';
import editMongo from '@/lib/editMongo';
import { Button, Stack, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

export default function EditInfo({ villager }: { villager: string }) {
  const { historyMap, refreshData } = useContext(DataContext);
  const history = historyMap.get(villager);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [photoDate, setPhotoDate] = useState<string>('');

  useEffect(() => {
    setStartDate(history?.startDateString || '');
    setEndDate(history?.endDateString || '');
    setPhotoDate(history?.photoDateString || '');
  }, [history]);

  const handleConfirm = async () => {
    const editOptions = {
      name: villager,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      photoDate: photoDate ?? null,
    };
    await editMongo(editOptions).then(refreshData);
  };

  return (
    <Stack gap={2} width="13rem">
      <TextField
        label="Move-in Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Photo Date"
        type="date"
        value={photoDate}
        onChange={(e) => setPhotoDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Move-out Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm Edits
      </Button>
    </Stack>
  );
}
