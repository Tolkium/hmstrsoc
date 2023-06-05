import { Component, OnInit, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-roadmap-tile',
  templateUrl: './roadmap-tile.component.html',
  styleUrls: ['./roadmap-tile.component.scss']
})
export class RoadmapTileComponent implements OnInit {
  faCheck = faCheck;

  @Input() percentage = '0%';
  @Input() points: string[] = [];
  @Input() checked = false;
  @Input() blurred = false;

  constructor() { }

  ngOnInit(): void {
  }

}
