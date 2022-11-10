import { ERC721TokenType } from '@imtbl/imx-sdk';
import { ethers } from 'ethers';
import { getClient } from '../client';

export async function prepareNFTWithdraw(privateKey: string, tokenId: string, smartContractAddress: string, network:string): Promise<void> {
    const client = await getClient(network, privateKey);
    await client.prepareWithdrawal({
      user: client.address,
      token: {
        type: ERC721TokenType.ERC721,
        data: {
          tokenId,
          tokenAddress: smartContractAddress
        }
      },
      quantity: ethers.BigNumber.from('1')
    })
  }
