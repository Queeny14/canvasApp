import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-styling-options',
  templateUrl: './styling-options.component.html',
  styleUrls: ['./styling-options.component.css']
})
export class StylingOptionsComponent {
  @Input() selectedField: string;
  @Output() styleChanged: EventEmitter<any> = new EventEmitter<any>();

  fontSize: number = 20;
  fontStyle: string = 'normal';
  fontWeight: string = 'normal';
  fontFamily: string = 'Arial';
  isUnderline: boolean = false;
  textColor: string = '#000000';
  backgroundColor: string = 'transparent';
  textAlign: string = 'left';

  fontList: string[] = ['Arial', 'Verdana', 'Times New Roman', 'Courier New'];

  onStyleChange(): void {
    const style = {
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontWeight: this.fontWeight,
      fontFamily: this.fontFamily,
      isUnderline: this.isUnderline,
      textColor: this.textColor,
      backgroundColor: this.backgroundColor,
      textAlign: this.textAlign
    };

    this.styleChanged.emit(style);
  }
}

  // applyStyle(): void {
  //   const style = {
  //     margin: this.margin,
  //     padding: this.padding,
  //     fontSize: this.fontSize
  //     // Add more style properties as needed
  //   };

  //   this.styleApplied.emit(style);
  // }

