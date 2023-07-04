import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlannersComponent } from './show-planners.component';

describe('ShowPlannersComponent', () => {
  let component: ShowPlannersComponent;
  let fixture: ComponentFixture<ShowPlannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPlannersComponent]
    });
    fixture = TestBed.createComponent(ShowPlannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
