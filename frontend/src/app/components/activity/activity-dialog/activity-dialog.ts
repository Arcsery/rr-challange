import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivityService} from '../activity-service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {ActivityResponseDto} from '../dto/ActivityResponseDto';
import {ActivityRequestDto} from '../dto/ActivityRequestDto';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

interface ActivityDialogData {
  partnerId: number;
  activity?: ActivityResponseDto;
}

@Component({
  selector: 'app-activity-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle
  ],
  templateUrl: './activity-dialog.html',
  styleUrl: './activity-dialog.scss',
})
export class ActivityDialog {
  private readonly fb = inject(FormBuilder);
  private readonly activityService = inject(ActivityService);
  private readonly dialogRef = inject(MatDialogRef<ActivityDialog>);
  readonly data = inject<ActivityDialogData>(MAT_DIALOG_DATA);

  isSaving = false;
  isEdit = !!this.data.activity;

  activityForm = this.fb.nonNullable.group({
    subject: ['', [Validators.required, Validators.maxLength(150)]],
    type: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(1000)]],
    durationMinutes: [1, [Validators.required, Validators.min(1)]],
    responsibleName: ['', [Validators.required, Validators.maxLength(150)]]
  });

  constructor() {
    if (this.data.activity) {
      this.activityForm.reset({
        subject: this.data.activity.subject ?? '',
        type: this.data.activity.type ?? '',
        description: this.data.activity.description ?? '',
        durationMinutes: this.data.activity.durationMinutes ?? 1,
        responsibleName: this.data.activity.responsibleName ?? ''
      });
    }
  }

  save(): void {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const request: ActivityRequestDto = {
      subject: this.subjectCtrl.getRawValue().trim(),
      type: this.typeCtrl.getRawValue().trim(),
      description: this.descriptionCtrl.getRawValue().trim() || null,
      durationMinutes: this.durationMinutesCtrl.getRawValue(),
      responsibleName: this.responsibleNameCtrl.getRawValue().trim(),
      partnerId: this.data.partnerId
    };

    const request$ = this.isEdit && this.data.activity?.id != null
      ? this.activityService.update(this.data.activity.id, request)
      : this.activityService.create(request);

    request$.subscribe({
      next: (response) => {
        this.isSaving = false;
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error(error);
        this.isSaving = false;
      }
    });
  }

  get subjectCtrl() {
    return this.activityForm.controls.subject;
  }

  get typeCtrl() {
    return this.activityForm.controls.type;
  }

  get descriptionCtrl() {
    return this.activityForm.controls.description;
  }

  get durationMinutesCtrl() {
    return this.activityForm.controls.durationMinutes;
  }

  get responsibleNameCtrl() {
    return this.activityForm.controls.responsibleName;
  }
}
