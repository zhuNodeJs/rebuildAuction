import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private rating: number = 0;

  private stars: boolean[];

  @Input()
  private readonly: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

  // 当输入属性发生变化，则触发ngOnChanges函数;
  ngOnChanges(changes: SimpleChanges): void {
      this.stars = [];
      for( var i = 1; i <= 5; i++) {
        this.stars.push(i > this.rating);
      }
  }

}
