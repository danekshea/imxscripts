#!/usr/bin/env node
import { getClient } from '../client';
import { ImmutableMethodResults } from '@imtbl/imx-sdk';

/**
 * Return the asset by contract address and token id
 */
export async function getAsset(tokenid: string, contractadddress: string, network: string, fees?: boolean): Promise<ImmutableMethodResults.ImmutableAsset> {
    const client = await getClient(network);
    return await client.getAsset({address: contractadddress, id: tokenid, include_fees: fees});
}