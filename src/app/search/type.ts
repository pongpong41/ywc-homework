export enum IsOpenType {
  NA = 'N/A',
  YES = 'Y',
  NO = 'N',
}

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Merchant {
  shopNameTH: string;
  categoryName: string;
  subcategoryName: string;
  coverImageId: string;
  facilities: string[];
  priceLevel: number;
  isOpen: string;
  highlightText: string; // TODO: markUp
  recommendedItems: string[];
  addressProvinceName: string;
  addressDistrictName: string;
}

export interface SearchFilter {
  category: Category | null;
  subcategory: string | null;
  province: string | null;
  priceRange: number | null;
}

export interface Filter {
  categories: Category[];
  provinces: string[];
  priceRange: string[]; // TODO: type
}

export interface ApiResult extends Filter {
  merchants: Merchant[];
}
