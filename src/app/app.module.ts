import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { SocialIconsComponent } from './components/social-icons/social-icons.component';
import { TopHamsterComponent } from './components/top-hamster/top-hamster.component';
import { AssetWallComponent } from './components/asset-wall/asset-wall.component';
import { RoadmapTileComponent } from './components/roadmap-tile/roadmap-tile.component';
import { TeamTileComponent } from './components/team-tile/team-tile.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContractService } from './services/contract.service';
import { MintComponent } from './components/mint/mint.component';
import { WeiToEthPipe } from './pipes/Wei-to-eth.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ButtonComponent,
    MenuComponent,
    SocialIconsComponent,
    TopHamsterComponent,
    AssetWallComponent,
    RoadmapTileComponent,
    TeamTileComponent,
    NewsletterComponent,
    MintComponent,
    WeiToEthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    ContractService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
