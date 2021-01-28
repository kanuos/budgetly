import {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom' 
import Demo from './components/Demo';
import Landing from './components/Landing';
import LoginContextProvider, {LoginContext} from './contexts/LoginContext'
import Dashboard from './components/Dashboard'
import LandingRegister from './components/Landing/LandingRegister';
import ErrorPage from './components/ErrorPage'

function App() {
  const {user} = useContext(LoginContext);
  return (
    <Switch>
      <LoginContextProvider>
        <Route exact path="/" render = {() => {
          return user ? <Dashboard /> : <Landing />
        }}/>
        <Route path="/register" component={LandingRegister}/>
        <ProtectedRoute path="/dashboard" component = {Dashboard} />
        <Route path="/demo" component = {Demo} />
        <Route path="*" component = {ErrorPage} />
      </LoginContextProvider>
    </Switch>
  );
}

export default App;

const ProtectedRoute = ({component: Component, ...rest}) => {
  const {user} = useContext(LoginContext);
  return <Route {...rest} render = {props => (
    user ? <Component {...props} /> : <Redirect to="/"/>
  )}/> 
}

