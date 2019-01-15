import {Injectable} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";

export interface EventList {
  start: Moment | string
  end: Moment | string
  message: string
  cssClass: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  TIME_FORMAT = 'HH:mm';
  eventList: EventList[] = [
    {
      start: '10:00',
      end: '10:15',
      message: 'Standup!',
      cssClass: 'home-standup',
    },
    {
      start: '07:00',
      end: '09:00',
      message: 'Focus time!',
      cssClass: 'home-focus',
    },
    {
      start: '12:00',
      end: '15:00',
      message: 'Focus time!',
      cssClass: 'home-focus',
    },
    {
      start: '22:00',
      end: '24:00',
      message: 'Bed time!',
      cssClass: 'home-bed',
    },
    {
      start: '00:00',
      end: '06:00',
      message: 'Bed time!',
      cssClass: 'home-bed',
    },
  ];

  constructor() {
  }

  getEventList(): EventList[] {
    let newList = this.eventList.map(x => Object.assign({}, x));

    for (let event of newList) {
      event.start = moment(event.start, this.TIME_FORMAT);
      event.end = moment(event.end, this.TIME_FORMAT);
    }

    return newList
  }
}
