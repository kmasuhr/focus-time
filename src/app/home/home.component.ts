import {Component, OnInit} from '@angular/core';
import {TimeService} from "../common/time.service";
import {ConfigService} from "../common/config.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  DEFAULT = {
    message: "Conversations are not prohibited. Enjoy.",
    backgroundColor: "#8BC34A"
  };
  currentTime = null;

  message = "";
  backgroundColor = "";

  constructor(
    private _timeService: TimeService,
    private _configService: ConfigService
  ) {}

  ngOnInit() {
    this._timeService.getClock().subscribe(this.onTimeChange);
  }

  onTimeChange = value => {
    this.currentTime = value;
    this.updateFocusStatus();
  };

  updateFocusStatus() {
    const events = this._configService.eventList;

    for (const event of events) {
      if (this.currentTime.isBetween(event.start, event.end)) {
        this.message = event.message;
        this.backgroundColor = event.color;
        return;
      }
    }

    this.message = this.DEFAULT.message;
    this.backgroundColor = this.DEFAULT.backgroundColor;
  }
}
