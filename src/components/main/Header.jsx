import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import Login from './Login'
import {createCookie, isLoged} from '../../utils/helper'
import {withRouter} from 'react-router'

const Header = (props) => {
  let auth = isLoged()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor: '#106cc8'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {props.title}
          </Typography>

          <div style={{width: '92%', textAlign: '-webkit-right'}}>
            {auth.login ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>{auth.data.name}</MenuItem>
                  <MenuItem
                    onClick={() => {
                      createCookie(`data-user`, null, 7)
                      props.history.push('/')
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                style={{color: 'rgb(16, 108, 200)'}}
              >
                Login{' '}
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Login open={open} handleClose={() => setOpen(false)} />
    </Box>
  )
}

export default withRouter(Header)
