import { mintV2 } from "../../utils/postHelpers/mintV2";
import yargs from 'yargs';


async function main(ownerPrivateKey: string, network:string): Promise<void> {
    
    //Make sure the contract is deployed and that you have set the metadata url to https://raw.githubusercontent.com/danekshea/ChessOpenerDataset/master/metadata/
    
    //Starting tokenID
    let tokenid = 1101;

    //Total tokens to mint
    let tokenmax = 3500;

    //Mints per batch
    const batchsize = 200;

    //how many batches to do
    const batchcount = 3;

    //Delays between mint requests, recommendation is >200
    const requestdelays = 200;

    //IPFS Blueprint CID
    const CID = 'bafybeiggjjzuikdbjdbsshld5dfu4t2sp752cfez2fcxvptc3tsupvjaga'

    //Token address for the collection you want to mint to
    const tokenAddress = '0xfE5a39d418Ff2512651BC445b9b1Ba2EaA75CE18';

    //Receiver address
    const receiver = '0xfaDcF1dEe4D008E02e9E97513081C320Ac2748B3';

    //loop for the batches
    let i: number = 0;
    while(i < batchcount) { 

      const tokens = [];

      let j: number = 0;
      while(j < batchsize) {
        
        //Create the token array according to the batch size
        tokens[j] = {
          id: (tokenid + j).toString(),
          blueprint: 'ipfs://' + CID + '/' + (tokenid + j).toString(),
        };
        j++ 
      }
      tokenid = tokenid + j;

      //Mint an asset
      const result = await mintV2(ownerPrivateKey, tokens, tokenAddress, receiver, network);
      console.log(result)

      //Structure the requests so they meet rate limits
      await new Promise(f => setTimeout(f, requestdelays));

      i++;
    }
}


const argv = yargs(process.argv.slice(2))
  .usage('Usage: -k <PRIVATE_KEY> --network <NETWORK>')
  .options({
    k: { describe: 'wallet private key', type: 'string', demandOption: true },
    network: { describe: 'network. sandbox or mainnet', type: 'string', demandOption: true}
  })
  .parseSync();

main(argv.k, argv.network)
  .then(() => console.log('Success'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
