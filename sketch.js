var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var gameState;
var bullets;

var life = 3;
var score = 0;

gameState = "fight";
bullets = 70;

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  loseSound = loadSound("assets/lose.mp3")
  winSound = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.visible = false
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletsGroup = new Group();
}

function draw() {
  background(0);
  
  if(gameState === "fight"){
    if(life === 3){
      heart3.visible = true;
      heart1.visible = false
      heart2.visible = false
    }
    if(life === 2){
      heart3.visible = false;
      heart1.visible = false
      heart2.visible = true
    }
    if(life === 1){
      heart3.visible = false;
      heart1.visible = true
      heart2.visible = false
    }
    if(life === 0){
      gameState = "lost";
      loseSound.play();

    }
    if(score === 100){
      gameState = "won";
      winSound.play();
    }
    //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
        player.y = player.y-30
      }
      if(keyDown("DOWN_ARROW")||touches.length>0){
        player.y = player.y+30
      }
//release bullets and change the image of shooter to shooting position when space is pressed

      if(keyWentDown("space")){
        bullet = createSprite(displayWidth - 1150, player.y - 30, 20, 10);
        bullet.velocityX = 20;
        bulletsGroup.add(bullet);
      
        player.depth = bullet.depth;
        player.depth = player.depth + 2;
      
      
        player.addImage(shooter_shooting)
        bullets = bullets - 1;
       
      }
      //player goes back to original standing image once we stop pressing the space bar

      else if(keyWentUp("space")){
        player.addImage(shooterImg)
      }

      if(bullets === 0){
        gameState = "bullet";
        loseSound.play();
      }

      if(zombieGroup.isTouching(bulletsGroup)){
        for(var i = 0; i < zombieGroup.length; i++){
          if(zombieGroup[i].isTouching(bulletsGroup)){
            zombieGroup[i].destroy();
            bulletsGroup.destroyEach();
            explosionSound.play();

            score = score + 2;
          }
        }
      }
      if(zombieGroup.isTouching(player)){

        loseSound.play();
 

        for(var i=0;i<zombieGroup.length;i++){     
             
         if(zombieGroup[i].isTouching(player)){
              zombieGroup[i].destroy()
              } 
        }
       }
       //calling the function to spawn zombies
       enemy();
  }


 











drawSprites();
textSize(50);
fill("White");
text("Bullets:" + bullets, displayWidth-280, displayHeight/2 - 250);
text("Score:" + score, displayWidth-280, displayHeight/2 - 200);
text("Life:" + life, displayWidth-280, displayHeight/2 - 150);
if(gameState == "lost"){

  textSize(100);
  fill("red");
  text("You Lost the Game", 400, 400);
  player.destroy();

  zombieGroup.destroyEach();

} 
else if(gameState == "won"){
  textSize(100);
  fill("red");
  text("You Won the Game", 400, 400);
  player.destroy();

  zombieGroup.destroyEach();
}
else if(gameState == "bullet"){
  textSize(100);
  fill("blue");
  text("You Ran out of Bullets", 400, 400);
  player.destroy();
  
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
}


}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
