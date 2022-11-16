import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditDesignationComponent } from './addedit-designation.component';

describe('AddeditDesignationComponent', () => {
  let component: AddeditDesignationComponent;
  let fixture: ComponentFixture<AddeditDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditDesignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
