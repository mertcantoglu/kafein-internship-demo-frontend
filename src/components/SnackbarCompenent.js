import React from 'react'
import { Alert, Snackbar } from '@mui/material';

const SnackbarCompenent = ({snackbarState , handleSnackbarClose}) => {
  return (
    <Snackbar
    open={snackbarState.open}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
  >
    <Alert onClose={handleSnackbarClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
      {snackbarState.message}
    </Alert>
  </Snackbar>
  )
}

export default SnackbarCompenent