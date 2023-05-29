import { AppBar, Box, Toolbar, Typography} from '@mui/material'

export function Header() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Typography>Questionarios</Typography>        
        </Toolbar>
      </AppBar>
    </Box>
  )
}