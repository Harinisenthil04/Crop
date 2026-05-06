import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerHistory } from './officer-history';

describe('OfficerHistory', () => {
  let component: OfficerHistory;
  let fixture: ComponentFixture<OfficerHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficerHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
