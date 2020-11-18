import {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom' 
import Demo from './components/Demo';
import Landing from './components/Landing';
import LoginContextProvider, {LoginContext} from './contexts/LoginContext'
import Dashboard from './components/Dashboard'
import LandingRegister from './components/Landing/LandingRegister';

function App() {
  return (
    <Switch>
      <LoginContextProvider>
        <Route exact path="/" component={Landing}/>
        <Route path="/register" component={LandingRegister}/>
        <ProtectedRoute path="/dashboard" component = {Dashboard} />
        <Route path="/demo" component = {Demo} />
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

