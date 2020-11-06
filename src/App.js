// import Dashboard from './components/Dashboard'
import { useState } from 'react';
// import Loader from './components/Loader'
import TaskUI from './components/TaskModal'

function App() {
  const [ui, setUi] = useState(true)
  return (
    <>
      <button onClick={()=> setUi(!ui)}>
        Add
      </button>
      <TaskUI show={ui} toggle = {()=>setUi(!ui)}/>      
    </>
  );
}

export default App;
