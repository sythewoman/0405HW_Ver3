/*
物件導向中的屬性
*/
// Concept = 增加類別中的method以動態修改
int csize=1;
Mover a,b,c,d,e,f;
void setup() {
   size(600, 600);
   noStroke();
colorMode(HSB, 100);
for (int i = 0; i < 100; i++) {
  for (int j = 0; j < 100; j++) {
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
void draw() {
  float colorB=map(mouseX,2,width,255,0) ;
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
class Mover {
   //貼上宣告內容
   float x;
   float y;
   float xspeed;
   float yspeed;
   PImage icon;
   // step 1 = 加入顏色屬性
   color mc = color(255,255,255);
   
   int trigger = 48; // 互動半徑
   int nsize = 36;
   
   float rval = random(-PI,PI); // 每物件設定亂數的衛星旋轉起始值
   
   //建構類別
   Mover(float x_, float y_, float xspeed_, float yspeed_, String ic) {
      x = x_;
      y = y_;
      xspeed=xspeed_;
      yspeed=yspeed_;      
      icon = loadImage(ic);      
   }
   // 規則一移動
   void rule1() {
      x=x+xspeed;
      y=y+yspeed;
   }
   // 規則二彈跳
   void rule2(){
      if ((x>width-nsize/2) || (x<nsize/2)){
         xspeed = -1 * xspeed;
      }
      if ((y>height-nsize/2) || (y<nsize/2)){
         yspeed = -1 * yspeed;
      }
   }
   // 規則三互動
   void rule3(){
     if (dist(mouseX,mouseY,x,y)<trigger/2){ // 距離在nsize範圍內
       nsize = 48; // 修改物件大小
     }else{
       nsize = 24;
     }
   }
   // 規則顯示
   // 一般顯示
   void ruleShow(){       
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
   void ruleSubShow(){
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
   void update() { 
    rule1();
    rule2();
    rule3();
    ruleShow();
   }
}
