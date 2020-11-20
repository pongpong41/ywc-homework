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
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    console.log('get search');
    this.searchService.updateSearch().subscribe();
  }

  openSideBar(): void {
    console.log('2');
    this.sidenav.open();
  }
}
