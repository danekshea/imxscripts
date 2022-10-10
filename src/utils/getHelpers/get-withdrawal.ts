#!/usr/bin/env node
import { getClient } from '../client';
import { ImmutableMethodResults } from '@imtbl/imx-sdk';

/**
 * Return the order by ID.
 */
export async function getWithdrawal(id: number, network: string): Promise<ImmutableMethodResults.ImmutableWithdrawal> {
    const client = await getClient(network);
    return await client.getWithdrawal({ id: id });
}
