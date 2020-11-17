import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Merchant } from '../type';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  merchants: Merchant[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getCurrentMerchants().subscribe((currentMerchants) => {
      this.merchants = currentMerchants;
    });
  }

}
