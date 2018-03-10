import { Component, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { CubeComponent } from './cube/cube.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  // 사용자 큐브 콤포넌트
  @ViewChild('userCube')  userCube: CubeComponent;
  // 컴퓨터 큐브 콤포넌트
  @ViewChild('comCube')  comCube: CubeComponent;

  title = 'Bingo Game';
  // 선택된 숫자 배열
  arrSelected = [];
  // 컴퓨터 계산 시간
  comTime = 1000;
  
  // 사용자가 선택했을때의 메서드
  userSelect(e) {
    let scope = this;
    if (this.arrSelected.indexOf(e) > -1) {
      return;
    }
    this.arrSelected.push(e.num);
    this.userCube.checkLine();
    this.userCube.checkBingo();
    this.comCube.checkLine();
    
    // 빙고이면 컴퓨터는 진행을 멈추고 아니면 컴퓨터 차례 진행
    if(!this.comCube.checkBingo()){
      setTimeout(function(){
        scope.comSelect(scope.comCube.highScoreItem());
      }, this.comTime);
    }
    console.log('user select');
  }
  
  // 컴퓨터가 선택했을 때의 메서드
  comSelect(e) {
    this.arrSelected.push(e.num);
    
    this.comCube.checkLine();
    this.comCube.checkBingo();
    this.userCube.checkLine();
    this.userCube.checkBingo();
    console.log('com select');
  }
}
