import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import {url} from './secret'

function App() {

  const [result, setResult] = useState('');

  async function callAudit(e) {
    e.preventDefault();
    const code = document.getElementById("code").value;

    let res = await axios.request(`${url}${code}`)

    console.log(res);
    setResult(res.data);
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={e => callAudit(e)}>
          <input id="code" type="text" placeholder="Enter Solidity code here . . ." style={{height: "500px", width: "500px"}}></input>
          <br/>
          <button type='submit'>Start Audit</button>
        </form>
        
        <p>
          {result}
        </p>
      </div>
      <p>
        
      </p>
    </div>
  )
}

export default App
