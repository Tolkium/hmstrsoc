import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { environment } from 'src/environments/environment';
import { User } from './user.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Moralis Angular App';
  window: any;

  user ? : User;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    // Moralis.start({
    //     appId: environment.moralis.appId,
    //     serverUrl: environment.moralis.serverUrl,
    //   })
    //   .then(() => console.info('Moralis has been initialised.'))
    //   .finally(() => {
    //     if (Moralis.User.current()) {
    //       this.setLoggedInUser(Moralis.User.current())
    //     } else {
    //       Moralis.Web3.authenticate()
    //         .then(async () => {
    //             this.setLoggedInUser(Moralis.User.current())
    //         })
    //     }

    //   });
    //   //TODO: on accounts changed treba poriesit
    //   Moralis.Web3.onAccountsChanged((accounts) => {

    //     console.log(accounts);
    //     this.changeUser()
    //   });
  }

  async login() {
    if (Moralis.User.current()) {
      this.setLoggedInUser(Moralis.User.current())
    } else {
      Moralis.Web3.authenticate()
        .then(async () => {
            this.setLoggedInUser(Moralis.User.current())
        })
    }
  }

  changeUser() {
    Moralis.Web3.authenticate()
        .then(async () => {
            this.setLoggedInUser(Moralis.User.current())
        })
  }

  logout() {
    Moralis.User.logOut()
      // .then((loggedOutUser: any) => console.info('logout', loggedOutUser))
      // Set user to undefined
      .then(() => this.setLoggedInUser(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch((e: any) => console.error('Moralis logout error:', e));
  }

  private async setLoggedInUser(loggedInUser ? : User) {
    this.user = loggedInUser
    // console.info('Loggedin user:', loggedInUser);

    this.cdr.detectChanges();
  }

}
