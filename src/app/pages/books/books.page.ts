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
  sortOption = "title";
  isDataLoaded = false;
  errorOccured = false;
  term;
  constructor(private bookService: BookService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadBooks();
  }

  public async loadBooks() {
    this.errorOccured = false;
    this.isDataLoaded = false;
    //subscribing to an observable with a list of books as the result
    this.bookService.getAllBooks().subscribe(res => {
      this.isDataLoaded = true;
      
      this.books = res;
      this.books = this.sortBooksByTitle(this.books);
      this.books.forEach(book => {
        //convert the currency string to symbol based on enum names and values
        let price = GlobalVariablesService.convertCurrency(book.currencyCode) + book.price;

        //overwrite price value with new appended currency symbol
        book.priceLabel = price;

        //convert hidden prices to euro for future sorting
        let newPrice = GlobalVariablesService.convertToEuro(book);
        
        //overwrite price with converted to euro value
        book.price = newPrice;
      });
    }, async (err) => {
      this.isDataLoaded = true;
      this.errorOccured = true;
      console.log("error retrieving books: ", err);
    })
  }

  public sortBooks() {

    console.log("Sorting books..." + this.sortOption);
    switch (this.sortOption) {
      case "title":
        this.books = this.sortBooksByTitle(this.books);
        break;
      case "author":
        this.books = this.sortBooksByAuthor(this.books);
        break;
      case "priceAscending":
        this.books = this.sortBooksByPrice(this.books, true);
        break;
      case "priceDescending":
        this.books = this.sortBooksByPrice(this.books, false);
        break;
      default:
        break;
    }
  }

  public sortBooksByPrice(bookArray: BookObject[], isAscending: boolean): BookObject[] {

    var sortedArray = bookArray.sort((n1, n2) => {
      if (n1.price > n2.price) {

        return isAscending ? 1 : -1;
      }

      if (n1.price < n2.price) {
        return isAscending ? -1 : 1;
      }

      return 0;
    });
    return sortedArray;
  }

  public sortBooksByTitle(bookArray: BookObject[]): BookObject[] {
    var sortedArray = bookArray.sort((n1, n2) => {
      if (n1.title > n2.title) {

        return 1;
      }

      if (n1.title < n2.title) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

  public sortBooksByAuthor(bookArray: BookObject[]): BookObject[] {
    var sortedArray = bookArray.sort((n1, n2) => {
      if (n1.author > n2.author) {

        return 1;
      }

      if (n1.author < n2.author) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

}
