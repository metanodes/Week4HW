import { Injectable } from '@nestjs/common';
import * as tokenJson from './assets/MyToken.json'; 
import { createPublicClient,createWalletClient, http, formatEther } from 'viem';
import  * as chains from 'viem/chains'
import sepolia from 'viem/chains'
import { create } from 'domain';


@Injectable()
export class AppService {
  publicClient;
  walletClient;

  constructor() {
    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(process.env.RPC_ENDPOINT_URL),
    });

    this.walletClient = createWalletClient({
      chain: chains.sepolia,
      transport: http(process.env.RPC_ENDPOINT_URL),
      key: process.env.PRIVATE_KEY,
    });
  }

  
  getHello(): string {
    return 'Hello World!';
  }

  getContractAddress(): string {
    return process.env.TOKEN_ADDRESS;
    //return this.configService.get<string>('TOKEN_ADDRESS');
  }

  getOtherThing():string {
    return "Other !";
  }

  async getTokenName(): Promise<any> {

    /* moved to constructor 
    const publicClient = createPublicClient({
      chain: chains.sepolia,
      //transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
      transport: http(process.env.RPC_ENDPOINT_URL),
      //transport: http(`https://eth-sepolia.g.alchemy.com/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`),
    });
    */
    const name = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x{$string}`,
      abi: tokenJson.abi,
      functionName: "name"
    });
    return name;
  }

  async getTotalSupply(){
    /* moved to constructor 
    const publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(process.env.RPC_ENDPOINT_URL),
    });
    */
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress() as '0x($string}',
      abi: tokenJson.abi,
      functionName: 'totalSupply',
    });
    console.log({totalSupply});
    return formatEther(totalSupply as bigint);
  }

  async getTokenBalance(address: string) {
    const tokenBalance = await this.publicClient.readContract({
      address: this.getContractAddress() as '0x($string}',
      abi: tokenJson.abi,
      functionName: 'balanceOf',
      args:[address]
    });
  }
  
  async getTransactionReceipt(hash: string) {
    const transactionReceipt = await this.publicClient.getTransactionReceipt({hash});
    console.log({transactionReceipt});
    transactionReceipt.blockNumber = transactionReceipt.blockNumber.toString();
    transactionReceipt.gasUsed = transactionReceipt.gasUsed.toString();
    transactionReceipt.cumulativeGasUsed = transactionReceipt.cumulativeGasUsed.toString();
    transactionReceipt.effectiveGasPrice = transactionReceipt.effectiveGasPrice.toString();
    return transactionReceipt;
  }

  getServerWalletAddress() {
    const addresses = this.walletClient.getAddresses();
    return addresses;
  }
  
  async checkMinterRole(address: string) {
    throw new Error('Method not implemented.');
  }
  
  async mintTokens(address: any) {
    this.walletClient.
    return `Minting 10 tokens to ${address}`;
  }
}