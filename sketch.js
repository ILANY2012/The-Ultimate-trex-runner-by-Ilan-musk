var trex,trexImg, trex_stop;
var ground,groundImg;
var ripoffGround;
var cloud,cloudImg
var c1,c2,c3,c4,c5,c6
var obs;
var gameOver, gameOverImg
var restart, restartImg
var score=0;
var obstacleGroup, cloudGroup;
var jumpSound,checkpointSound,dieSound;
var  gameState="play";

function preload(){
  trexImg=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_stop=loadAnimation("trex_collided.png")
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
  c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
  c5=loadImage("obstacle5.png")
  c6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  jumpSound= loadSound("jump.mp3");
  checkpointSound= loadSound("checkpoint.mp3");
  dieSound= loadSound("die.mp3");
}


function setup(){

  createCanvas(600,200);
  
  ground=createSprite(300,170);
  ground.addImage(groundImg);
  
  trex=createSprite(70,170);
  trex.addAnimation("trex_running",trexImg);
  trex.addAnimation("trex_collided", trex_stop)
  trex.scale=0.45;
  trex.debug=false;
  trex.setCollider("circle",0,0,47)
  
  ripoffGround=createSprite(200,175,400,3);
  ripoffGround.visible=false;

  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
 
  
  restart=createSprite(300,130);
  restart.addImage(restartImg);
  restart.scale=0.5;

  obstacleGroup= createGroup();
  cloudGroup= createGroup();

}
 
function draw(){
  background("gray");
  fill("black");   
  text("SCORE:"+score,500,50);

  if(gameState == "play"){
    
    score=score + Math.round(getFrameRate()/60)
    
    gameOver.visible=false;
    restart.visible=false;

    ground.velocityX=-(4+score/200)
    trex.changeAnimation("trex_running",trexImg);
    
    if(keyDown("space") && trex.y>140){
      trex.velocityY=-10;
       jumpSound.play();
    }

    trex.velocityY=trex.velocityY+0.5;
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }

    obstacleSpawnThingy();
    spawnTheCloudsYes();
    
    if(trex.isTouching(obstacleGroup)){
      gameState= "end"; 
      dieSound.play()
    }

    if(score % 100 == 0){
      checkpointSound.play();
    }
    
  }
  
  if(gameState == "end"){
   
    ground.velocityX=0
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible="true";
    restart.visible="true";
    trex.changeAnimation("trex_collided", trex_stop)
    trex.velocityY=0 
    
    if(mousePressedOver(restart)){
      reset();   
    }
  
  
  }
  
  trex.collide(ripoffGround); 
  
  drawSprites();
}

function spawnTheCloudsYes(){
  
  // % is called modulo in JS. it gives you the remainder of two numbers
  if(frameCount % 70 ==0){
    cloud=createSprite(600,50);
    cloud.addImage(cloudImg);
    cloud.velocityX=-(4+score/200); 
    cloud.y=random(20,100);     
    cloud.scale=random(0.4,0.7);
    trex.depth=cloud.depth+1;

    cloud.lifetime= 250;

    cloudGroup.add(cloud);
    
  }
}

function obstacleSpawnThingy(){
  if(frameCount%60==0){
    obs=createSprite(600,155);
    obstacleGroup.add(obs);

    var num=Math.round(random(1,6))
    switch(num){
      case 1: obs.addImage(c1) ;
      break; 
      case 4: obs.addImage(c2) ;
      break;
      case 3: obs.addImage(c3) ;
      break;
      case 6: obs.addImage(c4) ;
      break;
      case 5: obs.addImage(c5) ;
      break;
      case 2: obs.addImage(c6) ;
      break;
      
    }
    
    obs.velocityX=-(4+score/200);
    obs.scale=0.45;      
    obs.lifetime=140
  
  }
}  
function reset(){
  gameState="play"; 
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;
}
    





