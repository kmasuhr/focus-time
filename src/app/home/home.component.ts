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
    backgroundColor: "#E0E0E0"
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
  cssClass = "";

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
    const config = this.getCurrentConfig();

    if (this.nerfTime) {
      this.message = this.NERF_TIME_CONFIG.message;
    } else {
      this.message = config.message;
      this.backgroundColor = config.backgroundColor;
      this.cssClass = config.cssClass;
    }
  }

  getCurrentConfig() {
    const events = this._configService.getEventList();
    let config = {
      message: this.DEFAULT.message,
      backgroundColor: this.DEFAULT.backgroundColor,
      cssClass: 'home-default',
    };

    for (const event of events) {
      if (this.currentTime.isBetween(event.start, event.end)) {
        config.message = event.message;
        config.backgroundColor = event.color;
        config.cssClass = '';
      }
    }

    return config;
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

    if (this.secretCode.toLowerCase().includes('nerf') && !this.nerfTime) {
      this.nerfTime = true;
      this.startDisco()
    }
  }

  private startDisco() {
    this.$nerfDisco = interval(150).pipe(
      map(x => x + 1),
      map((x) => {
        this.backgroundColor = this.NERF_TIME_CONFIG.colors[x % this.NERF_TIME_CONFIG.colors.length];
      })).subscribe()
  }
}
