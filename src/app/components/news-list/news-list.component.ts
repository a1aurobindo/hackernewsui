import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NewsTableDatasource} from "../../config/news-table.datasource";
import {NewsFeedService} from "../../services/news-feed.service";
import {Observable, Subscription} from "rxjs";
import {News} from "../../model/news.model";

@Component({
  selector: 'app-news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {

  pubdate:string ='';
  category:string = '';
  subscription: Subscription = new Subscription();
  dataSource: NewsTableDatasource = new NewsTableDatasource();
  constructor(private newsService: NewsFeedService) { }

  ngOnInit(): void {
    this.getNewsFeeds(0);
  }

  clickNews(news: News): void {

    window.open(news.url)
  }

  getFeedOfThisDate(dateMs: number): void {
    this.pubdate = new Date(dateMs).toISOString().split('T')[0]
    this.getNewsFeeds(0)
  }

  getNewsFeeds(page: number): void {
    this.subscription.add(
      this.newsService.getAllFeeds().subscribe(ids => {
          this.subscription.add(this.getFeedLoop(ids).subscribe())

        this.dataSource = new NewsTableDatasource();
        this.dataSource.loadNewsData(id);
      })
    );
  }

  getFeedLoop(ids: number[]) : Observable<News> {
    ids.forEach(id => this.newsService.getOneFeed(ids))
  }

  refreshFeed(): void {
    this.category = '';
    this.pubdate = '';
    this.subscription.add(
      this.newsService.getAllFeeds().subscribe(
        (resp) => {
          console.log(resp)
          this.getNewsFeeds(0);
        }, (err) => {
          console.log(err);
          this.getNewsFeeds(0);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
