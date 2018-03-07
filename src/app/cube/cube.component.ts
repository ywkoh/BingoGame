import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cube',
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

  arrBingo = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],

    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],

    [false, false, false, false, false],
    [false, false, false, false, false]
  ];

  arrScore = [
    /*{
      orgScore: 3,
      score: 3,
      arrLine: [0, 5, 10]
    },*/
  ];

  constructor() {}

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  ngOnInit() {
    const myArray = [];
    for (let i = 0; i < 25; i++) {
      myArray.push(i);
    }
    this.shuffle(myArray);
    for (let i = 0; i < myArray.length; i++) {
      const obj = {
        num : myArray[i],
        isSelected : false,
        idx : i
      };
      this.arrNumber.push(obj);
    }
    for (let i = 0; i < 25; i++) {
      let obj;
      let count = 0;
      const arrLine = [];
      for (let j = 0; j < this.arrLine.length; j++) {
        if (this.arrLine[j].indexOf(i) > -1) {
          count++;
          arrLine.push(j);
        }
      }
      obj = {
        count: count,
        score: count,
        arrLine: arrLine
      };
      this.arrScore.push(obj);
    }
    console.log(this.arrScore);
  }
  selectOne(item) {
    if (item.isSelected) {
      return;
    }
    this.arrSelectedChange.emit(item.num);
    this.arrNumber[item.idx].isSelected = true;
    // console.log(item.num, this.user, this.arrNumber);
  }

  calcScore() {
    for (let i = 0; i < this.arrScore.length; i++) {
      let count = 0;
      const obj = this.arrScore[i];
      for (let j = 0; j < obj.arrLine.length; j++) {
        for (let k = 0; k < 5; k++) {
          if (this.arrBingo[j][k]) {
            count++;
          }
        }
      }
      obj.score = obj.count + count;
    }
  }

  checkLine() {
    let bingoCount = 0;
    for (let i = 0; i < this.arrLine.length; i++) {
      let count = 0;
      for (let j = 0; j < 5; j++) {
        let isSelected = false;
        if (this.arrLine[i][j] != null) {
          isSelected = this.arrNumber[this.arrLine[i][j]].isSelected;
        }
        if (isSelected) {
          count++;
        }
        this.arrBingo[i][j] = isSelected;
      }
      if (count === 5) {
        bingoCount++;
      }
    }
    this.calcScore();
    // console.log('bingoCount ' + bingoCount);
    console.log(this.arrScore);
    // console.log(this.arrBingo);
    if (bingoCount >= 5) {
      alert('bingo! user ' + this.user);
      return true;
    }
    return false;
  }
}
