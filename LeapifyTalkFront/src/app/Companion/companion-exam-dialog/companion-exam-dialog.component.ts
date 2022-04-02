import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companion-exam-dialog',
  templateUrl: './companion-exam-dialog.component.html',
  styleUrls: ['./companion-exam-dialog.component.css']
})
export class CompanionExamDialogComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  closeDialog = (): void => {
    this.router.navigate([],{
      queryParams:{
        sts:null
      },
      queryParamsHandling: 'merge'
    })

  }

}
