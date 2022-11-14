import { ImmutableMethodResults } from '@imtbl/imx-sdk';
import { getClient } from '../client';

/**
 * Mint a token to the given user.
 */
 export async function mintV2(ownerPrivateKey: string, tokens:any[], tokenAddress: string, receiver: string, network: string, royalties?: any[]) 
 : Promise<ImmutableMethodResults.ImmutableOffchainMintV2Results> {
    const client = await getClient(network, ownerPrivateKey);
    return await client.mintV2([{
        users: [{
            etherKey: receiver.toLowerCase(),
            tokens: tokens
        }],
        contractAddress: tokenAddress
    }]);
}