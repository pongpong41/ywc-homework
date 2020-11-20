import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/search.service';
import { Merchant } from '../type';
import { iconMap } from './icons';
@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
})
export class MerchantsComponent implements OnInit {
  @Input() merchant: Merchant;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  get recommendedText(): string {
    if (this.merchant.categoryName === 'ร้านอาหาร') {
      return 'เมนูแนะนำ';
    }
    return 'สินค้าแนะนำ';
  }

  getIconName(facility: string): string {
    return iconMap[facility] || 'help';
  }
}
