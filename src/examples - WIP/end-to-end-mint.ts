import { compileContract } from "../utils/L1Helpers/compile-contract";
import { deployContract } from "../utils/L1Helpers/deploy-contract";
import { createProject } from "../utils/postHelpers/create-project";
import { createCollection } from "../utils/postHelpers/create-collection";
import { mintV2 } from "../utils/postHelpers/mintV2";
import { getMint } from "../utils/getHelpers/get-mint"
import yargs from 'yargs';


async function main(ownerPrivateKey:string, network:string) {
    
    //Compile the contract
    await compileContract();

    //Deploy the contract with the below parameters. 5m gas limit and 60gwei gas price seems to work fine for the NFT contracts. 
    //Make sure you have enough sandbox ETH on this address. Check out https://imxfaucet.xyz/ to get some.
    //TODO: add error handling for the user not having enough funds in wallet
    const deployedContract = await deployContract(ownerPrivateKey, 'Asset', 'IMX Chess', 'IMXC', network, '5000000', '10000000000');
    console.log('Deployed contract address: ' + deployedContract.address)
    console.log('Now we wait 3 minutes while the contract deploys...Check for it here: https://goerli.etherscan.io/address/' + deployedContract.address)

    //Give the new contract time to deploy, 3 minutes should be sufficient
    await new Promise(f => setTimeout(f, 180000));

    //Create a new project
    const project = await createProject(ownerPrivateKey, 'Dane\'s Test Projects', 'Dane\'s Evil company', 'dane@immutable.com', network)
    console.log('Created project with id:', project.id)

    //Give API time to register new project
    await new Promise(f => setTimeout(f, 3000));
 
    //Create collection with the deployed contract and project id
    const collection = await createCollection(ownerPrivateKey, '0x80baDb2D46D9b5f9F0c3a4Ed6A5CFE9Ff7073beb', 'IMX Chess', project.id, network);
    console.log('Created collection with address:', collection.address)

    //Give API time to register new collection
    await new Promise(f => setTimeout(f, 3000));

    // //Create token array
    // const tokens = [{
    //   id: 1,
    //   blueprint: 'test blueprint'
    // }]

    // //Mint an asset
    // const mintresponse = await mintV2(ownerPrivateKey, tokens, collection.address, await deployedContract.signer.getAddress(), network)
    // console.log('Mint response:');
    // console.log(mintresponse.results);

    // //Give API time to register the new mint
    // await new Promise(f => setTimeout(f, 3000));

    // //Fetch mint
    // const fetchmint = await getMint(mintresponse.results[0].tx_id);
    // console.log('Fetch mint:');
    // console.log(fetchmint);
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
