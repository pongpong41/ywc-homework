import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResult, Filter, Merchant, SearchFilter } from './search/type';
import { MOCK } from './responseMock';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'https://panjs.com/ywc18.json'; // URL to web api

  private readonly currentFilter = new BehaviorSubject<Filter>({
    categories: [],
    provinces: [],
    priceRange: [],
  });
  private readonly currentMerchant = new BehaviorSubject<Merchant[]>([]);
  private readonly searchFilter = new BehaviorSubject<SearchFilter>({
    category: null,
    subcategory: null,
    province: 'พื้นที่ใกล้ฉัน',
    priceRange: null,
  });

  constructor(private http: HttpClient) {}

  updateSearch(): Observable<any> {
    console.log('in');
    return this.http.get<ApiResult>(this.apiUrl).pipe(
      map((apiResult: ApiResult) => {
        console.log('map');
        const { merchants, ...filter } = apiResult;
        console.log('merchant', merchants);
        console.log('filter:', filter);
        this.currentFilter.next(filter);
        this.currentMerchant.next(merchants);
      }),
      catchError(
        (error: any): Observable<void> => {
          console.error(error);
          const { merchants, ...filter } = MOCK;
          console.log('merchant', merchants);
          console.log('filter:', filter);
          this.currentFilter.next(filter);
          this.currentMerchant.next(merchants);
          return of(error);
        }
      )
    );
  }

  get filter(): Filter {
    return this.currentFilter.getValue();
  }

  get merchants(): Merchant[] {
    return this.currentMerchant.getValue();
  }

  getCurrentFilter(): Observable<Filter> {
    return this.currentFilter.asObservable();
  }

  getCurrentMerchants(): Observable<Merchant[]> {
    return this.currentMerchant.asObservable();
  }

  getCurrentSearchFilter(): Observable<SearchFilter> {
    return this.searchFilter.asObservable();
  }

  updateSearchFilter(filter?: SearchFilter): void {
    console.log(filter);
    if (filter) {
      this.searchFilter.next(filter);
    }
  }
}
