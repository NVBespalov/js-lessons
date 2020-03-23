import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
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
              transform: 'translateY(89px)'
            })),
            state('up', style({
              transform: 'translateY(-89px)'
            })),
            state('left', style({
              transform: 'translateX(-78px)'
            })),
            state('right', style({
              transform: 'translateX(78px)'
            })),
            transition('*=>down, *=> up', animate('600ms')),

        ])
    ],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieComponent implements OnInit, OnDestroy {
    @Input() currentState: string;
    @Input() highlighted: boolean;
    @Input() name;
    @Output() select = new EventEmitter();

    constructor(public gameApi: GameApiService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        // debugger
    }
}
