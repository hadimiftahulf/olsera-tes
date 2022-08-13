import React, {useEffect} from 'react'
import NotFound from '../pages/error/NotFoundComponent'
import {isLoged} from '../utils/helper'

const Main = (props) => {
  const WrapperComponent = props.children
  useEffect(() => {
    props.setTitle(props.settings.title)
  }, props.settings)
  if (props.settings) {
    const config = props.settings
    const auth = isLoged().login
    return config.needLogin ? (
      auth ? (
        <WrapperComponent {...props} />
      ) : (
        <NotFound />
      )
    ) : (
      <WrapperComponent {...props} />
    )
  } else {
    return <NotFound />
  }
}

export default Main
