import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetRangeDateService {

  today: Date = new Date();

  constructor() { }

  daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  previousTwoWeeks() {
    const second_date: Date = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      (this.today.getDate() - this.today.getDay())
    );
    const first_date: Date = new Date(
      second_date.getFullYear(),
      second_date.getMonth(),
      (second_date.getDate() - 14)
    );
    return [first_date, second_date];
  }

  previousOneMonth() {
    const second_date: Date = new Date(
      this.today.getFullYear(),
      this.today.getMonth() - 1,
      this.daysInMonth(new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1))
    );
    const first_date: Date = new Date(
      this.today.getFullYear(),
      this.today.getMonth() - 1,
      1
    );
    return [first_date, second_date];
  }
}
