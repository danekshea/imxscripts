import yargs from 'yargs';
import { getAsset } from '../utils/getHelpers/get-asset'

async function main(tokenid: string, contractadddress: string, network: string, fees?: boolean) {
    const response = await getAsset(tokenid, contractadddress, network, fees);
    console.log(response)
  }
  
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: -t <TOKEN_ID> -s <SMART_CONTRACT_ADDRESS> -f <FEES_BOOLEAN> --network <NETWORK>')
    .options({ 
    t: { describe: 'token id', type: 'string', demandOption: true },
    s: { describe: 'smart contract address', type: 'string', demandOption: true },
    f: { describe: 'include fees', type: 'boolean', demandOption: false },
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}})
    .parseSync();
  
  main(argv.t, argv.s, argv.network, argv.f)
    .catch(err => console.error(err));