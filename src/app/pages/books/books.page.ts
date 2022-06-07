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

  async loadBooks(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();
    this.bookService.getAllBooks().subscribe(res => {
      loading.dismiss();
      this.books = res;
      console.log(res);
    })
  }

}
