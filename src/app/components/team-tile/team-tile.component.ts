import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-tile',
  templateUrl: './team-tile.component.html',
  styleUrls: ['./team-tile.component.scss']
})
export class TeamTileComponent implements OnInit {

  @Input() img_path = '';
  @Input() name = '';
  @Input() role = '';
  @Input() about = '';

  constructor() { }

  ngOnInit(): void {
  }

}
