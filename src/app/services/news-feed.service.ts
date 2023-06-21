import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {News, NewsSearchResponse} from "../model/news.model";
import {Sort} from "@angular/material/sort";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  allFeedUrl: string = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  oneFeedUrl: string = "https://hacker-news.firebaseio.com/v0/item/%s.json?print=pretty"

  constructor(private httpClient: HttpClient) {
  }

  getAllFeeds(): Observable<number[]> {

    return this.httpClient.get<number[]>(this.allFeedUrl);
  }

  getOneFeed(newsId: number): Observable<News> {

    return this.httpClient.get<News>(parameterizedString(this.oneFeedUrl, `${newsId}`));
  }
}

export const parameterizedString = (...args: string[]): string => {
  const str: string = args[0];
  const params: string[] = args.filter((_, index: number) => index > 0);
  return !str ? '' : str.replace(/%s[0-9]+/g, (matchedStr: string) => {
    const variableIndex = +matchedStr.replace('%s', '') - 1;
    return params[variableIndex];
  });
};
