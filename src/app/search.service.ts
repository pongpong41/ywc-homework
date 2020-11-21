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
  private allMerchants: Merchant[] = [];

  constructor(private http: HttpClient) {}

  updateSearch(): Observable<any> {
    return this.http.get<ApiResult>(this.apiUrl).pipe(
      map((apiResult: ApiResult) => {
        const { merchants, ...filter } = apiResult;
        this.currentFilter.next(filter);
        this.currentMerchant.next(merchants);
        this.allMerchants = merchants;
      }),
      catchError(
        (error: any): Observable<void> => {
          console.error(error);
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

  updateSearchFilter(filter: SearchFilter): void {
    let filteredMerchants = this.allMerchants;
    if (filter.category) {
      if (filter.category.name === 'สินค้าทั่วไป') {
        filteredMerchants = filteredMerchants.filter(
          (merchant) => !merchant.categoryName.includes('อาหาร')
        );
      } else {
        filteredMerchants = filteredMerchants.filter((merchant) =>
          filter.category?.name.includes(merchant.categoryName)
        );
      }
    }
    if (filter.subcategory) {
      filteredMerchants = filteredMerchants.filter(
        (merchant) => merchant.subcategoryName === filter.subcategory
      );
    }
    if (
      filter.province !== 'พื้นที่ใกล้ฉัน' &&
      filter.province !== 'สถานที่ทั้งหมด'
    ) {
      filteredMerchants = filteredMerchants.filter(
        (merchant) => merchant.addressProvinceName === filter.province
      );
    }
    if (filter.priceRange) {
      filteredMerchants = filteredMerchants.filter(
        (merchant) => merchant.priceLevel === filter.priceRange
      );
    }

    if (!filter.category) {
      filter.subcategory = null;
    }
    this.searchFilter.next(filter);
    this.currentMerchant.next(filteredMerchants);
  }

  mockMerchants(): void {
    const newMerchants = this.merchants.concat(this.merchants.slice(0, 5));
    this.currentMerchant.next(newMerchants);
  }

  setMockData(): void {
    const { merchants, ...filter } = MOCK;
    this.currentFilter.next(filter);
    this.currentMerchant.next(merchants);
    this.allMerchants = merchants;
  }
}
