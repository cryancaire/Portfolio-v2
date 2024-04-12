import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'terminal-text',
  templateUrl: './terminal-text.component.html',
  styleUrls: ['./terminal-text.component.css']
})
export class TerminalTextComponent {

  @Input() text: string = "";
  @Input() variation: string = "";
  @Input() animationName: string = "";
  @Output() isAnimationComplete = new EventEmitter();
  @Input() waitingOn: string = "";
  @Input() receivedEvent: any;

  @ViewChild('blinkingText') blinkingText!: ElementRef;
  @ViewChild('cursor') textCursor!: ElementRef;
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
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
          if (cursorBlink === 20) {
            clearInterval(cursorInterval);
            cursor.classList.add('invisible');
            this.isAnimationComplete.emit({
              'type': 'animation',
              'animationName': this.animationName,
              'status': 'complete'
            })
          }
        }, 100);
      }
    }, 100); // Adjust the speed as needed
  }

}
