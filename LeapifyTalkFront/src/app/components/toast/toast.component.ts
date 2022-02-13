import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  title: string = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackBarRef: MatSnackBarRef<ToastComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data.type == 'success') {
      this.title = "Well done!"
    }
    else if(this.data.type == 'error'){
      this.title = "Oh snap!"
    }
    else{
      this.title = "Warning!";
    }
  }

  dismiss() {
    this._snackBarRef.dismiss();
  }
}
