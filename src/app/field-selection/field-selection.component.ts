import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-field-selection',
  templateUrl: './field-selection.component.html',
  styleUrls: ['./field-selection.component.css']
})
export class FieldSelectionComponent {
  @Output() fieldDragged: EventEmitter<string> = new EventEmitter<string>();
  @Output() fieldDropped: EventEmitter<string> = new EventEmitter<string>();
  @Output() fieldSelected: EventEmitter<string> = new EventEmitter<string>();



  dragField(event: DragEvent): void {
    const field = event.target['dataset'].field;
    if (field) {
      event.dataTransfer?.setData('text/plain', field);
    }
  }
  
  dragStart(event: DragEvent, field: string): void {
    event.dataTransfer.setData('text/plain', field);
  }

  dragEnd(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    const field = event.dataTransfer.getData('text/plain');
    this.fieldDropped.emit(field);
  }
}
