import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerDocument } from './officer-document';

describe('OfficerDocument', () => {
  let component: OfficerDocument;
  let fixture: ComponentFixture<OfficerDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficerDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
