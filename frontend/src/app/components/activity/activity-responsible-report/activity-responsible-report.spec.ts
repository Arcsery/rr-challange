import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityResponsibleReport } from './activity-responsible-report';

describe('ActivityResponsibleReport', () => {
  let component: ActivityResponsibleReport;
  let fixture: ComponentFixture<ActivityResponsibleReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityResponsibleReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityResponsibleReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
