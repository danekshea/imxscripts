import { ERC721TokenType } from '@imtbl/imx-sdk';
import { getClient } from '../client';
  
export async function completeNFTWithdraw(privateKey: string, tokenId: string, smartContractAddress: string, network: string,  gasLimit?:string, gasPrice?:string): Promise<string> {
    const client = await getClient(network, privateKey, gasLimit, gasPrice);
    return await client.completeWithdrawal({
        starkPublicKey: client.starkPublicKey,
        token: {
        type: ERC721TokenType.ERC721,
        data: {
            tokenId,
            tokenAddress: smartContractAddress
        }
        }
    })
}