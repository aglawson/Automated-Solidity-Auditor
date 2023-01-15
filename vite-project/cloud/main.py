import requests
import json

def audit(request):
    warning = ""
    # Smart contract code
    contract_code = request.args.get("contract_code")

    skip = False
    temp_string = ""
    for line in contract_code.strip().split("\n"):
        temp_string += line
        if temp_string.startswith("//"):
            skip = True
        
        if not skip:
            if "pragma solidity" not in contract_code:
                warning += "Solc version not specified"
                break;
            if "pragma solidity" in line:
                solc = temp_string.split("pragma solidity ")[1].split(";")[0]
                version = int(solc.split('.')[1].split('.')[0])
                if version < 8 and "SafeMath" not in contract_code:
                    warning += "Contracts using solc versions under 0.8.0 are vulnerable to underflow/overflow attacks if not using SafeMath library"
        
        if skip:
            skip = False
            
    if warning == "":
        warning = "No issues detected"
        
    return warning
