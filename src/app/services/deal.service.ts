import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  constructor(private _http: HttpClient) {}

  addDeal(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/deals', data);
  }

  updateDeal(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/deals/${id}`, data);
  }

  getDealList(): Observable<any> {
    return this._http.get('http://localhost:3000/deals');
  }

  deleteDeal(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/deals/${id}`);
  }
}
