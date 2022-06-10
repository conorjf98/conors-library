import { Injectable } from '@angular/core';
import { BookObject } from './book.service';

@Injectable({
  providedIn: 'root'
})

export class GlobalVariablesService {
  static poundToEuroConversionRate: number = 1.18;
  static dollarToEuroConversionRate: number = 0.94;
  constructor() { }
  
  
  public static convertCurrency(curr: string): string{
    return Currency[curr];
  }

  public static convertToEuro(book: BookObject): number{
    let currency: Currency = Currency[book.currencyCode];
    let newPrice = book.price;
    console.log("Currency: ", currency);
    switch (currency) {
        case Currency.GBP:
          newPrice = book.price * this.poundToEuroConversionRate;
        break;
        case Currency.USD:
          newPrice = book.price * this.dollarToEuroConversionRate;
        break;
    
      default:
        break;
    }
    return newPrice;
  }
}

enum Currency {
  EUR = "€",
  GBP = '£',
  USD = '$',
}