const ERC20JSON = require('../../blockchain/artifacts/contracts/Erc20.sol/ERC20.json')
const walletInstance = require('./walletProvider');


const getWeb3Obj = async () => {
    return await walletInstance.getWalletProvider();
}

const getInstance = async () => {
    const web3 = await getWeb3Obj() 
    const Erc20 = await new web3.eth.Contract(ERC20JSON.abi, process.env.Erc20Address);
        return {Erc20};
}

const getTxObject = async (fromAddress, value, gas='6721975') => {
    const web3 = await getWeb3Obj(); 
        return {
            from: fromAddress,
            value: web3.utils.toWei(web3.utils.BN(value)),
            gas: '6721975'
          }
}

module.exports = {getInstance, getWeb3Obj, getTxObject}
