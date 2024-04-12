import { Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'terminal-input',
  templateUrl: './terminal-input.component.html',
  styleUrls: ['./terminal-input.component.css']
})
export class TerminalInputComponent {

  @Input() promptPrefix: string = "";
  @Input() receivedEvent: any;
  @Input() waitingOn: any;
  @ViewChild('inputField') inputField!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router) {}

  receivedEventFn(event: any) {
    if (event['animationName'] === this.waitingOn) {
      this.renderer.removeAttribute(this.inputField.nativeElement, 'disabled')
      this.inputField?.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedEvent'].currentValue !== changes['receivedEvent'].previousValue) {
      this.receivedEventFn(this.receivedEvent)
    }
  }

  terminalFn(e: any) {
    switch (e.target.value) {
      case 'help':
      case '/help':
      case '?':
        this.router.navigateByUrl('/help');
        break;
      default:
        this.router.navigateByUrl('/');
        break;
    }
  }
}
