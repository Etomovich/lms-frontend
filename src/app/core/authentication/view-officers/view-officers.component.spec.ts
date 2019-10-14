import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficersComponent } from './view-officers.component';

describe('ViewOfficersComponent', () => {
  let component: ViewOfficersComponent;
  let fixture: ComponentFixture<ViewOfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOfficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
