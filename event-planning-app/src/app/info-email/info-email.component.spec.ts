import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmailComponent } from './info-email.component';

describe('InfoEmailComponent', () => {
  let component: InfoEmailComponent;
  let fixture: ComponentFixture<InfoEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEmailComponent]
    });
    fixture = TestBed.createComponent(InfoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
