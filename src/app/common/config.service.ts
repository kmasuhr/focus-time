import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  TIME_FORMAT = 'HH:mm';
  focusTime = [
    {start: moment('10:00', this.TIME_FORMAT), end: moment('12:00', this.TIME_FORMAT)},
    // {start: moment('20:00', this.TIME_FORMAT), end: moment('22:00', this.TIME_FORMAT)},
  ];

  constructor() {
  }
}
