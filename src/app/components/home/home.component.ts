import { MintComponent } from './../mint/mint.component';
import { MainButtonTitleType } from './../../enums/main-button-title-type.enum';
import { ReadContractService } from './../../services/read-contract.service';
import { ContractService } from 'src/app/services/contract.service';
import { ChangeDetectorRef, Component, EventEmitter, isDevMode, OnInit, ViewChild } from '@angular/core';
import Moralis from 'moralis';
import { User } from 'src/app/user.component';

import * as appData from '../../../data'

@Component({
  selector: 'app-home',
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  @ViewChild(MintComponent, { static: false })
  mintComponent!: MintComponent;

  small_menu_is_collapsed: boolean = true;

  mint_is_collapsed: boolean = true;

  faq_1_is_collapsed: boolean = true;
  faq_2_is_collapsed: boolean = true;
  faq_3_is_collapsed: boolean = true;
  faq_4_is_collapsed: boolean = true;
  faq_5_is_collapsed: boolean = true;
  faq_6_is_collapsed: boolean = true;

  hamsters = appData.hamsters;

  saleStarted: any = false;
  presaleStarted: any = false;
  web3: any;
  hamsterCost: any;
  maxSupply: any;
  preSaleMaxMintAmount: any;
  saleMaxMintAmount: any;

  mainButtonHref: any;
  contractConst: any;

  correctNetwork: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private contractService: ContractService, private readContractService: ReadContractService) { }

  ngOnInit(): void {
    if (Moralis.User.current()) this.mint_is_collapsed = false;
    else this.mint_is_collapsed = true;

    this.contractConst = this.readContractService.contractConst
    this.fetchContractVariables()
    this.cdr.detectChanges()
    Moralis.Web3.onAccountsChanged((accounts) => {
      this.logout()
    });
  }

  fetchContractVariables() {
    this.readContractService.getSaleState().then((value: any) => {
      this.saleStarted = !value
      this.cdr.detectChanges()
      // console.log("Sale started: " + this.saleStarted)
    })

    this.readContractService.getPresaleState().then((value: any) => {
      this.presaleStarted = value
      this.cdr.detectChanges()
      // console.log("Presale started: " + this.presaleStarted)
    })

    this.readContractService.getHamsterCost().then((value: any) => {
      this.hamsterCost = value
      this.cdr.detectChanges()
      // console.log("Hamster cost: " + this.hamsterCost)
    })

    this.readContractService.getMaxSupply().then((value: any) => {
      this.maxSupply = value
      this.cdr.detectChanges()
      // console.log("MaxSupply: " + this.maxSupply)
    })

    this.readContractService.getPreSaleMaxMintAmount().then((value: any) => {
      this.preSaleMaxMintAmount = value
      this.cdr.detectChanges()
      // console.log("PreSaleMaxMintAmount: " + this.preSaleMaxMintAmount)
    })

    this.readContractService.getSaleMaxMintAmount().then((value: any) => {
      this.saleMaxMintAmount = value
      this.cdr.detectChanges()
      // console.log("MaxMintAmount: " + this.saleMaxMintAmount)
    })
  }

  // preventDefault() needs to be used - otherwise the button click would redirect
  // we are doind this manually
  onMainButtonClick(e:Event) {
    e.preventDefault()
    if (this.mainButtonTitle == MainButtonTitleType.CONNECT) this.login()
    if (this.mainButtonTitle == MainButtonTitleType.DISCONNECT) this.logout()
    if (this.mainButtonTitle == MainButtonTitleType.OPENSEA) window.open(this.contractConst.openSeaLink, '_blank')
  }

  login() {
    Moralis.Web3.authenticate()
      .then(async () => {
        this.correctNetwork = false
        this.contractService.checkChainId()
          .then((val) => {
            if (val == true) {
              this.correctNetwork = val
              this.mintComponent.fetchContractValues()
              this.mint_is_collapsed = false
              this.cdr.detectChanges()
            }
            if(val == false) {
              this.logout()
            }
          })

      })
  }

  logout() {
    Moralis.User.logOut()
      // .then((loggedOutUser: any) => console.info('logout', loggedOutUser))
      .then(() => {
        this.correctNetwork = false
        this.mint_is_collapsed = true
        this.cdr.detectChanges()
      })
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch((e: any) => console.error('Moralis logout error:', e));
  }


  get mainButtonTitle(): MainButtonTitleType {
    if (this.saleStarted || this.presaleStarted) {
      if(Moralis.User.current() && this.correctNetwork) return MainButtonTitleType.DISCONNECT
      else return MainButtonTitleType.CONNECT
    }
    return MainButtonTitleType.OPENSEA
  }

}
