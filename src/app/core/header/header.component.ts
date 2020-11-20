import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Filter, SearchFilter } from 'src/app/search/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() openEvent = new EventEmitter<undefined>();

  filter: Filter | null = null;

  searchFilter?: SearchFilter;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getCurrentFilter().subscribe((currentFilter) => {
      this.filter = currentFilter;
    });
    console.log(this.filter);
    this.searchService.getCurrentSearchFilter().subscribe((currentSearch) => {
      this.searchFilter = currentSearch;
    });
  }

  openFilter(): void {
    this.openEvent.emit();
  }

  get hintTextSearch(): string {
    const categoriesName = this.filter?.categories.map(
      (category) => category.name
    );
    return categoriesName?.join(' ') || '';
  }
}
