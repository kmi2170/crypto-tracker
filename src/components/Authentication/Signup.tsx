import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { CryptoState } from "../../context/CryptoContext";
import { auth } from "../../lib/firebase";

interface SignupProps {
  handleClose: () => void;
}

const Signup = ({ handleClose }: SignupProps) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const { setAlert } = CryptoState()

  const handleSubmit = async () => {
    console.log(password, confirmPassword)
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error',
      })
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcom ${result.user.email}`,
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sing Up
      </Button>
    </Box>
  )
}

export default Signup
