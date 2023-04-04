var Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(
  new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545")
);
web3.eth.handleRevert = true;

(async function () {
  try {
    let result;
    let txObject = {from: "0xc67e5FFF9316476236B104993d91309170bb7BAC",   gas: 4800000, gaslimit: 3100000000000};
    let erc20JSON = JSON.parse(fs.readFileSync("./artifacts/contracts/Erc20.sol/ERC20.json", "utf8"));
    let erc20ABI = erc20JSON.abi;
    let erc20Bytecode = erc20JSON.bytecode;
    let ERC20 = new web3.eth.Contract(erc20ABI);
    

    let Erc20Instance = await ERC20.deploy({data: erc20Bytecode,arguments: ['Student','stx','1000']}).send(txObject);
    console.log("ERC20 address: ", Erc20Instance.options.address); // instance with the new contract address

    
    console.log("done");
  } catch (e) {
    console.log(e);
  }
})();
