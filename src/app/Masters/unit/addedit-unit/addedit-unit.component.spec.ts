import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditUnitComponent } from './addedit-unit.component';

describe('AddeditUnitComponent', () => {
  let component: AddeditUnitComponent;
  let fixture: ComponentFixture<AddeditUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
