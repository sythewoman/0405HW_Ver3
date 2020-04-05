let csize=1;
let movers=[a,b,c,d,e,f];
  
  
function setup() {
   createCanvas(600, 600);
   noStroke();
colorMode(HSB, 100);
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {
    stroke(i, j, 100);
    point(i, j);
  }
}
   a = new Mover(300,250,-5,5, "mouth.png");
   b = new Mover(500,50,2,-3, "PacMan.png");
   c = new Mover(400,200,3,2, "mouth.png");
   d = new Mover(250,320,-2,2, "Pacman2.png");
   e = new Mover(150,430,4,-2, "Pacman3.png");
   
   // step 3 = 修改屬性
   a.mc=color(150,0,0);
}
function draw() {
  var colorB=map(mouseX,2,width,255,0) ;
  background(mouseX,colorB,mouseY);
   a.update();
   b.update();
   c.update();
   d.update();
   e.update();
   
   // step 4 = 動態修改屬性
   b.mc=color(0,0,150+cos(map(frameCount%70,0,70,-PI,PI))*100);
   a.mc=color(0,150+sin(map(frameCount%140,0,140,-PI,PI))*100,0);
}
//OOP類別的概念
cnv.class ('mover'); 
   var x;
   var y;
   var xspeed;
   var yspeed;
   PImage getIcon;
   // step 1 = 加入顏色屬性
   var c = color(mouseX,mouseY,mouseX);
   
   var trigger = 48; // 互動半徑
  var nsize = 36;
   
   var rval = random(-PI,PI); // 每物件設定亂數的衛星旋轉起始值
   
   //建構類別
  Mover (x_,  y_,  xspeed_,  yspeed_, String icon) {
      x = x_;
      y = y_;
      xspeed=xspeed_;
      yspeed=yspeed_;      
      icon = loadImage(ic);      
   }
   // 規則一移動
   function rule1() {
      x=x+xspeed;
      y=y+yspeed;
   }
   // 規則二彈跳
   function rule2(){
      if ((x>width-nsize/2) || (x<nsize/2)){
         xspeed = -1 * xspeed;
      }
      if ((y>height-nsize/2) || (y<nsize/2)){
         yspeed = -1 * yspeed;
      }
   }
   // 規則三互動
   function rule3(){
     if (dist(mouseX,mouseY,x,y)<trigger/2){ // 距離在nsize範圍內
       nsize = 48; // 修改物件大小
     }else{
       nsize = 24;
     }
   }
   // 規則顯示
   // 一般顯示
   function ruleShow(){       
      pushMatrix();
        translate(x, y);
        rotate(atan2(yspeed,xspeed));       
        imageMode(CENTER);
        tint(mc);
        image(icon, 0, 0, nsize,nsize);
      popMatrix();
      ruleSubShow();
   }  
   // 衛星顯示
   function ruleSubShow(){
      pushMatrix();
        translate(x, y);
        rotate(rval+radians(frameCount));  // 旋轉       
        imageMode(CENTER);
        tint(mc);
        arc(100, 25, 40, 40, 0, PI+QUARTER_PI, nsize/2);
        circle(nsize*2, 0, nsize/2); // 注意起始點位置
      popMatrix();
   }
   // 顯示內容
   function update() { 
    rule1();
    rule2();
    rule3();
    ruleShow();
   }