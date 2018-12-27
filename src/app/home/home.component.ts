import {Component, HostListener, OnInit} from '@angular/core';
import {TimeService} from "../common/time.service";
import {ConfigService} from "../common/config.service";
import {interval} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  DEFAULT = {
    message: "Shittalks are not prohibited. Enjoy.",
    backgroundColor: "#8BC34A"
  };
  NERF_TIME_CONFIG = {
    message: "Nerf time!",
    colors: [
      '#f44336',
      '#E91E63',
      '#9C27B0',
      '#2196F3',
      '#009688',
      '#4CAF50',
      '#FF9800',
      '#FFC107',
    ]
  };

  currentTime = null;

  message = "";
  backgroundColor = "";
  secretCode = "";
  nerfTime = false;
  $nerfDisco;

  constructor(
    private _timeService: TimeService,
    private _configService: ConfigService) {
  }

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

    if (this.nerfTime) {
      this.message = this.NERF_TIME_CONFIG.message;
    } else {
      this.message = this.DEFAULT.message;
      this.backgroundColor = this.DEFAULT.backgroundColor;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.secretCode = '';
      this.nerfTime = false;
      if (this.$nerfDisco) {
        this.$nerfDisco.unsubscribe();
      }
    } else {
      this.secretCode += event.key;
    }

    if (this.secretCode.toLowerCase().includes('nerf')) {
      this.nerfTime = true;
      this.startDisco()
    }
  }

  private startDisco() {
    this.$nerfDisco = interval(150).pipe(
      map(x => x + 1),
      map((x) => {
        console.log(x % this.NERF_TIME_CONFIG.colors.length)
        this.backgroundColor = this.NERF_TIME_CONFIG.colors[x % this.NERF_TIME_CONFIG.colors.length];
      })).subscribe()
  }
}
