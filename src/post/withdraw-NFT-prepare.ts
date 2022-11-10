import yargs from 'yargs';
import { prepareNFTWithdraw } from '../utils/postHelpers/withdraw-NFT-prepare'

/**
 * Invokes either withdraw or prepareWithdraw depending on the values of the arguments
 * walletAddress and starkPublicKey.
 */
async function main(
    privateKey: string,
    tokenId: string,
    smartContractAddress: string,
    network: string): Promise<void> {
    const result = await prepareNFTWithdraw(privateKey, tokenId, smartContractAddress, network);
    console.log('Preparing withdrawal');
    console.log('Result: ' + result);
    }

const argv = yargs(process.argv.slice(2))
  .usage('Usage: -k <PRIVATE_KEY> -t <TOKEN_ID> -s <SMART_CONTRACT_ADDRESS> --network <NETWORK>')
  .options({
    k: { describe: 'wallet private key', type: 'string', demandOption: true},
    t: { describe: 'token id', type: 'string', demandOption: true},
    s: { describe: 'smart contract address', type: 'string', demandOption: true},
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}
  })
  .parseSync();

main(argv.k, argv.t, argv.s, argv.network)
  .then(() => console.log('Withdrawal sent without returned errors.'))
  .catch(err => console.error(err));

