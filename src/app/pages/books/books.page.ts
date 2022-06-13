import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BookObject, BookService } from 'src/app/services/book.service';
import { WISHLIST_KEY, GlobalVariablesService } from 'src/app/services/global-variables.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})

export class BooksPage implements OnInit {

  allBooks: BookObject[] = [];
  wishlistedBooks: BookObject[] = [];
  books: BookObject[] = [];
  wishlist: number[] = [];
  sortOption: string = "title";
  isDataLoaded: boolean = false;
  errorOccured: boolean = false;
  isWishlistedToggled: boolean = false;
  term;
  constructor(private bookService: BookService,
    private storageService: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.loadBooks();
  }

  async ionViewWillEnter() {
    console.log("IonViewWillEnter - books page");
    this.storageService.addWishlistedItems(this.allBooks).then((res) => {
      console.log("In the then: ", res);
      this.allBooks = res;
      this.books = res;
      if (this.isWishlistedToggled) {
        console.log("Wishlisted is toggled on");
        this.toggleWishlistedBooks();
      }
      this.cdr.detectChanges();
    });


  }



  public async loadBooks() {
    this.errorOccured = false;
    this.isDataLoaded = false;
    //subscribing to an observable with a list of books as the result
    this.bookService.getAllBooks().subscribe(res => {
      this.isDataLoaded = true;

      this.books = res;
      this.allBooks = res;
      this.books = this.sortBooksByTitle(this.books);
      this.books.forEach(book => {
        //convert the currency string to symbol based on enum names and values
        let price: string = GlobalVariablesService.convertCurrency(book.currencyCode) + book.price;

        //overwrite price value with new appended currency symbol
        book.priceLabel = price;

        //convert hidden prices to euro for future sorting
        let newPrice: number = GlobalVariablesService.convertToEuro(book);

        //overwrite price with converted to euro value
        book.price = newPrice;

        book.isWishlisted = false;
        console.log("ID: ", book.id);
      });
      this.storageService.addWishlistedItems(this.books).then((res) => {
        console.log("In the then: ", res);
        this.books = res;
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

    let sortedArray: BookObject[] = bookArray.sort((n1, n2) => {
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
    let sortedArray: BookObject[] = bookArray.sort((n1, n2) => {
      if (n1.title.toLowerCase() > n2.title.toLowerCase()) {

        return 1;
      }

      if (n1.title.toLowerCase() < n2.title.toLowerCase()) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

  public sortBooksByAuthor(bookArray: BookObject[]): BookObject[] {
    let sortedArray: BookObject[] = bookArray.sort((n1, n2) => {
      if (n1.author.toLowerCase() > n2.author.toLowerCase()) {

        return 1;
      }

      if (n1.author.toLowerCase() < n2.author.toLowerCase()) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }


  public doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  public openBookDetailsPage(isWishlisted: boolean, id: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        isWishlisted: isWishlisted,
        bookId: id
      }
    };
    this.router.navigate([`books/:${id}`], navigationExtras);
  }

  public wishlistBook(event, bookId: number, isWishlisted: boolean) {
    
    //event.propagation is needed to cancel the parent button event 
    event.stopPropagation();
    this.storageService.toggleIsWishlisted(isWishlisted, bookId);
    this.books.find(x => x.id == bookId).isWishlisted = !isWishlisted;
  }

  public toggleWishlistedBooks() {
    this.wishlistedBooks = [];
    if (this.isWishlistedToggled) {
      this.allBooks.forEach(book => {
        if (book.isWishlisted == true) {
          this.wishlistedBooks.push(book);
        }
      });
      this.books = this.wishlistedBooks;
    } else {
      this.books = this.allBooks;
    }
    this.sortBooks();
    this.cdr.detectChanges();
  }
}
