import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BookObject, BookService } from 'src/app/services/book.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private bookService: BookService, private loadingController: LoadingController) { }
  book = null;
  isDataLoaded = false;
  ngOnInit() {
    const id: number = +(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.loadBookDetails(id);
  }

  async loadBookDetails(id: number) {
    //subscribing to an observable with a list of books as the result
    this.bookService.getBookDetails(id).subscribe(res => {
      this.isDataLoaded = true;
      this.book = res;
      //convert the currency string to symbol based on enum names and values
      let price = GlobalVariablesService.convertCurrency(this.book.currencyCode) + this.book.price;
      
      //overwrite price value with new appended currency symbol
      this.book.price = price;
    })
  }
}




