import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";

export function Login() {
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: any) {
    event.preventDefault()
    const {data} = await api.post('auth/login', {document, password});

    console.log(data)
    localStorage.setItem('survey:user_token', data.access_token)

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