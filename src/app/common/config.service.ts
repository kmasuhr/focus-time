import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  TIME_FORMAT = 'HH:mm';
  eventList = [
    {
      start: moment('10:00', this.TIME_FORMAT),
      end: moment('10:30', this.TIME_FORMAT),
      message: 'Retro',
      color: '#7b1fa2',
    },
    {
      start: moment('07:00', this.TIME_FORMAT),
      end: moment('09:00', this.TIME_FORMAT),
      message: 'Focus time!',
      color: '#F44336',
    },
    {
      start: moment('12:00', this.TIME_FORMAT),
      end: moment('15:00', this.TIME_FORMAT),
      message: 'Focus time!',
      color: '#F44336',
    },
    {
      start: moment('22:00', this.TIME_FORMAT),
      end: moment('24:00', this.TIME_FORMAT),
      message: 'Bed time!',
      color: '#283593',
    },
    {
      start: moment('00:00', this.TIME_FORMAT),
      end: moment('06:00', this.TIME_FORMAT),
      message: 'Bed time!',
      color: '#283593',
    },
  ];

  constructor() {
  }
}
