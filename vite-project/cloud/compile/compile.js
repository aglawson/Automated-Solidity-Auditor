/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const solc = require('solc');

exports.compile = async (req, res) => {

  const contract_code = req.query.code;

  var input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: contract_code
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  let warning_string = `${output.errors.length} Errors Encountered: `;

  for(let i = 0; i < output.errors.length; i++) {
    warning_string += `${i}/${output.errors.length}${output.errors[i].message}`;
  }

  res.send(warning_string);
};
