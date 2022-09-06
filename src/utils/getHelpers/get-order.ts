#!/usr/bin/env node
import { getClient } from '../client';
import { ImmutableMethodResults } from '@imtbl/imx-sdk';

/**
 * Return the users current asset holding.
 */
export async function getOrder(id: number, network: string): Promise<ImmutableMethodResults.ImmutableGetOrderResult> {
    const client = await getClient(network);
    return await client.getOrder({ orderId: id });
}
