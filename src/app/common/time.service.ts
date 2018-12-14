import {Injectable} from '@angular/core';
import {Observable, interval} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private readonly clock: Observable<any>;

  constructor() {
    this.clock = interval(400).pipe(map(() => {
      return moment(new Date());
    }));
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
