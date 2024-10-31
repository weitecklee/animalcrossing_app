import { DataContext } from '@/lib/dataContext';
import editMongo from '@/lib/editMongo';
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const EditFieldRow = ({
  label,
  value,
  setValue,
  initialValue,
  error,
}: {
  label: string;
  value: string;
  setValue: (s: string) => void;
  initialValue: string;
  error: boolean;
}) => (
  <Stack direction="row" gap={1}>
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputLabelProps={{ shrink: true }}
      sx={{ height: '100%', width: '17rem' }}
      error={error}
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
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialStartDate = history?.startDateString || '';
  const initialEndDate = history?.endDateString || '';
  const initialPhotoDate = history?.photoDateString || '';

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setPhotoDate(initialPhotoDate);
  }, [history]);

  const handleDismissSnackbar = () => {
    setErrorMessage('');
  };

  const handleConfirm = async () => {
    const errorMessages: string[] = [];
    if ((endDate || photoDate) && !startDate) {
      setStartError(true);
      errorMessages.push('Move-in Date is required');
    } else {
      setStartError(false);
    }
    if (photoDate && photoDate < startDate) {
      setPhotoError(true);
      errorMessages.push('Photo Date must be after Move-in Date');
    } else {
      setPhotoError(false);
    }
    if (photoDate && endDate && photoDate > endDate) {
      setPhotoError(true);
      errorMessages.push('Photo Date must be before Move-out Date');
    } else {
      setPhotoError(false);
    }
    if (endDate && endDate < startDate) {
      setEndError(true);
      errorMessages.push('Move-out Date must be after Move-in Date');
    }
    if (errorMessages.length) {
      setErrorMessage(errorMessages.join(', '));
      return;
    }
    setErrorMessage('');
    const editOptions = {
      name: villager,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      photoDate: photoDate ?? null,
    };
    await editMongo(editOptions).then(refreshData);
  };

  return (
    <Stack gap={2} width="30rem">
      <EditFieldRow
        label="Move-in Date"
        value={startDate}
        setValue={setStartDate}
        initialValue={initialStartDate}
        error={startError}
      />
      <EditFieldRow
        label="Photo Date"
        value={photoDate}
        setValue={setPhotoDate}
        initialValue={initialPhotoDate}
        error={photoError}
      />
      <EditFieldRow
        label="Move-out Date"
        value={endDate}
        setValue={setEndDate}
        initialValue={initialEndDate}
        error={endError}
      />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm Edits
      </Button>
      <Snackbar open={!!errorMessage} onClose={handleDismissSnackbar}>
        <Alert
          severity="error"
          variant="filled"
          onClose={handleDismissSnackbar}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
