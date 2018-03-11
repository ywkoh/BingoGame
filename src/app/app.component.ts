import { Component, Output, OnInit, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { CubeComponent } from './cube/cube.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  // 사용자 큐브 콤포넌트
  @ViewChild('userCube')  userCube: CubeComponent;
  // 컴퓨터 큐브 콤포넌트
  @ViewChild('comCube')  comCube: CubeComponent;

  title = 'Bingo Game';
  // 선택된 숫자 배열
  arrSelected = [];
  // 컴퓨터 계산 시간
  comTime = 1000;
  // game over
  gameOver = false;
  // win user
  winUser = "";
  
  // 5 * 5 Map
  arrMap = [
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
  
  // 9 * 9 Map
  /*
  arrMap = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77, 78, 79, 80],

    [0, 9, 18, 27, 36, 45, 54, 63, 72],
    [1, 10, 19, 28, 37, 46, 55, 64, 73],
    [2, 11, 20, 29, 38, 47, 56, 65, 74],
    [3, 12, 21, 30, 39, 48, 57, 66, 75],
    [4, 13, 22, 31, 40, 49, 58, 67, 76],
    [5, 14, 23, 32, 41, 50, 59, 68, 77],
    [6, 15, 24, 33, 42, 51, 60, 69, 78],
    [7, 16, 25, 34, 43, 52, 61, 70, 79],
    [8, 17, 26, 35, 44, 53, 62, 71, 80],

    [0, 10, 20, 30, 40, 50, 60, 70, 80],
    [8, 16, 24, 32, 40, 48, 56, 64, 72]
  ];*/

  ngOnInit() {
  }

  // 사용자가 선택했을때의 메서드
  userSelect(e) {
    let scope = this;
    let gameOver1 = false;
    let gameOver2 = false;

    if (this.arrSelected.indexOf(e) > -1) {
      return;
    }
    this.arrSelected.push(e.num);
    this.userCube.checkLine();
    const obj = this.userCube.checkBingo();
    gameOver1 = this.userCube.clickable = obj.boo;
    this.winUser += obj.user;

    this.comCube.checkLine();
    const obj2 = this.comCube.checkBingo();
    gameOver2 = obj2.boo;
    this.winUser += (this.winUser ? ', ' : '') + obj2.user;
    
    if(gameOver1 || gameOver2){
      this.gameOver = true;
    }else{
       // 빙고아니면 컴퓨터 차례 진행
      setTimeout(function(){
        scope.comSelect(scope.comCube.highScoreItem());
      }, this.comTime);
    }
    console.log(this.userCube.user + ' select');
  }
  
  // 컴퓨터가 선택했을 때의 메서드
  comSelect(e) {
    let gameOver1 = false;
    let gameOver2 = false;

    this.arrSelected.push(e.num);
    
    this.comCube.checkLine();
    const obj = this.comCube.checkBingo();
    gameOver1 = obj.boo;
    this.winUser += obj.user;

    this.userCube.checkLine();
    const obj2 = this.userCube.checkBingo();
    gameOver2 = obj2.boo;
    this.winUser += (this.winUser ? ', ' : '') + obj2.user;

    if(gameOver1 || gameOver2){
      this.gameOver = true;
    }else{
      this.userCube.clickable = true;
    }
    console.log(this.comCube.user + ' select');
  }
}
