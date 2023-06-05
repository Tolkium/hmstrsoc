import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() button_link = '';
  @Input() button_class = '';
  @Input() button_title = 'Button title';
  @Input() button_padding_y = '10';
  @Input() button_padding_x = '20';

  pressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  pressButton() {
    this.pressed = !this.pressed;
  }

  unpressButton() {
    this.pressed = !this.pressed;
  }
}
