import {inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponse} from '../../expection/dto/ApiErrorResponse';
import {SNACKBAR_CLOSE_LABEL, SNACKBAR_CONFLICT_EXTRA_MESSAGE, SNACKBAR_DEFAULT_DURATION, SNACKBAR_DEFAULT_ERROR_MESSAGE} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SnackbarMessageService {
  private readonly snackBar = inject(MatSnackBar);

  showError(error: HttpErrorResponse, reloadCallback?: () => void) {

    const apiError = error.error as ApiErrorResponse;

    const message =
      apiError?.message ?? SNACKBAR_DEFAULT_ERROR_MESSAGE;

    if (apiError?.status === 409 && reloadCallback) {

      const snack = this.snackBar.open(
        `${message}\n${SNACKBAR_CONFLICT_EXTRA_MESSAGE}`,
        'Frissítés'
      );

      snack.onAction().subscribe(() => reloadCallback());

      return;
    }

    this.snackBar.open(
      message,
      SNACKBAR_CLOSE_LABEL,
      {
        duration: SNACKBAR_DEFAULT_DURATION
      }
    );
  }

  showSuccess(message: string) {
    this.snackBar.open(
      message,
      SNACKBAR_CLOSE_LABEL,
      {
        duration: SNACKBAR_DEFAULT_DURATION
      }
    );
  }
}
