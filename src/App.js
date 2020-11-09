import { useState } from 'react';
import Dashboard from './components/Dashboard'

function App() {
  const [tab, setTab] = useState(1)
  return (
    <>
    <Dashboard getTaab={setTab} tab={tab} />
      {/* <Demo />         */}
    </>
  );
}

export default App;
