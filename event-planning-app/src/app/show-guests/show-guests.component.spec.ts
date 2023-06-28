import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGuestsComponent } from './show-guests.component';

describe('ShowGuestsComponent', () => {
  let component: ShowGuestsComponent;
  let fixture: ComponentFixture<ShowGuestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGuestsComponent]
    });
    fixture = TestBed.createComponent(ShowGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
