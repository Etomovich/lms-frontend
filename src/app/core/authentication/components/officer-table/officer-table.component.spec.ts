import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerTableComponent } from './officer-table.component';

describe('OfficerTableComponent', () => {
  let component: OfficerTableComponent;
  let fixture: ComponentFixture<OfficerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
