import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  categrory!: Category[];

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8181/category/list');
  }

}
