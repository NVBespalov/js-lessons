import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameApiService } from './game-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'cookie-crunch';
    toState: string;
    gridStyles = {
        display: 'grid',
        'grid-gap': '6px',
        'grid-template-columns': 'repeat(' + this.gameApi.sy + ', minmax(70px, 1fr))',
        width: this.gameApi.sx * 70 + (6 * this.gameApi.sx - 1) + 'px'
    };
    fields: number[];

    constructor(public gameApi: GameApiService) {
        this.gameApi.start();
    }

    trackByEmpCode(index: number, cookieName: any) {
        return cookieName;
    }

    changeState(state: string) {
        this.toState = state;
    }

}
