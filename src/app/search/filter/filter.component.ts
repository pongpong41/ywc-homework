import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Category, Filter } from '../type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter: Filter|null = null;
  currentCategory: Category|null = null;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCurrentFilter().subscribe((currentFilter) => {
      this.filter = currentFilter;
    });
  }

  selectCategory(category: Category): void {
    this.currentCategory = category;
  }
}
