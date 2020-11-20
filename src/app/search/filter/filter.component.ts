import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Category, Filter, SearchFilter } from '../type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter: Filter | null = null;

  searchFilter: SearchFilter;

  constructor(private searchService: SearchService) {
    this.searchFilter = {
      category: null,
      subcategory: null,
      province: 'พื้นที่ใกล้ฉัน',
      priceRange: null,
    };
  }

  ngOnInit(): void {
    this.searchService.getCurrentFilter().subscribe((currentFilter) => {
      this.filter = currentFilter;
    });
    this.searchService.getCurrentSearchFilter().subscribe((currentSearch) => {
      this.searchFilter = currentSearch;
    });
  }

  searchChanged(): void {
    this.searchService.updateSearchFilter(this.searchFilter);
  }
}
