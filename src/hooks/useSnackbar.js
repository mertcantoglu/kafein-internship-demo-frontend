import { useState, useCallback } from 'react';

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarOpen = useCallback((message, severity) => {
    setSnackbarState({ open: true, message, severity });
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return {
    snackbarState,
    handleSnackbarOpen,
    handleSnackbarClose,
  };
};

export default useSnackbar;
