import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Bingo Game!";
  arrSelected = [];
  arrSelectedChange(e){
    if(this.arrSelected.indexOf(e) > -1)  return;
    this.arrSelected.push(e);
    console.log('arrSelected ' + e);
  }
}
