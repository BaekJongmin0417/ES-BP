
/* Make Drawing Book */
var c = [[0,0,0],[255,0,0],[255,255,0],[0,153,0],[6,17,242],[128,0,127]];

var back, title, canvas;
var flag, state = [], grids = [];
var bSlider, aSlider, radio, radio1;
var bText, aText, cText;
var dBtn, rBtn, yBtn, gBtn, bBtn, pBtn;
var clearBtn, emptyBtn, gridBtn;
var b1, b2, b3, b4, b5;
var x1,y1,x2,y2;

function setup(){
  /* Background 설정 */
  back = createDiv('').id('drawingBook');
  title = createElement('h3','Drawing Program').id('title').position(430, 13);

  /* default 설정 - Empty Canvas Mode, Color: black */
  flag = 0;
  state = c[0];

  /* Empty Canvas 생성 */
  canvas = createCanvas(576, 480).id('canvas').position(153, 50);
  background(255);
  makeCanvas();
}

/* 마우스 드래그 시 캔버스에 그림 그리는 함수 */
function mouseDragged(){
  /* Empty Canvas Mode */
  if(flag == 0){
    /* Drawing line */
    if(radio.value() == 1){
      stroke(state[0],state[1],state[2],aSlider.value());
      strokeWeight(bSlider.value());
      line(pmouseX,pmouseY,mouseX,mouseY);
    }
  }
  /* Grid Canvas Mode */
  else{
    for(var i = 0;i < grids.length;i++){
      grids[i].display();
    }
  }
}
function mousePressed(){
  x1=pmouseX; y1=pmouseY;
}
function mouseReleased(){
  x2=mouseX; y2=mouseY;
  if(flag == 0){
    /* No Fill */
    if(radio1.value() == 1){
      stroke(state[0],state[1],state[2],aSlider.value());
      strokeWeight(bSlider.value());
      noFill();
    }
    /* Fill */
    else if(radio1.value() == 2){
      noStroke();
      fill(state[0],state[1],state[2],aSlider.value());
    }

    /* Drawing Circle */
    if(radio.value() == 2){
      ellipse(x1+(x2-x1)/2,y1+(y2-y1)/2,x2-x1,y2-y1);
    }
    /* Drawing Rectangle */
    else if(radio.value() == 3){
      rect(x1,y1,x2-x1,y2-y1);
    }
  }
}

/* 캔버스 구성 요소 생성 */
function makeCanvas(){
  /* 캔버스 모드 선택하는 버튼 생성 - Empty Mode, Grid Mode */
  emptyBtn = createButton('Empty').addClass('btn cb mode1').position(610, 15);
  emptyBtn.mousePressed(function(){
    background(255);
    flag = 0;
    bText.show(); bSlider.show();
    radio.show(); 
    if(radio.value() != 1){
      radio1.show();
    }
  })
  gridBtn = createButton('Grid').addClass('btn cb mode2').position(680, 15);
  gridBtn.mousePressed(function(){
    makeGrid();
    bText.hide(); bSlider.hide();
    radio.hide(); radio1.hide();
  });

  /* Clear 버튼 생성 */
  clearBtn = createButton('Clear').addClass('btn cb').position(43, 485);
  clearBtn.mousePressed(function(){
    if(flag == 0){
      background(255);
    }
    else{
      makeGrid();
    }
  });

  makeBCBtn();
  makeRadio();
  makeSlider();
  makeSCBtn();
}

/* 선, 원, 직사각형 종류 및 fill 유무 선택하는 라디오 버튼 생성 */
function makeRadio(){
  radio = createRadio('type').addClass('radio').position(11,65);
  radio.option('Line','1').checked = "checked";
  radio.option('Circle','2');
  radio.option('Rect','3');

  radio1 = createRadio('type').addClass('radio').position(28,95);
  radio1.option('No Fill','1').checked = "checked";
  radio1.option('Fill','2');
  radio1.hide();

  radio.mouseClicked(function(){
    if(radio.value() == 1){
      radio1.hide();
    }else{
      radio1.show();
    }
  });

  radio1.mouseClicked(function(){
    if(radio1.value() == 1){
      bText.show();
      bSlider.show();
    }
    else{
      bText.hide();
      bSlider.hide();
    }
  });
}

/* Stroke Weight와 Color의 Alpha값 정하는 슬라이더 생성 */
function makeSlider(){
  bText = createP('Brush Size').id('text').position(43, 147);
  bSlider = createSlider(1,30,1).addClass('slider').position(25, 165);

  aText = createP('Alpha Value').id('text').position(37, 222);
  aSlider = createSlider(30,255,255).addClass('slider').position(25, 240);
}

/* Stroke Color 변경하는 버튼 생성 */
function makeSCBtn(){
  cText = createP('Colors').id('text').position(52, 300);

  dBtn = createButton('').addClass('btn db').position(40, 330);
  dBtn.mousePressed(function(){
    state = c[0];
  });

  rBtn = createButton('').addClass('btn rb').position(80, 330);
  rBtn.mousePressed(function(){
    state = c[1];
  });

  yBtn = createButton('').addClass('btn yb').position(40, 380);
  yBtn.mousePressed(function(){
    state = c[2];
  });

  gBtn = createButton('').addClass('btn gb').position(80, 380);
  gBtn.mousePressed(function(){
    state = c[3];
  });

  bBtn = createButton('').addClass('btn bb').position(40, 430);
  bBtn.mousePressed(function(){
    state = c[4];
  });

  pBtn = createButton('').addClass('btn pb').position(80, 430);
  pBtn.mousePressed(function(){
    state = c[5];
  });
}

/* Background Style 변경하는 버튼 생성 */
function makeBCBtn(){
  b1 = createButton('').addClass('btn btn- btn-1').position(18,17);
  b1.mousePressed(function(){
    back.style("background","linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)");
  });

  b2 = createButton('').addClass('btn btn- btn-2').position(50,17);
  b2.mousePressed(function(){
    back.style("background","linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)");
  });

  b3 = createButton('').addClass('btn btn- btn-3').position(82,17);
  b3.mousePressed(function(){
    back.style("background","linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%)");
  });

  b4 = createButton('').addClass('btn btn- btn-4').position(114,17);
  b4.mousePressed(function(){
    back.style("background","linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%)");
  });

}

/* Grid Mode Canvas 생성 */
function makeGrid(){
  background(255);
  strokeWeight(1);
  grids = [];
  flag = 1;

  var gap = 16;
  var w_end = width / gap;
  var h_end = height / gap;

  for(var i = 0;i < w_end;i++){
    for(var j = 0;j < h_end;j++){
      grids.push(new GridTile(i*gap, j*gap, gap, gap));
    }
  }

  for(i = 0;i < grids.length;i++){
    grids[i].display();
  }
}

/* Grid 생성 함수 */
function GridTile(x,y,gap){
  this.x = x;
  this.y = y;
  this.gap = gap;

  this.display = function(){
    stroke('lightgray');
    if(this.x < mouseX && mouseX < this.x + this.gap && this.y < mouseY && mouseY < this.y + this.gap){
      if(mouseIsPressed){
        fill(state[0],state[1],state[2],aSlider.value());
      }
    }else{
      noFill();
    }
    rect(this.x, this.y, this.gap, this.gap);
  }
}
