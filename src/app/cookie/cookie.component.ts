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
      state('down', style({
        transform: 'translateY(82px)'
      })),
      state('up', style({
        transform: 'translateY(-82px)'
      })),
      state('left', style({
        transform: 'translateX(-70px)'
      })),
      state('right', style({
        transform: 'translateX(70px)'
      })),
      // transition('', [
      //   style({ transform: 'scale(0)' }),
      //   animate('500ms')
      // ]),
      transition('*=>down, *=> up', animate('600ms')),
    ])
  ]
})
export class CookieComponent implements OnInit {
  @Input() currentState: string;
  @Input() highlighted: boolean;
  @Input() name;
  @Output() select = new EventEmitter();
  constructor(public gameApi: GameApiService) {}

  ngOnInit(): void {
  }

}
