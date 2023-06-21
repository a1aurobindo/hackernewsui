import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  reloadFlag: boolean = false;
  // @ts-ignore
  // @ViewChild(NewsListComponent) newsListComponent:NewsListComponent;
  constructor() { }

  ngOnInit(): void {
    // this.refreshFeed();
  }

  refreshFeed(): void {
    console.log("test 1")
    // this.newsListComponent.getNewsFeeds();
    this.reloadFlag =  true;
  }
}
