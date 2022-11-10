import yargs from 'yargs';
import { completeNFTWithdraw } from '../utils/postHelpers/withdraw-NFT-complete'

/**
 * Invokes either withdraw or prepareWithdraw depending on the values of the arguments
 * walletAddress and starkPublicKey.
 */
async function main(
    privateKey: string,
    tokenId: string,
    smartContractAddress: string,
    network: string,
    gasLimit?:string, 
    gasPrice?:string): Promise<void> {
    const result = await completeNFTWithdraw(privateKey, tokenId, smartContractAddress, network, gasLimit, gasPrice);
    console.log('Completing withdrawal');
    console.log('Result: ' + result);
}

const argv = yargs(process.argv.slice(2))
  .usage('Usage: -k <PRIVATE_KEY> -t <TOKEN_ID> -s <SMART_CONTRACT_ADDRESS> --network <NETWORK> -g [GAS_LIMIT] -p [GAS_PRICE]')
  .options({
    k: { describe: 'wallet private key', type: 'string', demandOption: true},
    t: { describe: 'token id', type: 'string', demandOption: true},
    s: { describe: 'smart contract address', type: 'string', demandOption: true},
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true},
    g: { describe: 'gas limit', type: 'string', demandOption: false },
    p: { describe: 'gas price', type: 'string', demandOption: false },
  })
  .parseSync();

main(argv.k, argv.t, argv.s, argv.network, argv.g, argv.p)
  .then(() => console.log('Withdrawal sent without returned errors.'))
  .catch(err => console.error(err));

