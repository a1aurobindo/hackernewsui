import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { News } from "../model/news.model";

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  private allFeedUrl: string = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  private  oneFeedUrl: string = "https://hacker-news.firebaseio.com/v0/item/"
  private oneFeedSuffix:string = ".json?print=pretty"
  private maxItemUrl: string = "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty"

  constructor(private httpClient: HttpClient) {
  }

  getAllFeeds(): Observable<number[]> {

    return this.httpClient.get<number[]>(this.allFeedUrl);
  }

  getOneFeed(newsId: number): Observable<News> {

    return this.httpClient.get<News>(this.oneFeedUrl + newsId + this.oneFeedSuffix);
  }

  getMaxItemId() {
    return this.httpClient.get<number>(this.maxItemUrl);
  }
}
