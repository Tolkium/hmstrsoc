import { ContractRinkeby } from './../constants/contract-rinkeby.constant';
import { Contract } from './../constants/contract.constant';
const Web3 = require('web3');
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadContractService {

  NODE_URL = "https://speedy-nodes-nyc.moralis.io/54a0826de2b8ebc01c1d5fc0/eth/";
  node_chain: any;
  web3: any;
  contract: any;
  contractConst: any;

  constructor() {
    this.node_chain = "rinkeby"
    this.contractConst = ContractRinkeby
    const provider = new Web3.providers.HttpProvider(this.NODE_URL + this.node_chain);
    this.web3 = new Web3(provider);
    // console.log(this.web3)
    this.contract = new this.web3.eth.Contract(this.contractConst.abi, this.contractConst.address)
    // console.log(this.contract)

   }

   getSaleState() {
     return this.contract.methods.paused().call()
   }

   getPresaleState() {
     return this.contract.methods.preSaleStarted().call()
   }

   getHamsterCost() {
     return this.contract.methods.HAMSTER_COST().call()
   }

   getMaxSupply() {
     return this.contract.methods.MAX_SUPPLY().call()
   }

   getSaleMaxMintAmount() {
     return this.contract.methods.maxMintAmount().call()
   }

   getPreSaleMaxMintAmount() {
     return this.contract.methods.preSaleMaxMintAmount().call()
   }




}
