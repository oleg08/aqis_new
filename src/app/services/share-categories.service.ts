import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryStatus } from '../interfaces/category-status';

@Injectable({
  providedIn: 'root'
})
export class ShareCategoriesService {

  private categoriesSource = new BehaviorSubject<Array<object>>(null);
  currentCategories = this.categoriesSource.asObservable();

  constructor () {}

  changeCategories(categories: CategoryStatus[]) {
    this.categoriesSource.next(categories);
  }
}
