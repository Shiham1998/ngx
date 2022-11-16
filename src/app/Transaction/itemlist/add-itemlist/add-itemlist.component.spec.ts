import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemlistComponent } from './add-itemlist.component';

describe('AddItemlistComponent', () => {
  let component: AddItemlistComponent;
  let fixture: ComponentFixture<AddItemlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
