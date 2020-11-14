import {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom' 
import Demo from './components/Demo';
import Landing from './components/Landing';
import LoginContextProvider, {LoginContext} from './contexts/LoginContext'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout';

function App() {
  return (
    <Switch>
      <LoginContextProvider>
        <Route exact path="/" component={Landing}/>
        <ProtectedRoute path="/dashboard" component = {Dashboard} />
        <Route path="/logout" component={Logout} />
        <Route path="/demo" component = {Demo} />
        <Route component={Landing}/>
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

