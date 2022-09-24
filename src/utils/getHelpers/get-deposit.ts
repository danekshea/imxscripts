#!/usr/bin/env node
import { getClient } from '../client';
import { ImmutableMethodResults } from '@imtbl/imx-sdk';

export async function getDeposit(tx_id: number, network: string): Promise<ImmutableMethodResults.ImmutableDeposit> {
    const client = await getClient(network);
    return await client.getDeposit({ id: tx_id });
}