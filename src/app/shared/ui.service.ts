import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingState =new Subject<boolean>()

  constructor(private snackBar:MatSnackBar) { }

  snackBarMsg(message, action, duration){
    this.snackBar.open(message, action, {
      duration:duration
    })
  }
}
