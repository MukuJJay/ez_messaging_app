import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dashboardVariant: string =
    localStorage.getItem('activeDashboardVariant') || 'chat';

  switchVariant(ev: string) {
    this.dashboardVariant = ev;
  }
}
