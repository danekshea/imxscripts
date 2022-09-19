#!/usr/bin/env node
import { getClient } from '../client';
import { ImmutableMethodResults } from '@imtbl/imx-sdk';

/**
 * Return mintable token by token address and tokenid.
 */
export async function getMintableToken(tokenAddress: string, tokenId: string, network: string): Promise<ImmutableMethodResults.ImmutableGetMintableTokenResult> {
    const client = await getClient(network);
    return await client.getMintableToken({ tokenAddress, tokenId });
}
