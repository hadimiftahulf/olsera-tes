import React from 'react'
import {Flex} from './Styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {useState} from 'react'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

export default function Content({data, favorite, page, setOpen}) {
  const [isFavorite, setFavorite] = useState(favorite)
  const [anchorEl, setAnchorEl] = React.useState()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const HandleChange = () => {
    setFavorite(!isFavorite)
  }
  return (
    <>
      <Flex
        direction={'row'}
        content={'space-between'}
        style={{padding: '20px'}}
      >
        <Flex
          direction={'column'}
          style={{cursor: 'pointer'}}
          onClick={() =>
            setOpen({
              open: true,
              data: data,
            })
          }
        >
          <Typography style={{fontSize: '18px'}}>{data.title}</Typography>
          <Typography style={{fontSize: '18px'}}>{data.body}</Typography>
        </Flex>
        {page === 'admin' ? (
          <>
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
              <MenuItem>Edit</MenuItem>
              <MenuItem style={{color: 'red'}}>Delete</MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={HandleChange}
          >
            {isFavorite ? (
              <FavoriteIcon style={{color: 'red'}} />
            ) : (
              <FavoriteBorderIcon style={{color: 'red'}} />
            )}
          </IconButton>
        )}
      </Flex>
    </>
  )
}
