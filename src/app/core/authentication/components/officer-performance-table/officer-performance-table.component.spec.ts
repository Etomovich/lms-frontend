import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerPerformanceTableComponent } from './officer-performance-table.component';

describe('OfficerPerformanceTableComponent', () => {
  let component: OfficerPerformanceTableComponent;
  let fixture: ComponentFixture<OfficerPerformanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerPerformanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerPerformanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
