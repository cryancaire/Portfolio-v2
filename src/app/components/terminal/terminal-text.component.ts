import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'terminal-text',
  templateUrl: './terminal-text.component.html',
  styleUrls: ['./terminal-text.component.css']
})
export class TerminalTextComponent {

  @Input() text: string = "";
  @Input() classes: string = "";
  @Input() animationName: string = "";
  @Output() isAnimationComplete = new EventEmitter();
  @Input() waitingOn: string = "";
  @Input() receivedEvent: any;

  @Input() typeSpeed: any = 100;
  @Input() endDelay: any = 20;

  @ViewChild('blinkingText') blinkingText!: ElementRef;
  @ViewChild('cursor') textCursor!: ElementRef;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receivedEvent'] && changes['receivedEvent'].currentValue !== changes['receivedEvent'].previousValue) {
      if (this.waitingOn === changes['receivedEvent'].currentValue['animationName']){
        this.textCursor.nativeElement.classList.remove('invisible')
        this.animateText(this.text, this.blinkingText.nativeElement, this.textCursor.nativeElement);
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.waitingOn) {
      if (this.blinkingText && this.textCursor.nativeElement) {
        this.textCursor.nativeElement.classList.remove('invisible')
        this.animateText(this.text, this.blinkingText.nativeElement, this.textCursor.nativeElement);
      }
    }
  }

  animateText(text: string, container: any, cursor: any) {
    let index = 0;
    let cursorBlink = 0;
    const interval = setInterval(() => {
      container.textContent += text[index];
      index++;
      if (index === text.length) {
        clearInterval(interval);
        const cursorInterval = setInterval(() => {
          cursorBlink++;
          if (cursorBlink === this.endDelay) {
            clearInterval(cursorInterval);
            cursor.classList.add('invisible');
            this.isAnimationComplete.emit({
              'type': 'animation',
              'animationName': this.animationName,
              'status': 'complete'
            })
          }
        }, this.typeSpeed);
      }
    }, this.typeSpeed); // Adjust the speed as needed
  }

}
