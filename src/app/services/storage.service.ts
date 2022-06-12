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

  async addData(item) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(id) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    const index = storedData.map(e => e.id).indexOf(id);
    if (index) {
      storedData.splice(index, 1);
    }
    return this.storage.set(STORAGE_KEY, storedData);
  }

  public async removeAll(): Promise<void> {
    await this.storage.clear();
  }

  public async addWishlistedItems(books: BookObject[]) {
    let wishlist = await this.getData();
    if (books.length > 0 && wishlist != undefined) {
      console.log("we entered")
      wishlist.forEach(wishlistId => {
        console.log("Wishlist ID: ", wishlistId);
        books.find(x => x.id == wishlistId).isWishlisted = true;
      });
    }

    return books;
  }
}
