import React, {useEffect} from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import DataService from '../services/DataService'
import {Divider} from '@material-ui/core'

const DetailContent = (props) => {
  const {open, handleClose, dataDetail} = props
  const [data, setData] = React.useState([])
  useEffect(() => {
    if (data.length === 0 && dataDetail !== null) {
      DataService.getListDetail(dataDetail?.id)
        .then((res) => {
          setData(res)
        })
        .catch((e) => console.log(e))
    }
  }, [props])
  console.log(data)
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose()
        setData([])
      }}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle style={{fontWeight: '600'}}>{dataDetail?.title}</DialogTitle>
      <DialogContent>
        <span>{dataDetail?.body}</span>
        <div
          style={{backgroundColor: ' #5e5d61', padding: ' 7px', color: 'white'}}
        >
          Comment
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {data.map((row) => {
            return (
              <>
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '17px',
                    padding: '5px',
                    backgroundColor: '#e7e7e7',
                  }}
                >
                  {row.name} - {row.email}
                </div>
                <div
                  style={{
                    padding: '10px 19px',
                  }}
                >
                  {row.body}
                </div>
                <Divider />
              </>
            )
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
            setData([])
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(DetailContent)
