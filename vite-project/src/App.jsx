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
      <h1>Automated Smart Contract Auditor</h1>
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
