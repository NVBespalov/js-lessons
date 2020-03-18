import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EntriesPipe } from './entries.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieComponent } from './cookie/cookie.component';

@NgModule({
  declarations: [
    AppComponent,
    EntriesPipe,
    CookieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
