import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

import { CryptoState } from "../../context/CryptoContext";

interface LoginProps {
  handleClose: () => void;
}

const Login = ({ handleClose }: LoginProps) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { setAlert } = CryptoState()

  const handleSubmit = async () => {
    console.log(email,password);
    
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the Fields',
        type: 'error',
      })
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      setAlert({
        open: true,
        message: `Login Successful. Welcom ${result.user.email}`,
        type: 'success',
      })

      handleClose()
    } catch (error: any ) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
      return
    }
  }

  return (
      <Box sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    )
  }

  export default Login
