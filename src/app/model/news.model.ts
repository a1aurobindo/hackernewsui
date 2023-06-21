export interface News {
  id: string;
  title: string;
  type: string;
  url: string;
}

export interface NewsSearchResponse {
  content: News[];
  size: number;
  number: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  firstPage: boolean;
  lastPage: boolean;
}
