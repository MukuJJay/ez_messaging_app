import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContactsComponent } from './grid-contacts.component';

describe('GridContactsComponent', () => {
  let component: GridContactsComponent;
  let fixture: ComponentFixture<GridContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridContactsComponent]
    });
    fixture = TestBed.createComponent(GridContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
