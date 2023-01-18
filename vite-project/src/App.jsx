import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {url} from './secret'

function App() {
  const [result, setResult] = useState('');
  const [code, setCode] = useState([]);
  const [message, setMessage] = useState('Upload your solidity files here to begin');

  async function sendCodeToAPI(contractCode) {
    for(let i = 0; i < code.length; i++) {
      let input = {
        "language": "Solidity",
        "sources": {
            "contractName": {
                "content": code[i]
            },
        },
        "settings": {
            "optimizer": {
                "enabled": false,
                "runs": 2000
            },
            "evmVersion": "byzantium",
            "outputSelection": {
                "*": {
                    "*": ["*"]
                }
            }
        }
      }

      let res = await axios.request(`${url}compile?contract_code=${JSON.stringify(input)}`)
      console.log(res);
      setResult(JSON.stringify(res.data.contracts.contractName))
    }
  }

  async function uploadFolder(e) {
    e.preventDefault();

    console.log('working . . . ');
    var folderInput = document.getElementById("folder-input");
    var files = folderInput.files;
    for (var i = 0; i < files.length; i++) {
      if (files[i].name.endsWith('.sol')) {
        var reader = new FileReader();
        reader.onload = async function(x) {
          var contractCode = x.target.result;
          // console.log(code);
          // Send contract code to the analysis API
          code.push(contractCode);
          //console.log(code)
          await sendCodeToAPI(contractCode);
        };
        reader.readAsText(files[i]);
      } else {
        setMessage('Invalid files uploaded');
      }
    }
    
  }

  return (
    <div className="App">
      <h1>Automated Smart Contract Auditor</h1>
      <div className="card">
        <form onSubmit={e => uploadFolder(e)}>
          <p>{message}</p>
          <input type="file" id="folder-input" multiple/>
          <input type="submit" value="Upload Folder"/>
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