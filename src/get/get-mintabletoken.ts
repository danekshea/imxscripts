import yargs from 'yargs';
import { getMintableToken } from '../utils/getHelpers/get-mintabletoken'

async function main(tokenId: string, tokenAddress: string, network: string) {
    const response = await getMintableToken(tokenAddress, tokenId, network);
    console.log(response)
  }
  
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: -t <TOKEN_ID> -s <SMART_CONTRACT_ADDRESS> --network <NETWORK>')
    .options({ 
    t: { describe: 'token id', type: 'string', demandOption: true },
    s: { describe: 'smart contract address', type: 'string', demandOption: true },
    network: { describe: 'network. ropsten or mainnet', type: 'string', demandOption: true}})
    .parseSync();
  
  main(argv.t, argv.s, argv.network)
    .catch(err => console.error(err));