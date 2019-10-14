import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(public snackBar: MatSnackBar) {}

  showSuccess(message, duration = 4000) {
    this.snackBar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  showError(message, duration = 4000) {
    this.snackBar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  showWarning(message, duration = 4000) {
    this.snackBar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
    });
  }
}
