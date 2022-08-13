import {useState} from 'react'
import {Route, Switch} from 'react-router'
import {createGlobalStyle} from 'styled-components'
import routes from './components/config/routesConfig'
import Main from './components/Main'
import Header from './components/main/Header'
import NotFoundComponent from './pages/error/NotFoundComponent'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Nunito';
    src: url(https://fonts.google.com/specimen/Nunito?preview.text_-type=custom);
    display : flex;
    justify-content : center;

  }
  .main {
    width : 960px;
  }
`
function App() {
  const [title, setTitle] = useState('')
  return (
    <div className="main">
      <GlobalStyle />
      <Header title={title} />
      <Switch>
        {/* <PrivateRoute
          exact={true}
          path="/"
          component={() => <Redirect to="/home" />}
        />
        <Route path="/access-denied" component={NoRoles} /> */}
        {routes.map((val, key) => (
          <Route
            exact={val.exact}
            key={key}
            path={val.path}
            render={(props) => (
              <Main {...props} settings={val.settings} setTitle={setTitle}>
                {val.component}
              </Main>
            )}
          />
        ))}
        <Route component={NotFoundComponent} />
      </Switch>
    </div>
  )
}

export default App
