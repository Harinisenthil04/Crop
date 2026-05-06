import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerHome } from './officer-home';

describe('OfficerHome', () => {
  let component: OfficerHome;
  let fixture: ComponentFixture<OfficerHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerHome],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficerHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
