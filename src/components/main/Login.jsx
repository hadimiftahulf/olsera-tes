import React, {useEffect} from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Flex, TextFiledBox} from '../assets/Styles'
import axios from 'axios'
import {createCookie} from '../../utils/helper'
import {withRouter} from 'react-router-dom'

const Login = (props) => {
  const {open, handleClose} = props
  const [data, setData] = React.useState([])
  const [error, setError] = React.useState(false)
  const [values, setValues] = React.useState({
    userid: null,
    email: null,
  })

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/`)
        .then(({data}) => {
          setData(data)
        })
        .catch((error) => {})
    }
  }, [open])

  const handleSubmit = () => {
    if (data.length > 0) {
      const dataLogin = data.filter(
        (row) =>
          row.id === parseInt(values.userid) &&
          row.email.toLowerCase() === values.email.toLowerCase(),
      )
      if (dataLogin.length > 0) {
        createCookie(`data-user`, JSON.stringify(dataLogin[0]), 7)
        handleClose()
        props.history.push('/admin')
      } else {
        setError(true)
      }
    }
    setTimeout(() => {
      setError(false)
    }, 1000)
  }
  const handleChangeForm = (name) => (event) => {
    const _value = {
      ...values,
      [name]: event.target.value,
    }
    setValues(_value)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{fontWeight: '600'}}>Login</DialogTitle>
      <DialogContent>
        <Flex direction={'column'} style={{width: '400px'}}>
          <TextFiledBox
            id="standard-basic"
            label="userId"
            fullWidth
            value={values.userid}
            onChange={handleChangeForm('userid')}
          />
          <TextFiledBox
            id="standard-basic"
            label="email"
            fullWidth
            value={values.email}
            onChange={handleChangeForm('email')}
          />
          {error && (
            <span style={{color: 'red'}}>your user id and email are wrong</span>
          )}
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant={'contained'}
          style={{backgroundColor: '#106cc8', color: 'white'}}
          autoFocus
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(Login)
