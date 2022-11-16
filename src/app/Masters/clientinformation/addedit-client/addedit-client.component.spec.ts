import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditClientComponent } from './addedit-client.component';

describe('AddeditClientComponent', () => {
  let component: AddeditClientComponent;
  let fixture: ComponentFixture<AddeditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
