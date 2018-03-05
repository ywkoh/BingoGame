import { Component, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Output() updateCube = new EventEmitter();

  title = 'Bingo Game';
  arrSelected = [];

  arrSelectedChange(e) {
    if (this.arrSelected.indexOf(e) > -1) {
      return;
    }
    this.arrSelected.push(e);
    console.log('arrSelected ' + e);
    this.updateCube.emit(null);
  }
}
