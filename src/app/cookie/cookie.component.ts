import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GameApiService } from '../game-api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { from, interval } from 'rxjs';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css'],
  animations: [
    trigger('changeState', [
      state('state1', style({
        // backgroundColor: 'green',
        transform: 'translateY(-82px)'
      })),
      state('state2', style({
        // backgroundColor: 'red',
        transform: 'translateY(82px)'
      })),
      transition('*=>state1', animate('600ms')),
      transition('*=>state2', animate('600ms'))
    ])
  ]
})
export class CookieComponent implements OnInit {
  @Input() currentState: string;
  @Input() highlighted: boolean;
  @Input() name;
  @Output() select = new EventEmitter();
  constructor(public gameApi: GameApiService) {

  }

  ngOnInit(): void {
  }

}
