import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsTableDatasource} from "../../config/news-table.datasource";
import { NewsFeedService } from "../../services/news-feed.service";
import { forkJoin, Observable, Subscription } from "rxjs";
import { News } from "../../model/news.model";

@Component({
  selector: 'app-news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  dataSource: NewsTableDatasource = new NewsTableDatasource();
  throttle: number = 0;
  distance = 1;
  pageSize = 20;
  newsSizeLimit = 500;
  indexId: number = 0;
  allItemIds: number[] = [];
  constructor(private newsService: NewsFeedService) { }

  ngOnInit(): void {
    this.dataSource = new NewsTableDatasource();
    this.subscription.add(this.getTopStories().subscribe(
        (resp) => {
          this.allItemIds = resp;
          this.getNextPageFeeds();
        }
    ));
  }

  clickNews(news: News): void {

    window.open(news.url, "_blank")
  }

  onScroll(): void {
    console.log("scrolled");
    this.getNextPageFeeds();
  }

  getTopStories() :  Observable<number[]>{
    return this.newsService.getAllFeeds();
  }

  getNextPageFeeds() : void {

    if(this.allItemIds.length <= this.indexId ) {
      return;
    }

    let funcArr: Observable<News>[] = []
    let pageIds: number[] = new Array(this.pageSize).fill(0)
      .map((n, index) => this.allItemIds[this.indexId + index]);
    this.indexId = this.allItemIds.indexOf(pageIds[pageIds.length - 1]);

    pageIds.forEach(id => funcArr.push(this.newsService.getOneFeed(id)));
    forkJoin(funcArr).subscribe(
      (resp) => {
        let newsResp = {
          content : resp,
          size : resp.length,
          number : 1,
          totalPages : 1,
          totalElements : resp.length,
          numberOfElements : resp.length,
          firstPage : true,
          lastPage : true
        }
        this.dataSource.loadNewsData(newsResp);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
