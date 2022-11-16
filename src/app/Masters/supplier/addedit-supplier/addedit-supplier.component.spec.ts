import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditSupplierComponent } from './addedit-supplier.component';

describe('AddeditSupplierComponent', () => {
  let component: AddeditSupplierComponent;
  let fixture: ComponentFixture<AddeditSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
