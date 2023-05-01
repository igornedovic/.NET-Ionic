import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CategoryName, ItemCategory } from '../new-transaction/transaction.model';

interface ItemCategoryData {
  itemCategoryId: number;
  name: CategoryName;
}

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItemCategories() {
    return this.http.post<ItemCategoryData[]>(
      this.apiUrl + 'itemCategory', {}
    ).pipe(
      map(response => {
        const itemCategories: ItemCategory[] = [];

        response.forEach(ic => {
          itemCategories.push(
            new ItemCategory(ic.itemCategoryId, ic.name)
          );
        });

        return itemCategories;
      })
    );
  }
}
