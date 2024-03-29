import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BookObject } from './book.service';

const STORAGE_KEY = "storage-key";

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.create();
  }

  getData() {
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item: any) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(id: number) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    const filtered = storedData.filter(function(book) { return book != id; }); 
    console.log("Filtered List: ", filtered);
    
    return this.storage.set(STORAGE_KEY, filtered);
  }

  public async removeAll(): Promise<void> {
    await this.storage.clear();
  }

  public async addWishlistedItems(books: BookObject[]) {
    let wishlist = await this.getData();
    if (books.length > 0 && wishlist != undefined) {
      console.log("we entered")
      books.forEach(book => {
        book.isWishlisted = false;
      });
      wishlist.forEach(wishlistId => {
        console.log("Wishlist ID: ", wishlistId);
        books.find(x => x.id == wishlistId).isWishlisted = true;
      });
    }

    return books;
  }

  public async toggleIsWishlisted(isWishlisted: boolean, bookId: number) {
    if (isWishlisted) {
      this.removeItem(bookId);
    } else {
      this.addData(bookId);
    }
  }
}
