import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateMatchComponent } from './form-date-match.component';

describe('FormDateMatchComponent', () => {
  let component: FormDateMatchComponent;
  let fixture: ComponentFixture<FormDateMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDateMatchComponent]
    });
    fixture = TestBed.createComponent(FormDateMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
