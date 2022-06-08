import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BookObject, BookService } from 'src/app/services/book.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: any[] = [];
  isDataLoaded = false;
  term;
  constructor(private bookService: BookService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {

    //subscribing to an observable with a list of books as the result
    this.bookService.getAllBooks().subscribe(res => {
      this.isDataLoaded = true;
      this.books = res;
      this.books.forEach(book => {
         //convert the currency string to symbol based on enum names and values
      let price = GlobalVariablesService.convertCurrency(book.currencyCode) + book.price;
      
      //overwrite price value with new appended currency symbol
      book.price = price;
      });
    }, async (err) => {
      this.isDataLoaded = true;
      console.log("error retrieving books: ",err);
  })
  }

}
