import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AddEditBrandComponent } from './addedit-brand.component';

describe('AddBrandComponent', () => {
  let component:AddEditBrandComponent;
  let fixture: ComponentFixture<AddEditBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
