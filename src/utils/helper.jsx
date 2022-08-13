export function createCookie(name, value, days) {
  let expires
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie = name + '=' + value + expires + '; path=/; domain=localhost'
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) {
        c_end = document.cookie.length
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}

export function isLoged() {
  const dataCK = getCookie(`data-user`)
  const cookie = dataCK !== '' ? JSON.parse(dataCK) : []
  return {
    login: cookie !== null,
    data: cookie,
  }
}

export function setRoutes(config) {
  let routes = [...config.routes]

  if (config.settings || config.auth) {
    routes = routes.map((route) => {
      let auth = config.auth ? [...config.auth] : []
      auth = route.auth ? [...auth, ...route.auth] : auth
      return {
        ...route,
        settings: {
          ...config.settings,
          ...route.settings,
        },
        auth,
      }
    })
  }

  return [...routes]
}

export function generateRoutesFromConfigs(configs) {
  let allRoutes = []
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config)]
  })
  return allRoutes
}
