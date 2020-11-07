import { useState } from 'react';
import Demo from './components/Demo'

function App() {
  const [ui, setUi] = useState(true)
  return (
    <>
      <Demo />        
    </>
  );
}

export default App;
