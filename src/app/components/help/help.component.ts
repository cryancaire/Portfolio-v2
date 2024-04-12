import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  recentlyCompletedAnimation: any;

  receivedEvent(event:any) {
    if (event['type'] === 'animation') {
      this.recentlyCompletedAnimation = event;
      
    }
  }
}
