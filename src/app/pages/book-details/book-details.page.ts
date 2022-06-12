import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BookObject, BookService } from 'src/app/services/book.service';
import { WISHLIST_KEY, GlobalVariablesService } from 'src/app/services/global-variables.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  isWishlisted = false;
  book = null;
  isDataLoaded = false;
  errorOccured = false;
  bookId = -1;

  constructor(private route: ActivatedRoute, private bookService: BookService, private storageService: StorageService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.isWishlisted = this.router.getCurrentNavigation().extras.state.isWishlisted;
        this.bookId = this.router.getCurrentNavigation().extras.state.bookId;
      }
    });
   }
  
  ngOnInit() {
    this.loadBookDetails();
  }



  async loadBookDetails() {
    this.isDataLoaded = false;
    this.errorOccured = false;
    //subscribing to an observable with a list of books as the result
    this.bookService.getBookDetails(this.bookId).subscribe(res => {
      this.isDataLoaded = true;
      this.book = res;
      //convert the currency string to symbol based on enum names and values
      let price = GlobalVariablesService.convertCurrency(this.book.currencyCode) + this.book.price;
      
      //overwrite price value with new appended currency symbol
      this.book.priceLabel = price;
    }, async (err) => {
      this.isDataLoaded = true;
      this.errorOccured = true;
      console.log("error retrieving books: ", err);
    })
  }

  public toggleWishlistBook(){
    if(this.book != null){
      if(this.isWishlisted){
        this.storageService.removeItem(this.book.id);
      } else{
        this.storageService.addData(this.book.id);
      }
      this.isWishlisted = !this.isWishlisted;
    }
  }
}




