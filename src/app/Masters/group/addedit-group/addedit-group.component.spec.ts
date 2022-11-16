import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditGroupComponent } from './addedit-group.component';

describe('AddeditGroupComponent', () => {
  let component: AddeditGroupComponent;
  let fixture: ComponentFixture<AddeditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
