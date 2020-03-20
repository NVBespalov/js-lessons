import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntriesPipe } from './entries.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieComponent } from './cookie/cookie.component';
import { RowComponent } from './row/row.component';
import { LevelComponent } from './level/level.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesPipe,
    CookieComponent,
    RowComponent,
    LevelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
