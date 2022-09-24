import yargs from 'yargs';
import { getDeposit } from '../utils/getHelpers/get-deposit'

async function main(tx_id: number, network: string) {
    const response = await getDeposit(tx_id, network);
    console.log(response)
  }
  
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: --id <TRANSACTION_ID> --network <NETWORK>')
    .options({ 
    id: { describe: 'transaction id', type: 'number', demandOption: true },
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}})
    .parseSync();
  
    main(argv.id, argv.network)
    .catch(err => console.error(err));