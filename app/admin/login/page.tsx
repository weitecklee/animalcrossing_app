'use client';

import { useState } from 'react';
import { login } from './actions';
import { Alert, Box, Snackbar } from '@mui/material';

export default function LoginPage() {
  const [loginError, setLoginError] = useState(false);
  const handleDismiss = () => setLoginError(false);
  const handleLogin = (formData: FormData) => {
    login(formData).catch((e) => setLoginError(true));
  };

  return (
    <Box>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={handleLogin}>Log in</button>
      </form>
      <Snackbar
        open={loginError}
        autoHideDuration={6000}
        onClose={handleDismiss}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={handleDismiss}
          sx={{ width: '100%' }}
          variant="filled"
        >
          There was an error logging in.
        </Alert>
      </Snackbar>
    </Box>
  );
}
