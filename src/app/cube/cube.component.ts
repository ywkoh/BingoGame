import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {
  // 사용자 이름
  @Input() user = '';
  // 숫자를 보여줄지 여부
  @Input() showNum = false;
  // 라인별 빙고 자료
  @Input() arrMap = [];
  // 선택된 숫자 배열 - 부모
  @Input() arrSelected = [];

  // 사용자가 선택하는 이벤트
  @Output() userSelect: EventEmitter<Object> = new EventEmitter<Object>();
  
  // 섞인 번호 배열
  arrNumber = [];
  // 선택된 셀 배열
  arrBingo = [];
  // 셀의 실시간 점수 배열
  arrScore = [];
  // 빙고 카운트
  bingoCount = 0;
  // 한 줄 셀 갯수
  cellCount = 0;
  // click 가능여부
  clickable = true;

  constructor() {}
  
  // 배열 섞기
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  ngOnInit() {
    this.cellCount = this.arrMap[0].length;
    // 선택된 셀 배열 초기화
    for (let i = 0; i < this.arrMap.length; i++) {
      this.arrBingo[i] = [];
      for (let j = 0; j < this.cellCount; j++) {
        this.arrBingo[i].push(false);
      }
    }
    // 숫자 섞어서 배열만들기
    const myArray = [];
    for (let i = 0; i < this.cellCount * this.cellCount; i++) {
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
    // 점수 배열 만들기
    for (let i = 0; i < this.cellCount * this.cellCount; i++) {
      let obj;
      let count = 0;
      const arrLine = [];
      for (let j = 0; j < this.arrMap.length; j++) {
        if (this.arrMap[j].indexOf(i) > -1) {
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
  }

  // 사용자 셀 선택시 함수
  selectOne(item) {
    if (item.isSelected) {
      return;
    }
    this.userSelect.emit({num: item.num});
  }
  
  // 점수 합산하기
  calcScore() {
    for (let i = 0; i < this.arrScore.length; i++) {
      let count = 0;
      const obj = this.arrScore[i];
      for (let j = 0; j < obj.arrLine.length; j++) {
        for (let k = 0; k < this.cellCount; k++) {
          if (this.arrBingo[j][k]) {
            count++;
          }
        }
      }
      obj.score = obj.count + count;
    }
  }
  
  // 빙고된 라인 있는지 확인
  checkLine() {
    for (let i = 0; i < this.arrNumber.length; i++) {
      if(this.arrSelected.indexOf(this.arrNumber[i].num) > -1){
        this.arrNumber[i].isSelected = true;
      }
    }

    this.bingoCount = 0;
    for (let i = 0; i < this.arrMap.length; i++) {
      let count = 0;
      for (let j = 0; j < this.cellCount; j++) {
        let isSelected = false;
        if (this.arrMap[i][j] != null) {
          isSelected = this.arrNumber[this.arrMap[i][j]].isSelected;
        }
        if (isSelected) {
          count++;
        }
        this.arrBingo[i][j] = isSelected;
      }
      if (count === this.cellCount) {
        this.bingoCount++;
      }
    }
    this.calcScore();
  }

  // 게임 빙고 됬는지 확인
  checkBingo() {
    if (this.bingoCount >= this.cellCount) {
      console.log('bingo! ' + this.user);
      return {boo: true, user: this.user};
    }
    return {boo: false, user: ''};
  }
  
  // 점수 높은 셀찾기
  highScoreItem() {
    let item = {score:null, idx:-1, num:-1};
    for (let i = 0; i < this.arrNumber.length; i++) {
      if(!this.arrNumber[i].isSelected){
        if(!item.score){
          item = this.arrNumber[i];
          item.score = this.arrScore[i].score;
        }else{
          if(this.arrScore[i].score > item.score){
            item = this.arrNumber[i];
            item.score = this.arrScore[i].score;
          }
        }
      }
    }
    return item;
  }
}
