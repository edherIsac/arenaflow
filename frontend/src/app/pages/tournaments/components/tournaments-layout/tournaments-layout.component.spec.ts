import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsLayoutComponent } from './tournaments-layout.component';

describe('TournamentsLayoutComponent', () => {
  let component: TournamentsLayoutComponent;
  let fixture: ComponentFixture<TournamentsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentsLayoutComponent]
    });
    fixture = TestBed.createComponent(TournamentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
