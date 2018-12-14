import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  time = null;
  focusTime = false;

  ngOnInit() {
    setInterval(this.updateTime, 0.1);
  }

  updateTime = () => {
    this.time = new Date();
  }
}
