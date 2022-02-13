import { Component, Input, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;

  @Input() progressInfoData: any[]

  constructor(private router: Router ) {
  }

  navigate = (item:any) => {
    this.router.navigate(['/pages/'+item])
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
