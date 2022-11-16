import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemlistComponent } from './view-itemlist.component';

describe('ViewItemlistComponent', () => {
  let component: ViewItemlistComponent;
  let fixture: ComponentFixture<ViewItemlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
