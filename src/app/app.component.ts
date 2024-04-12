import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-v2';

  recentlyCompletedAnimation: any;

  receivedEvent(event:any) {
    if (event['type'] === 'animation')
    this.recentlyCompletedAnimation = event;
  }
}
