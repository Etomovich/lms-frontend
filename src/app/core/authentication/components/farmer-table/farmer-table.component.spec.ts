import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerTableComponent } from './farmer-table.component';

describe('FarmerTableComponent', () => {
  let component: FarmerTableComponent;
  let fixture: ComponentFixture<FarmerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
