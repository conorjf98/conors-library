import { Injectable } from '@angular/core';
import { BookObject } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor() { }
  
  
  public static convertCurrency(curr: string): string{
    return Currency[curr];
  }
}

enum Currency {
  EUR = "€",
  GBP = '£',
  USD = '$',
}