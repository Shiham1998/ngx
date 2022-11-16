import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditHsnComponent } from './addedit-hsn.component';

describe('AddeditHsnComponent', () => {
  let component: AddeditHsnComponent;
  let fixture: ComponentFixture<AddeditHsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditHsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditHsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
