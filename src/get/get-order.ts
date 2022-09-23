import yargs from 'yargs';
import { getOrder } from '../utils/getHelpers/get-order'

async function main(tx_id: number, network: string) {
    const response = await getOrder(tx_id, network);
    console.log(response)
  }
  
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: --id <OPRDER_ID> --network <NETWORK>')
    .options({ 
    id: { describe: 'order id', type: 'number', demandOption: true },
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}})
    .parseSync();
  
  main(argv.id, argv.network)
    .catch(err => console.error(err));