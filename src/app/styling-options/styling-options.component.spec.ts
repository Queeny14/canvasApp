import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingOptionsComponent } from './styling-options.component';

describe('StylingOptionsComponent', () => {
  let component: StylingOptionsComponent;
  let fixture: ComponentFixture<StylingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylingOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
