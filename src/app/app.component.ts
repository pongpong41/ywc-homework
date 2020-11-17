import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ywc-homework';
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    console.log('get search');
    this.searchService.updateSearch().subscribe();
  }
}
