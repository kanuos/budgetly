import {Switch, Route} from 'react-router-dom' 
import Demo from './components/Demo';
// import { useState } from 'react';
import Landing from './components/Landing';

const { default: Dashboard } = require("./components/Dashboard");

function App() {
  // const [tab, setTab] = useState(1)
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route path="/dashboard" component = {Dashboard} />
      <Route path="/demo" component = {Demo} />
    </Switch>
  );
}

export default App;
