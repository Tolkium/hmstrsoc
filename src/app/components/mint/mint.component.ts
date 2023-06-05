import { ReadContractService } from './../../services/read-contract.service';
import { WinRefService } from './../../services/winref-service.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { ContractService } from 'src/app/services/contract.service';
import { User } from 'src/app/user.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss'],
  providers: [WinRefService]
})
export class MintComponent implements OnInit {
  saleStarted: any;
  presaleStarted: any;
  hamsterCost: any;
  maxSupply: any;
  preSaleMaxMintAmount: any;
  saleMaxMintAmount: any;
  web3: any;

  mintedTokenSupply: number = 0;
  saleAlreadyMintedAmountForUser: number = 0;
  presaleAlreadyMintedAmountForUser: number = 0;

  mint_amount: number = 1;
  already_minted: number = 0;
  price_total: number = 0;


  constructor(public contractService: ContractService, private cdr: ChangeDetectorRef, private readContractService: ReadContractService) { }

  ngOnInit() {
    this.setContractConstants()

    if (this.loggedInUser) {
      Moralis.Web3.enableWeb3().then(() => {
        this.fetchContractValues()
      })
    }

    // if (this.web3 && this.web3.eth.isMetaMask) {
    //   // metamask is installed
    // }
    //alert("Metamask installed: " + this.web3/* .eth.isMetaMask */)

  }

   /** TODO: Polling kazdych niekolko sekund - mozno
     * - link: https://stackoverflow.com/questions/62486841/angular-v9-async-pipe-not-updating-template-view-on-data-change
     */
  fetchContractValues() {
    this.contractService.getMintedTokenSupply().then((mintedTokenSupply) => this.setMintedTokenSupply(mintedTokenSupply))
    this.contractService.getPresaleMaxMintAmountForUser().then((value) => this.setPresaleAlreadyMintedAmountForUser(value))
    this.contractService.getSaleMaxMintAmountForUser().then((value) => this.setSaleAlreadyMintedAmountForUser(value))

  }

  private setContractConstants() {
      this.readContractService.getSaleState().then((value: any) => {
        this.saleStarted = !value
        this.cdr.detectChanges();
        // console.log("Sale started: " + this.saleStarted)
      })

      this.readContractService.getPresaleState().then((value: any) => {
        this.presaleStarted = value
        this.cdr.detectChanges();
        // console.log("Presale started: " + this.presaleStarted)
      })

      this.readContractService.getHamsterCost().then((value: any) => {
        this.hamsterCost = value
        this.price_total = this.hamsterCost * this.mint_amount;
        this.cdr.detectChanges();
        // console.log("Hamster cost: " + this.hamsterCost)
      })

      this.readContractService.getMaxSupply().then((value: any) => {
        this.maxSupply = value
        this.cdr.detectChanges();
        // console.log("MaxSupply: " + this.maxSupply)
      })

      this.readContractService.getPreSaleMaxMintAmount().then((value: any) => {
        this.preSaleMaxMintAmount = value
        this.cdr.detectChanges();
        // console.log("PreSaleMaxMintAmount: " + this.preSaleMaxMintAmount)
      })

      this.readContractService.getSaleMaxMintAmount().then((value: any) => {
        this.saleMaxMintAmount = value
        this.cdr.detectChanges();
        // console.log("MaxMintAmount: " + this.saleMaxMintAmount)
      })
  }

  // preventDefault() needs to be used - otherwise the button click would redirect
  minusMint(e:Event) {
    e.preventDefault()
    if (this.validate(this.mint_amount - 1)) {
      this.mint_amount -= 1;
      this.price_total = this.hamsterCost * this.mint_amount;
    }
  }

  // preventDefault() needs to be used - otherwise the button click would redirect
  plusMint(e:Event) {
    e.preventDefault()
    if (this.validate(this.mint_amount + 1)) {
      this.mint_amount += 1;
      this.price_total = this.hamsterCost * this.mint_amount;
    }
  }

  // preventDefault() needs to be used - otherwise the button click would redirect
  mint(e:Event) {
    e.preventDefault()
    if (this.validate(this.mint_amount)) {
      const currentUser = Moralis.User.current();
    if (currentUser) {
      if (this.saleStarted) {//TODO: Update values after transaction
        this.contractService.mintHamster(this.mint_amount)//.on("confirmation", (_confirmationNumber: any, _receipt: any) => {
          this.fetchContractValues()
      }
      else if (this.presaleStarted) //TODO: test this
              this.contractService.preSaleMintHamster(this.mint_amount)
    } else {
        // show the signup or login page
    }
      // console.log(`mint ${this.mint_amount}`);
    }
  }

  validate(desired_number: number): boolean {
    if (this.presaleStarted)
      return ((desired_number > 0) && (desired_number <= (this.preSaleMaxMintAmount - this.presaleAlreadyMintedAmountForUser)))
    if (this.saleStarted)
      return ((desired_number > 0) && (desired_number <= (this.saleMaxMintAmount - this.saleAlreadyMintedAmountForUser)))

    return false
  }

  //Setters
  private setMintedTokenSupply(mintedTokenSupply: any) {
    this.mintedTokenSupply = mintedTokenSupply
    // console.log("mintedTokenSupply: " + this.mintedTokenSupply)
    this.cdr.detectChanges();
  }

  private setPresaleAlreadyMintedAmountForUser(presaleAlreadyMintedAmountForUser: any) {
    this.presaleAlreadyMintedAmountForUser = presaleAlreadyMintedAmountForUser
    // console.log("presaleAlreadyMintedAmountForUser: " + this.presaleAlreadyMintedAmountForUser)
    this.cdr.detectChanges();
  }

  private setSaleAlreadyMintedAmountForUser(saleAlreadyMintedAmountForUser: any) {
    this.saleAlreadyMintedAmountForUser = saleAlreadyMintedAmountForUser
    // console.log("saleAlreadyMintedAmountForUser: " + this.saleAlreadyMintedAmountForUser)
    this.cdr.detectChanges();
  }

  get loggedInUser() {
    return Moralis.User.current()
  }

}
