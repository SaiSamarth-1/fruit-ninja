//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit1,fruit2,fruit3,fruit4;
var fruitGroup

var alienimage1;
var alienimage2;
var monsterGroup;

var gameOverImage, gameOver;

var knifeSwooshSound, gameOverSound;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alienimage1 = loadImage("alien1.png");
  alienimage2 = loadImage("alien2.png");
  gameOverImage = loadImage("gameover.png")
  
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3")
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
   gameOver=createSprite(300,300,20,20);
   gameOver.addImage(gameOverImage);
   gameOver.scale=2
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    gameOver.visible = false;
  
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score++;
     }
     else if(monsterGroup.isTouching(knife)){
           monsterGroup.destroyEach();
           gameOverSound.play();
           score = 0
           gameState = END;
         }
     fruit();
     monster();
      
  }
  else if(gameState === END){
    monsterGroup.setVelocityXEach=0;
    fruitGroup.setVelocityXEach = 0;
    fruitGroup.setLifetimeEach = -1;
    monsterGroup.setLifetimeEach = -1;
    gameOver.visible = true;
  }
  
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruit(){
  if(World.frameCount%80 == 0){
    var fruit = createSprite(400,200,20,20);
    fruit.scale=0.2
    r = Math.round(random(1,4));
    if(r ==1){
      fruit.addImage(fruit1);
    }
    else if(r == 2){
      fruit.addImage(fruit2);
    }
    else if(r == 3){
      fruit.addImage(fruit3);
    }
    else {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-(7+(score/4));
    fruit.setLiftime=100;
    fruitGroup.add(fruit);
    position = Math.round(random(1,2))
    position1 = Math.round(random(5,595))
    if(position == 1){
      fruit.x=position1;
    }
  }
}

function monster(){
  if(World.frameCount%120 == 0){
    var monster = createSprite(400,200,20,20);
    monster.scale=1
    r1 = Math.round(random(1,2));
    if(r1 ==1){
      monster.addImage(alienimage1);
    }
    else{
      monster.addImage(alienimage2);
    }
    monster.y=Math.round(random(50,340));
    monster.velocityX=-(8+(score/10));
    monster.setLiftime=100;
    monsterGroup.add(monster);
    position2 = Math.round(random(1,2))
    position3 = Math.round(random(5,595))
    if(position2 == 1){
      monster.x=position3;
    }
  }
}
