require("@nomiclabs/hardhat-waffle");
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "SRYLkIU7BnryzifbQqT5BH__1Ez5Ie7z";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "c2471f8d4797272f1e2e238e508a3e868cb15f1e02ef0570a0d0a8528ee3d4db";

const ETHERSCAN_API_KEY = "SF4ZX59CPHQBH1DZVNYK2IE6IQ9E54H88G";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/L1/contracts",
    artifacts: "./src/L1/artifacts"
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      goerli: "SF4ZX59CPHQBH1DZVNYK2IE6IQ9E54H88G"
    }
  }
};

