import { AppBar, Box, Button, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'

export function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext)
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Typography>Questionarios</Typography>
          <Box>
            { isAuthenticated ? 
              <Button variant='text' sx={{color: "#FFF"}} onClick={handleLogout}>
                Logout
              </Button> 
              : 
              <Link to="/login">
                <Button variant="text" sx={{color: "#FFF"}}>
                  Login
                </Button>
              </Link>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}