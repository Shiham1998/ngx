import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditDepartmentComponent } from './addedit-department.component';

describe('AddeditDepartmentComponent', () => {
  let component: AddeditDepartmentComponent;
  let fixture: ComponentFixture<AddeditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
