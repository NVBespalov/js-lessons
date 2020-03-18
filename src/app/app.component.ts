import { Component } from '@angular/core';
import { GameApiService } from './game-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'cookie-crunch';
  toState: string;

  constructor(public gameApi: GameApiService) {
    this.gameApi.start();
  }

  changeState(state: string) {
    this.toState = state;
  }

}
