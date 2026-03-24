import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictSnackbarComponent } from './conflict-snackbar.component.ts';

describe('ConflictSnackbarComponent', () => {
  let component: ConflictSnackbarComponent;
  let fixture: ComponentFixture<ConflictSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConflictSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
