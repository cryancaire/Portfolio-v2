import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'terminal-input',
  templateUrl: './terminal-input.component.html',
  styleUrls: ['./terminal-input.component.css']
})
export class TerminalInputComponent {

  @Input() promptPrefix: string = "";
  @Input() receivedEvent: any;
  @Input() waitingOn: any;

  receivedEventFn(event: any) {
    if (event['animationName'] === this.waitingOn) {
      const inputField = document.getElementById('inputField');
      inputField?.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedEvent'].currentValue !== changes['receivedEvent'].previousValue) {
      this.receivedEventFn(this.receivedEvent)
    }
  }

}
