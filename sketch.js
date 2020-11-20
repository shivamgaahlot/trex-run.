
var trex, trexImage;
var cactusGroup, cactus1, cactus2, cactus3;
var sun, sunImage;
var ground, groundImage;
var restart, restartImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  
  trexImage = loadImage("trex.png");
  
  cactus1 = loadImage("cactus1.png");
  cactus2 = loadImage("cactus2.png");
  cactus3 = loadImage("cactus3.png");
  
  sunImage = loadImage("sun.png");
  
  groundImage = loadImage("ground.jpg");
  
  restartImage = loadImage("restart.png")

  
}

function setup(){

    createCanvas(windowWidth, windowHeight);
  
    trex = createSprite(50, height - 25, 20, 20);
    trex.addImage(trexImage);
    trex.scale = 0.03;
  
    sun = createSprite(width - 50, 50, 20, 20);
    sun.addImage(sunImage);
    sun.scale = 0.2;
  
    ground = createSprite(width/2, height + 150, width, 5);
    ground.addImage(groundImage);
    ground.scale = 10.5;

    restart = createSprite(width/2, 180, 20, 20);
    restart.addImage(restartImage);
    restart.scale = 0.05;
    restart.visible = false;
  
    cactusGroup = new Group();

}


function draw(){
  
    background("lightblue");
  
    trex.collide(ground);
  
    textSize(24);
    fill("red");
    text("Score : " + score, 100, 50);
  
    if(gameState === PLAY){
      if(keyDown("space") && trex.y >= height - 60 || touches.length > 0){
        trex.velocityY = -12;
        touches = [];
      }
      trex.velocityY = trex.velocityY + 0.8;
      
      ground.velocityX = -(5 + score/100);
    
      if(ground.x < 0){
        ground.x = width/2;
      }
      
      score = score + Math.round(getFrameRate()/60);
  
      spawnCactus();
      
      if(trex.isTouching(cactusGroup)){
        gameState = END;
      }
      
    } else if(gameState === END){
      ground.velocityX = 0;
      
      cactusGroup.setVelocityXEach(0);
      cactusGroup.setLifetimeEach(-1);
      
      restart.visible = true;
      
      textSize(50);
      fill("blue");
      text("GAME OVER!!", 350,400);
      text("press restart to play again", 310, 310);
     
      if(mousePressedOver(restart) || touches.length > 0){
        reset();
        touches = [];
      }
    }
  
    drawSprites();
  
}

function reset(){

  gameState = PLAY;

  restart.visible = false;
  
  score = 0;
  
  cactusGroup.destroyEach();
  
}

function spawnCactus(){

    if(World.frameCount % 60 === 0){
      var cactus = createSprite(width, height - 40, 20, 10);
      cactus.velocityX = -(5 + score/100);
      
      var rand = Math.round(random(1, 3));
      
      switch(rand){
        case 1 :
          cactus.addImage(cactus1);
          cactus.scale = 0.005;
          break;
          
        case 2 :
          cactus.addImage(cactus2);
          cactus.scale = 0.005;
          break;
          
        case 3 :
          cactus.addImage(cactus3);
          cactus.scale = 0.05;
          break;
          
        default :
          break;
      }
      cactus.lifetime = width/cactus.velocityX;
      cactusGroup.add(cactus);
    }

}