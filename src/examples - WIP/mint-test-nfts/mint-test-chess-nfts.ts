import { mintV2 } from "../../utils/postHelpers/mintV2";
import yargs from 'yargs';


async function main(ownerPrivateKey: string, network:string): Promise<void> {
    
    //Make sure the contract is deployed and that you have set the metadata url to https://github.com/danekshea/imxscripts/blob/master/src/examples%20-%20WIP/mint-test-nfts/metadata/
    
    //Starting tokenID
    let tokenid = 1;

    //Total tokens to mint
    let tokencount = 3395;

    //Mints per batch
    const batchsize = 200;

    //Delays between mint requests, recommendation is >200, at 200ms, we have 5 RPS
    const requestdelays = 200;

    //IPFS Blueprint CID
    const CID = 'bafybeihj3uuw24fioheuxkpupgnnxx44vdezzmo5fr7m6dv3dfjgawvcwy'

    //Token address for the collection you want to mint to
    const tokenAddress = '0x43b2a84416bdad7091148a97f4c974dc0c2f0227';

    //Receiver address
    const receiver = '0xfaDcF1dEe4D008E02e9E97513081C320Ac2748B3';

    //calculate the amount of batches
    const batchcount = Math.floor(tokencount/batchsize);
    console.log(batchcount);

    //calculate the remainder after the batches have been created
    const remainder = tokencount % batchsize;
    console.log(remainder);

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

      //Mint the batch
      const result = await mintV2(ownerPrivateKey, tokens, tokenAddress, receiver, network);
      console.log(result)

      //Structure the requests so they meet rate limits
      await new Promise(f => setTimeout(f, requestdelays));

      i++;
    }
    console.log('tokenid after batches complete: ' + tokenid);
    const tokens = [];

    //Create the last remainder tokens which didn't get included in a batch
    let k: number = 0;
    while(k < remainder) {
      tokens[k] = {
        id: (tokenid + k).toString(),
        blueprint: 'ipfs://' + CID + '/' + (tokenid + k).toString(),
      };
      k++;
    }

    //Mint the remainder batch
    const result = await mintV2(ownerPrivateKey, tokens, tokenAddress, receiver, network);
    console.log(result)
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
