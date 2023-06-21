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

  funcArr: Observable<News>[] = [];
  subscription: Subscription = new Subscription();
  dataSource: NewsTableDatasource = new NewsTableDatasource();
  constructor(private newsService: NewsFeedService) { }

  ngOnInit(): void {
    this.getNewsFeeds();
  }

  clickNews(news: News): void {

    window.open(news.url, "_blank")
  }

  getNewsFeeds(): void {
    console.log("test 2")
    this.subscription.add(
      this.newsService.getAllFeeds().subscribe(ids => {
        this.subscription.add(this.getFeedLoop(ids).subscribe((resp) => {
          let nresRespx = {
            content : resp,
            size : resp.length,
            number : 1,
            totalPages : 1,
            totalElements : resp.length,
            numberOfElements : resp.length,
            firstPage : true,
            lastPage : true
          }
          this.dataSource = new NewsTableDatasource();
          this.dataSource.loadNewsData(nresRespx);
        }))
      })
    );
  }

  getFeedLoop(ids: number[]) : Observable<News[]> {

    ids.forEach(id => this.funcArr.push(this.newsService.getOneFeed(id)))
    return forkJoin(this.funcArr)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
