import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface BookObject {
  id: number;
  title: string;
  isbn: string;
  price: number;
  currencyCode: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<BookObject[]> {
    return this.http.get<BookObject[]>(`${environment.api_url}/books`);
  }

  getBookDetails(id: number){
    return this.http.get(`${environment.api_url}/book/${id}`);
  }
}
