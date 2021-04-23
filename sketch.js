
var x = 0
var y = 150
var speed = 8
var xBullet = x
var yBullet = y + 20
var xBullet2 = x
var yBullet2 = y + 20
var bulletIsMoving = false
var bullet2IsMoving = false
var xEnemy = 500
var yEnemy = 50
let enemy = [];
var n = 0 // Om te checken welke bullet klaar is om te schieten
var ammo = 2 // Hoeveelheid bullets klaar om te schieten
var score = 0 // De score
var hit1 = 0 // Om Bullet 1 te respawnen en stil te zetten als deze een enemy raakt
var hit2 = 0 // Om Bullet 2 te respawnen en stil te zetten als deze een enemy raakt
var yspeed = 2
var bombX = x
var bombY = y
let img;
let check;
//let bullet = [];

function preload() {
  img = loadImage("hood.jpg")
  check = loadImage("checkers.jpg")
}

function setup() {
  createCanvas(600,200);
  for (let i = 0; i < 15; i++) {
    enemy.push(new pipi());
  }
  /*for (let i = 0; i < 1; i++) {
    bullet.push(new ammo());
}*/
}

function draw() {
  background(img);
  for ( let i = 0; i < enemy.length; i++) {
    enemy[i].move();
    enemy[i].display();
  }
  /*for (let i = 0; i < bullet.length; i++) {
    bullet[i].move();
    bullet[i].display();
  }*/

  // A
  if (keyIsDown(65)) {
    if (x > 5) {
      x -= 2
      if (!bulletIsMoving) xBullet -= 2;
      if (!bullet2IsMoving) xBullet2 -= 2;
    }
  }
  // D
  else if (keyIsDown(68)) {
    x += 2
    if (!bulletIsMoving) xBullet += 2;
    if (!bullet2IsMoving) xBullet2 += 2;
  }

// W
  else if (keyIsDown(87)) {
    if (y > 10){ 
      y -= yspeed
      if (!bulletIsMoving) yBullet -= 2;
      if (!bullet2IsMoving) yBullet2 -= 2;
    }
  }

  else if (y < 150) {
      y += 2
      if (!bulletIsMoving) yBullet += 2;
      if (!bullet2IsMoving) yBullet2 += 2;
  }

  // bullets tekenen
  rect(xBullet, yBullet, 5, 5)
  rect(xBullet2, yBullet2, 5, 5)
  
  // finishlijn tekenen
  image(check, 420, 0, 30, 200);
  player();

  // ook vierkantjes?
  fill(255, 165, 100)
  fill(80, 80, 80)
  textSize(20)
  text(ammo, x + 5, y + 37)
  textSize(40)
  text(score, 50, 40)

}

function bomb() {
  fill(255, 50, 50)
  rect(bombX, bombY, 50, 50)

}

//enemy
class pipi{
  constructor() {
    this.x = random (600, 1300);
    this.y = random(20, 170);
    this.width = 30;
    this.height = 30;
    this.speed = 3;
  }

  move() {
    this.x -= this.speed;
  }

  display() {
      fill(0, 80, 0);
      rect(this.x, this.y, 30, 30);
      bezier(this.x, this.y, this.x - 10, this.y - 10, this.x -5, this.y-5)
      fill(180, 0, 0)
      rect(this.x + 5, this.y + 5, 10, 10)
      fill(0)
      rect(this.x + 7.5, this.y + 9, 3, 3)
      fill(160, 160, 160)
      rect(this.x, this.y + 20, 15, 5)
    if (this.x < x + 20 && this.x + 20 > x && this.y + 30 > y && this.y + 45 < y + 90){
    textSize(100);
    text('Game Over', 50, 100);
    textSize(30)
    text("Your score was: " + score, 50, 150)
    exit()
  }
  else if (xBullet > this.x && yBullet < this.y + 30 && yBullet > this.y) {
    this.x = random(1000,1300);
    this.y = random(15,170);
    score += 1;
    hit1 += 1;
    
 }
   else if (xBullet2 > this.x && yBullet2 < this.y + 30 && yBullet2 > this.y) {
    this.x = random(1000,1300);
    this.y = random(15,170);
    score += 1;
    hit2 += 1;
 }
  else if (this.x < 0) {
    this.x = random (1000, 1300);
    this.y = random(15, 170);
  }
  }
}



function bullet() {    

    xBullet += speed
    if (xBullet > 600) {
      xBullet = x
      yBullet = y + 20
      ammo += 1
      bulletIsMoving = false
    }  
    else if (hit1 == 1) {
      ammo += 1
      xBullet = x 
      yBullet = y + 20
      bulletIsMoving = false
      hit1 -= 1
    }
    else {
      setTimeout(bullet, 20)
    }
  
}

function bullet2() {


  xBullet2 += speed
  if (xBullet2 > 600) {
    xBullet2 = x
    yBullet2 = y + 20
    ammo += 1
    bullet2IsMoving = false
  } 
  else if (hit2 == 1) {
    ammo += 1
    xBullet2 = x
    yBullet2 = y + 20
    bullet2IsMoving = false
    hit2 -= 1
  }
  else {
    setTimeout(bullet2, 20)
  }
}

function player() {
  
  //boots
  fill(0, 0, 0)
  rect(x,y+30,20,20)

  //body
  fill(65,105,225)
  rect(x, y, 20, 40);
  
  //head
  fill(114, 74, 69)
  rect(x,y, 20,20)

  //cap and logo
  fill(65,105,225)
  rect(x,y, 20,7)
  fill(255,255,0)
  rect(x+12, y+1, 5,5)

  //eye
  fill(0,0,0)
  rect(x+14, y+11, 3,3)


  fill(60, 60, 60);


  gun();
  if (x > 430) {

    score += 30
    fill(255)
    textSize(100)
    text('WIN', 50, 100)
    textSize(30)
    text("Your score was: " + score, 50, 150)
    
    exit()
  }
}

function gun() {
  rect(x+20,y+26,6,8)
  rect(x+20, y+17, 15, 10);
}



function keyPressed() {
  if (keyCode === 32 && n == 0) {
    if (!bulletIsMoving){ 
    bullet();
    bulletIsMoving = true
    n += 1
    ammo -= 1
  }
  }
else if (keyCode === 32 && n == 1) {
  if (!bullet2IsMoving){ 
  bullet2();
  bullet2IsMoving = true
  n -= 1
  ammo -= 1
  }
}
}

//bulletIsMoving = true
 // xBullet += speed
  //if (xBullet > 600) {
   // xBullet = x + 40
   // yBullet = y + 13
   // bulletIsMoving = false
 // } 
 // else
 // if (xBullet > xEnemy && yBullet < yEnemy + 30 && yBullet > yEnemy) {
   // xBullet = x + 40
   // yBullet = y + 13
    //bulletIsMoving = false
 // }
 // else {
  //  setTimeout(bullet, 20)
 // }
//}