import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerInventory } from './officer-inventory';

describe('OfficerInventory', () => {
  let component: OfficerInventory;
  let fixture: ComponentFixture<OfficerInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerInventory],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficerInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
