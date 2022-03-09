import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from "@mui/material";

import { CryptoState } from "../context/CryptoContext"

const AlertMessage = () => {
  const { alert, setAlert } = CryptoState()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false })
  };


  return (
    <Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          elevation={10}
          variant="filled"
          severity={alert.type as AlertColor}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box >
  )
}

export default AlertMessage
