import {Switch, Route} from 'react-router-dom' 
import Demo from './components/Demo';
import Landing from './components/Landing';
import TestMode from './components/test'

const { default: Dashboard } = require("./components/Dashboard");

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route path="/dashboard" component = {Dashboard} />
      <Route path="/demo" component = {Demo} />
      <Route path="/test" component = {TestMode} />

    </Switch>
  );
}

export default App;
