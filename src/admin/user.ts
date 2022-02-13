#!/usr/bin/env node

import axios from 'axios';
import yargs from 'yargs';
import { ImmutableXClient } from '@imtbl/imx-link-lib';

interface UserResponse {
  accounts: string[]
}

async function api(url: string): Promise<UserResponse> {
  const { data } = await axios.request({ url });
  return data;
}

async function getClient(): Promise<ImmutableXClient> {
  return await ImmutableXClient.build({
    publicApiUrl: 'https://api.ropsten.x.immutable.com/v1'
  });
}

/**
 * Given a wallet address checks to see if that address is registered
 * on the Ropsten environment.
 * @param walletAddress 
 */
async function checkUser(walletAddress: string): Promise<void> {
  const client = await getClient();
  const isRegistered = await client.isRegistered({ user: walletAddress });
  if (isRegistered) {
    console.log(`${walletAddress} is registered`);
  } else {
    console.log(`${walletAddress} is not registered`);
  }
}

const argv = yargs(process.argv.slice(2))
  .usage('Usage: -a <address>')
  .options({ a: { alias: 'address', describe: 'wallet address', type: 'string', demandOption: true }})
  .parseSync();

checkUser(argv.a)
  .catch(err => {
    console.error(err);
  });