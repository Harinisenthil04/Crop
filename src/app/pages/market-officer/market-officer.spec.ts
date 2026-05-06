import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOfficer } from './market-officer';

describe('MarketOfficer', () => {
  let component: MarketOfficer;
  let fixture: ComponentFixture<MarketOfficer>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketOfficer],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketOfficer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
