import {Component, OnInit} from '@angular/core';
import {TimeService} from "../common/time.service";
import {ConfigService} from "../common/config.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTime = null;
  focusTime = false;

  constructor(private _timeService: TimeService,
              private _configService: ConfigService) {
  }


  ngOnInit() {
    this._timeService.getClock().subscribe(this.onTimeChange);
  }

  onTimeChange = (value) => {
    this.currentTime = value;
    this.updateFocusStatus();
  };

  updateFocusStatus() {
    const focusTimes = this._configService.focusTime;

    let focusTime = false;
    for (const time of focusTimes) {
      if (this.currentTime.isBetween(time.start, time.end)) {
        focusTime = true;
        break;
      }
    }

    this.focusTime = focusTime;
  }
}
