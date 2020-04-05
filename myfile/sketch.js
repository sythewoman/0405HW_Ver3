let firstPress=0;


function setup() {
	createCanvas(600,600);
   frameRate(36);
  // put setup code here
}

function draw() {
  mybrush();
	var cx = (mouseX, 0, width,0,255);
	var cy = (mouseY, 0, height,0,255);
	var nsize = width/8+cos(mouseY*PI/180)*width/16;
	fill(0,0,0,0);
stroke(mouseX,mouseY,mouseY-100);
  point(mouseY,mouseX,mouseX-100);
  triangle(mouseX,mouseY,mouseX-100,mouseY, mouseX/2,mouseY/2)

  
  function mybrush(){
  if (mouseIsPressed){
    circle(mouseX, mouseY, firstPress);
    firstPress=firstPress+1;
  // put drawing code here
}
}
  function mouseRelease(){
  firstPress=10;
}
}