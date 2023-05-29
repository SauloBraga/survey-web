import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";

export function Login() {
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin } = useContext(AuthContext)

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log('login')
    await handleLogin(document, password);
  }


  return (
    <Box>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, pt: 4 }} component="form" onSubmit={handleSubmit}>
        <TextField
          label="CPF"
          type="text"
          value={document}
          onChange={(event) => setDocument(event.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" >Entrar</Button>
      </Box>
    </Box>
  )
}