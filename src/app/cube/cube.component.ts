import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {
  
  @Input() user = '';
  @Input() arrSelected = [];
  @Output()
  arrSelectedChange: EventEmitter<number> = new EventEmitter<number>();

  arrNumber = [];
  arrLine = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  constructor() { }

  shuffle(a){
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  ngOnInit() {
    var myArray = [];
    for(let i = 1; i<=25; i++){
      myArray.push(i);
    }
    this.shuffle(myArray);
    for(let i = 0; i<myArray.length; i++){
      let obj = {
        num : myArray[i],
        isSelected : false,
        idx : i
      };
      this.arrNumber.push(obj);
    }
  }
  selectOne(item){
    if(item.isSelected)  return;
    console.log(item.num, this.user);
    this.arrSelectedChange.emit(item.num);
    this.arrNumber[item.idx].isSelected = true;
    console.log(item.num, this.user, this.arrNumber);
  }
  
  checkLine(){
    for(let i = 0; i<this.arrLine.length; i++){
      for(let j = 0; j<this.arrNumber.length; j++){
        //for(let k = 0;)
      }
    }
  }
}
