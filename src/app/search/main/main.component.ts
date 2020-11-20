import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Merchant, SearchFilter } from '../type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  merchants: Merchant[] = [];
  searchFilter?: SearchFilter;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCurrentMerchants().subscribe((currentMerchants) => {
      this.merchants = currentMerchants;
    });
    this.searchService.getCurrentSearchFilter().subscribe((currentSearch) => {
      this.searchFilter = currentSearch;
    });
  }

  showMore(): void {
    this.searchService.mockMerchants();
  }

  get searchText(): string {
    if (!this.searchFilter?.category) {
      return 'ทั้งหมด';
    } else {
      if (!this.searchFilter.subcategory) {
        return this.searchFilter.category.name + ' ทั้งหมด';
      } else {
        return (
          this.searchFilter.category.name +
          ' ประเภท' +
          this.searchFilter.subcategory
        );
      }
    }
  }
}
