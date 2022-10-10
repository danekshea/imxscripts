import yargs from 'yargs';
import { getWithdrawal } from '../utils/getHelpers/get-withdrawal'

async function main(tx_id: number, network: string) {
    const response = await getWithdrawal(tx_id, network);
    console.log(response)
  }
  
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: --id <TX_ID> --network <NETWORK>')
    .options({ 
    id: { describe: 'withdrawal id', type: 'number', demandOption: true },
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}})
    .parseSync();
  
  main(argv.id, argv.network)
    .catch(err => console.error(err));