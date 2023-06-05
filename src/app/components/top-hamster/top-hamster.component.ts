import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import * as appData from '../../../data'

type Hamster = {
  hamster: string;
  headwear: string;
  eyes: string;
  mouths: string;
  clothes: string;
  colors: number[];
};
@Component({
  selector: 'app-top-hamster',
  templateUrl: './top-hamster.component.html',
  styleUrls: ['./top-hamster.component.scss']
})
export class TopHamsterComponent implements OnInit {

  hamster_change_subscription: Subscription;
  background_colors: string[] = ['#00d6d5', '#f36353', '#43ea9f', '#fdc015'];
  hamsters = appData.hamsters
  hamster_counter: number = 0;

  shown_hamster: Hamster = { hamster: '',
                             headwear: '',
                             eyes: '',
                             mouths: '',
                             clothes: '',
                             colors: []
                           };

  constructor(private cdr: ChangeDetectorRef) {
    this.hamster_change_subscription = interval(750).subscribe((x => {
      this.loadNextHamster();
    }));
  }

  ngOnInit(): void {
  }

  shuffle(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  loadNextHamster() {
    this.shown_hamster = this.hamsters[this.hamster_counter]
    this.hamster_counter = (this.hamster_counter + 1) % (this.hamsters.length);
    this.cdr.detectChanges()
  }
}
