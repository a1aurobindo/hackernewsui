import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  reloadFlag: boolean = false;

  constructor() { }

  refreshFeed(): void {
    console.log("test 1")
    this.reloadFlag =  true;
  }
}
