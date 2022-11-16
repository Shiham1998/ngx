import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditHolidayComponent } from './addedit-holiday.component';

describe('AddeditHolidayComponent', () => {
  let component: AddeditHolidayComponent;
  let fixture: ComponentFixture<AddeditHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
