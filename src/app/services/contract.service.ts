import { Contract } from './../constants/contract.constant';
import { ContractRinkeby } from '../constants/contract-rinkeby.constant';
import {
  Injectable,
  isDevMode
} from "@angular/core";
import {
  Moralis
} from "moralis";
import {
  environment
} from "src/environments/environment";
import Web3 from "web3";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  chainId: number;
  contractConst: any;

  constructor() {
    this.chainId =  4;
    this.contractConst = ContractRinkeby
    Moralis.start({
        appId: environment.moralis.appId,
        serverUrl: environment.moralis.serverUrl
      })
      .then(async () => {
        // console.info('Moralis has been initialised. ContractService')
        await Moralis.Web3.enableWeb3()
      })

  }

  async checkChainId(): Promise<boolean> {
    var correctNetwork: boolean = false
    let web3 = await Moralis.Web3.enableWeb3()
    let userChainId = await web3.eth.getChainId()

    if (userChainId == this.chainId)
     return true
    else {
      return Moralis.Web3.switchNetwork(this.chainId).then(() => {
        return true
      }, (error) => {
        return false

      })
    }
  }

  async getTokenPrice() {

    const options2 = {
      contractAddress: this.contractConst.address,
      functionName: "HAMSTER_COST",
      abi: this.contractConst.abi,
      params: {},
    };
    let price = await Moralis.Web3.executeFunction(options2);

    // console.log(price);
    return price;
  }

  async getMintedTokenSupply() {
    const options = {
      contractAddress: this.contractConst.address,
      functionName: "totalSupply",
      abi: this.contractConst.abi,
      params: {},
    }

    let mintedTokenSupply = await Moralis.Web3.executeFunction(options);

    // console.log(mintedTokenSupply);
    return mintedTokenSupply;
  }

  async getTokenMaxSupply() {

    const options2 = {
      contractAddress: this.contractConst.address,
      functionName: "MAX_SUPPLY",
      abi: this.contractConst.abi,
      params: {},
    };

     let maxSupply = await Moralis.Web3.executeFunction(options2);

    // console.log(maxSupply);
    return maxSupply;
  }

  get userAddress() {
    const user = Moralis.User.current()
    const userAddress = user?.attributes.ethAddress
    // console.log(userAddress)
    return userAddress
  }

  async getPresaleMaxMintAmount() {

    const options2 = {
      contractAddress: this.contractConst.address,
      functionName: "preSaleMaxMintAmount",
      abi: this.contractConst.abi,
      params: {}
    };
    let preSaleMaxMintAmount = '';

    try {
      preSaleMaxMintAmount = await Moralis.Web3.executeFunction(options2);
    } catch (error: any) {
      for (let key in error.error) {
        // console.log(key + ":", error.error[key]);
      }
    }

    // console.log(preSaleMaxMintAmount);
    return Number(preSaleMaxMintAmount);
  }

  async getSaleMaxMintAmount() {
    const options2 = {
      contractAddress: this.contractConst.address,
      functionName: "maxMintAmount",
      abi: this.contractConst.abi,
      params: {}
    };
    let saleMaxMintAmount = '';

    try {
      saleMaxMintAmount = await Moralis.Web3.executeFunction(options2);
    } catch (error: any) {
      for (let key in error.error) {
        // console.log(key + ":", error.error[key]);
      }
    }

    // console.log(saleMaxMintAmount);
    return Number(saleMaxMintAmount);
  }

  async getSaleMaxMintAmountForUser() {

    const options = {
      contractAddress: this.contractConst.address,
      functionName: "getSaleBoughtCountsForAddress",
      abi: this.contractConst.abi,
      params: {_key: this.userAddress},
    };
    let tokensMinted = null

    try {
      tokensMinted = await Moralis.Web3.executeFunction(options);
    } catch (error: any) {
      for (let key in error.error) {
        // console.log(key + ":", error.error[key]);
      }
    }

    // console.log(tokensMinted);
    return Number(tokensMinted);

  }

  async getPresaleMaxMintAmountForUser() {

    const options = {
      contractAddress: this.contractConst.address,
      functionName: "getPresaleBoughtCountsForAddress",
      abi: this.contractConst.abi,
      params: {_key: this.userAddress},
    };
    let tokensMinted = null

    try {
      tokensMinted = await Moralis.Web3.executeFunction(options);
    } catch (error: any) {
      for (let key in error.error) {
        // console.log(key + ":", error.error[key]);
      }
    }

    // console.log(tokensMinted);
    return Number(tokensMinted);

  }

  async getRemainingMintAmountForUser() {
    let saleMaxMintAmount = await this.getSaleMaxMintAmount();
    let saleMaxMintAmountForUser = await this.getSaleMaxMintAmountForUser();

    return saleMaxMintAmount - saleMaxMintAmountForUser;
  }

  async mintHamster(mintAmount: number) {
    this.checkChainId().then(async (correctNetwork) => {
      if (correctNetwork) {
        this.getSaleMaxMintAmountForUser()
        let hamsterPriceInWei = await this.getTokenPrice();
        //hamsterPriceInEth = Moralis.Units.FromWei(hamsterPriceInWei);
        let calcPriceInWei = (hamsterPriceInWei * mintAmount).toString();

        const options2 = {
          contractAddress: this.contractConst.address,
          functionName: "mint",
          abi: this.contractConst.abi,
          params: {
            _mintAmount: mintAmount
          },
          msgValue: calcPriceInWei,
          awaitReceipt: false
        };

        const mintTx = await Moralis.Web3.executeFunction(options2);

        // console.log(mintTx);
        return mintTx
      }
    })
  }

  async preSaleMintHamster(mintAmount: number) {
    let signature = "sig"
    let hamsterPriceInWei = await this.getTokenPrice();
    let calcPriceInWei = (hamsterPriceInWei * mintAmount).toString();

    const options2 = {
      contractAddress: this.contractConst.address,
      functionName: "preSaleMint",
      abi: this.contractConst.abi,
      params: {
        _mintAmount: mintAmount,
        signature: signature
      },
      msgValue: calcPriceInWei
    };


    return Moralis.Web3.executeFunction(options2);

    //console.log(mint)
  }

  getPreSaleSignature() {

  }

}
