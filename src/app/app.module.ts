import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalTextComponent } from './components/terminal/terminal-text.component';
import { TerminalInputComponent } from './components/terminal-input/terminal-input.component';


@NgModule({
  declarations: [
    AppComponent,
    TerminalTextComponent,
    TerminalInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
