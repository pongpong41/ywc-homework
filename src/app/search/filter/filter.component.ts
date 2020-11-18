import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Category, Filter } from '../type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter: Filter | null = null;

  selectedCategory: Category | null = null;
  selectedProvince: string | null = null;
  selectedPriceRange: number | null = null;
  selectedSubcategory: string | null = null;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCurrentFilter().subscribe((currentFilter) => {
      this.filter = currentFilter;
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }
}
