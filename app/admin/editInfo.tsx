import { DataContext } from '@/lib/dataContext';
import editMongo from '@/lib/editMongo';
import { Button, Stack, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const EditFieldRow = ({
  label,
  value,
  setValue,
  initialValue,
}: {
  label: string;
  value: string;
  setValue: (s: string) => void;
  initialValue: string;
}) => (
  <Stack direction="row" gap={1}>
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputLabelProps={{ shrink: true }}
      sx={{ height: '100%' }}
    />
    <Button
      onClick={() => setValue(initialValue)}
      variant="contained"
      color="info"
    >
      Reset
    </Button>
    <Button onClick={() => setValue('')} variant="contained" color="info">
      Clear
    </Button>
  </Stack>
);

export default function EditInfo({ villager }: { villager: string }) {
  const { historyMap, refreshData } = useContext(DataContext);
  const history = historyMap.get(villager);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [photoDate, setPhotoDate] = useState<string>('');

  const initialStartDate = history?.startDateString || '';
  const initialEndDate = history?.endDateString || '';
  const initialPhotoDate = history?.photoDateString || '';

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setPhotoDate(initialPhotoDate);
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
    <Stack gap={2} width="20rem">
      <EditFieldRow
        label="Move-in Date"
        value={startDate}
        setValue={setStartDate}
        initialValue={initialStartDate}
      />
      <EditFieldRow
        label="Photo Date"
        value={photoDate}
        setValue={setPhotoDate}
        initialValue={initialPhotoDate}
      />
      <EditFieldRow
        label="Move-out Date"
        value={endDate}
        setValue={setEndDate}
        initialValue={initialEndDate}
      />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm Edits
      </Button>
    </Stack>
  );
}
