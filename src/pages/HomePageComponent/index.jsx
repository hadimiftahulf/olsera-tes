import React, {useEffect} from 'react'
import Content from '../../components/assets/Content'
import InfiniteScroll from 'react-infinite-scroller'
import DataService from '../../components/services/DataService'
import {withRouter} from 'react-router-dom'
import DetailContent from '../../components/assets/DetailContent'

function HomePageComponent(props) {
  const [data, setData] = React.useState([])
  const [temp, setTemp] = React.useState([])
  const [open, setOpen] = React.useState({
    open: false,
    data: null,
  })

  const [hasMoreItems, setHasMoreItems] = React.useState(true)

  useEffect(() => {
    if (data.length > 0) {
      setData([...data, ...temp])
    }
  }, [temp])

  const loadUserList = (page) => {
    setTimeout(() => {
      DataService.getList(page)
        .then((res) => {
          const newList = res
          if (data.length === 0) {
            setData(newList)
          } else {
            setTemp(newList)
          }

          if (res.length === 0) {
            setHasMoreItems(false)
          } else {
            setHasMoreItems(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }, 1500)
  }
  let regexUrl = ''
  if (props.location.pathname) {
    const regexPattern = /[a-z0-9-]+/gm
    regexUrl = props.location.pathname.match(regexPattern)
  }
  return (
    <>
      <InfiniteScroll
        threshold={0}
        pageStart={0}
        loadMore={loadUserList}
        hasMore={hasMoreItems}
        loader={<div className="text-center">loading data ...</div>}
      >
        {data.length > 0 &&
          data.map((row, key) => (
            <Content
              key={key}
              data={row}
              favorite={true}
              page={regexUrl?.[0] || 'user'}
              setOpen={setOpen}
            />
          ))}
      </InfiniteScroll>
      {hasMoreItems ? (
        ''
      ) : (
        <div className="text-center">no data anymore ...</div>
      )}
      <DetailContent
        open={open.open}
        handleClose={() => setOpen({...open, open: false, data: null})}
        dataDetail={open.data}
      />
    </>
  )
}

export default withRouter(HomePageComponent)
