import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-asset-wall',
  templateUrl: './asset-wall.component.html',
  styleUrls: ['./asset-wall.component.scss']
})
export class AssetWallComponent implements OnInit {
  image_indexes: number[] = this.shuffle(Array.from({length: 27}, (_, i) => i + 1));
  images: any[] = [];
  background_colors: string[] = ['#fdc015', '#ff3440', '#00d6d5', '#8002ec', '#43ea9f', '#f36353'];
  offset_width: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    let this_ref = this;
    
    this.image_indexes.forEach(function(item){  
      this_ref.images.push({
        color: this_ref.background_colors[Math.floor(Math.random() * this_ref.background_colors.length)],
        path: item+'.png'
      })  
    });  
  }

  ngDoCheck(): void {
    this.offset_width = this.el.nativeElement.offsetWidth
  }

  shuffle(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
