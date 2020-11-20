import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Filter, SearchFilter } from 'src/app/search/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Output() openEvent = new EventEmitter<undefined>();

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

  openFilter(): void {
    this.openEvent.emit();
  }

  searchChanged(): void {
    this.searchService.updateSearchFilter(this.searchFilter);
  }

  get hintTextSearch(): string {
    const categoriesName = this.filter?.categories.map(
      (category) => category.name
    );
    return 'ค้นหา ชื่อ ' + categoriesName?.join(' ') || '';
  }
}
