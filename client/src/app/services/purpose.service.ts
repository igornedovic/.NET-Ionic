import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ItemCategory, Purpose } from '../new-transaction/transaction.model';

interface PurposeData {
  purposeId: number;
  name: string;
  itemCategory: ItemCategory;
}

@Injectable({
  providedIn: 'root'
})
export class PurposeService {
  apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getPurposes() {
    return this.http.get<PurposeData[]>(
      this.apiUrl + 'purpose'
    ).pipe(
      map(response => {
        const purposes: Purpose[] = [];

        response.forEach(p => {
          purposes.push(
            new Purpose(p.purposeId, p.name, p.itemCategory)
          );
        });

        return purposes;
      })
    );
  }
}
