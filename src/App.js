import { useState } from "react";
import InputGroup from './components/InputGroup/InputGroup';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name, email, password
    });
  }

  return (
    <>
      <h1>Hello world</h1>
      
      <form onSubmit={handleSubmit}>
        <InputGroup 
          type = "text"
          placeholder = "Your name"
          getValue = {c => setName(() => c)}
          />
        <InputGroup 
          type = "email"
          placeholder = "Your email"
          getValue = {c => setEmail(() => c)}
          />
        <InputGroup 
          type = "password"
          placeholder = "Your password"
          getValue = {c => setPassword(() => c)}
          />
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
