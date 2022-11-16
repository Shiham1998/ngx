import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditCompanyComponent } from './addedit-company.component';

describe('AddeditCompanyComponent', () => {
  let component: AddeditCompanyComponent;
  let fixture: ComponentFixture<AddeditCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
