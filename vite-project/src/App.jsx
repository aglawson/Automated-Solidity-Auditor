import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import {url} from './secret'
import Web3 from 'web3'

function App() {

  const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/39157d3238834ca59b133217a81982c1'));

  const [result, setResult] = useState('');

  async function callCompile(e) {
    e.preventDefault();

    const code = document.getElementById("code").value//.replace(/\s/g,'');
    let res = await web3.eth.compile.solidity(code);

    //let res = await axios.request(`${url}compile-js?contract_code=${code}`);

    return res;
  }

  async function callAudit(e) {
    e.preventDefault();

    const code = document.getElementById("code").value//.replace(/\s/g,'');

    let res = await axios.request(`${url}audit?contract_code=${code}`)
    let retval = await callCompile(e)// + res.data;

    setResult(retval);
  }

  return (
    <div className="App">
      <h1>Automated Smart Contract Auditor</h1>
      <div className="card">
        <form onSubmit={e => callAudit(e)}>
          <input id='code' rows="50" cols="100" wrap="hard" placeholder='Enter your contract code here...'>
          </input> 
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
