import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';

import { CryptoState } from '../../context/CryptoContext';
import { auth } from '../../lib/firebase';

// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'right';

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert } = CryptoState();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successful!',
    });

    toggleDrawer('right', false);
  };

  return (
    <>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              cursor: 'pointer',
              backgroundColor: '#EEBC1D',
            }}
            src={user?.photoURL || ''}
            alt={user?.displayName || user?.email || 'userName'}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: 350,
                padding: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'monospace',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  height: '92%',
                }}
              >
                <Avatar
                  sx={{
                    height: 200,
                    width: 200,
                    cursor: 'pointer',
                    backgroundColor: '#EEBC1D',
                    objectFit: 'contain',
                  }}
                  src={user?.photoURL || ''}
                  alt={user?.displayName || user?.email || 'userName'}
                />
                <span
                  style={{
                    width: '100%',
                    fontSize: 25,
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  {user?.displayName || user?.email}
                </span>
                <Box
                  sx={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'grey',
                    borderRadius: 10,
                    p: 2,
                    pt: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    overflowY: 'scroll',
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: '0 0 5p black' }}>
                    Watchlist
                  </span>
                </Box>
              </Box>
              <Button
                variant='contained'
                onClick={logOut}
                sx={{
                  height: '8%',
                  width: '100%',
                  backgroundColor: '#EEBC1D',
                  mt: 3,
                }}
                fullWidth
              >
                Log Out
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
