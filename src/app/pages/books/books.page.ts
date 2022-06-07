import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BookObject, BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  books: BookObject[] = [];
  constructor(private bookService: BookService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    //create a loading popup 
    const loadingPopup = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loadingPopup.present();

    //subscribing to an observable with a list of books as the result
    this.bookService.getAllBooks().subscribe(res => {
      loadingPopup.dismiss();
      this.books = res;
    })
  }

}
