import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GameApiService } from '../game-api.service';

@Component({
    selector: 'app-level',
    templateUrl: './level.component.html',
    styleUrls: ['./level.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelComponent implements OnInit {

    constructor(public gameApi: GameApiService) {
    }

    ngOnInit(): void {
    }

}
