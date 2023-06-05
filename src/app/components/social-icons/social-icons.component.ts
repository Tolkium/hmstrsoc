import { Component, OnInit, Input } from '@angular/core';
import { faDiscord, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss']
})
export class SocialIconsComponent implements OnInit {
  faDiscord = faDiscord;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  opensea_size: string = '';
  metamask_size: string = '';
  metamask_font_size: string = '';

  @Input() color = 'initVal';
  @Input() size = '';

  constructor() { }

  ngOnInit(): void {
    this.opensea_size = (Number(this.size) + 2).toString();
    this.metamask_size = (Number(this.size) + 5).toString();
    this.metamask_font_size = (Number(this.size) - 2).toString();
  }

}
