import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'ywc-homework';
  isLoading = false;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.searchService.updateSearch().subscribe(() => {
      this.isLoading = false;
    });
  }

  openSideBar(): void {
    this.sidenav.open();
  }

  mock(): void {
    this.searchService.setMockData();
  }
}
