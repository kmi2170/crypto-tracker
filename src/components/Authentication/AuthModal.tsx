import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Login from './Login';
import Signup from './Signup';
import { CryptoState } from '../../context/CryptoContext';
import { auth } from '../../lib/firebase';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
  borderRadius: 5,
};

function a11yProps(index: number) {
  return {
    id: `authModal-tab-${index}`,
    'aria-controls': `authModal-tabpanel-${index}`,
  };
}

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const { setAlert } = CryptoState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign In Successful. Welcome ${res.user.email}`,
          type: 'success',
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleOpen}
        sx={{
          width: 85,
          height: 40,
          backgroundColor: '#EEBC1D',
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <AppBar
              position='static'
              sx={{ backgroundColor: 'transparent', color: 'white' }}
            >
              <Tabs
                variant='fullWidth'
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{ borderRadius: 5 }}
              >
                <Tab label='Login' {...a11yProps(0)} />
                <Tab label='Sign Up' {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box
              sx={{
                p: 3,
                pt: 0,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: 2,
                fontSize: 20,
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
