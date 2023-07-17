import { ComponentFixture, TestBed } from '@angular/core/testing';

import * as pdfCustomizerComponent from './pdf-customizer.component';

describe('PdfCustomizerComponent', () => {
  let component: pdfCustomizerComponent.PdfCustomizerComponent;
  let fixture: ComponentFixture<pdfCustomizerComponent.PdfCustomizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pdfCustomizerComponent.PdfCustomizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pdfCustomizerComponent.PdfCustomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
