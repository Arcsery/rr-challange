import { Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-conflict-snackbar.component.ts',
  imports: [
    MatButton
  ],
  templateUrl: './conflict-snackbar.component.html',
  styleUrl: './conflict-snackbar.component.scss',
})
export class ConflictSnackbarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<ConflictSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; reload: () => void }
  ) {}

  reload() {
    this.data.reload();
    this.snackBarRef.dismiss();
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
