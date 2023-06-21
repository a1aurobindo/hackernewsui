import {Component, OnInit, ViewChild} from '@angular/core';
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {NewsFeedService} from "../../services/news-feed.service";
import {Subscription} from "rxjs";
import {NewsListComponent} from "../news-list/news-list.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  reloadFlag: boolean = false;
  // @ts-ignore
  @ViewChild(NewsListComponent) newsListComponent:NewsListComponent;
  constructor(private router:Router,
              private newsService: NewsFeedService) { }

  ngOnInit(): void {
    this.refreshFeed();
  }

  refreshFeed(): void {
    this.newsListComponent.refreshFeed();
    this.reloadFlag =  true;
  }
}
