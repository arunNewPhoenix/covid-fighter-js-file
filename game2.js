function load_imgs()
{
    //player,gem,virus
    enemy_img=new Image;
    enemy_img.src="assets/v1.png";
    
    player_img=new Image;
    player_img.src="assets/superhero.png";
    
    
    gem_img=new Image;
    gem_img.src="assets/gem.png";
}
function init()
{
    //define the objects that is in game
    canvas=document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    canvas.height=H;
    canvas.width=W;
    //create a context
    pen=canvas.getContext("2d");
    console.log(pen);
    
    game_over=false;
    
    e1={
        
    x:150,
    y:50,
    w:60,
    h:60,
    speed:20    
        
    };
   
   e2={
       x:300,
       y:150,
       w:60,
       h:60,
       speed:30       
   };
    
    e3=
    {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
    };
        
        enemy=[e1,e2,e3];
    
    
    
    player={
        
        x:20,
        y:H/2,
        h:60,
        w:60,
        speed:20,
        move:false,
        health:100,
        
    };
    
    gem={
        x:W-100,
        y:H/2,
        h:60,
        w:60,
    };
    
    //add event listeners
    
    canvas.addEventListener("mousedown",function()
                           {
                            console.log("mouse pressed");
        
        player.moving=true;
                            });
    
    
    canvas.addEventListener("mouseup",function()
                           {
        
        console.log("mouse released");
        player.moving=false;
    });
    
    
    
}





function isoverlap(rect1,rect2)
{
     
        if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    // collision detected!
            return true;
}
    return false;
                                    //mod(x1-x2)<W  then collision detected here:x1 cordinate is of x1 one box and x2 of the other
                                            //mod(y1-y2)<H  then collision detected here:y1 cordinate is of y1 one box and y2 of the other
    
    
    
    
}

function draw()
{
     //clear the old box
    pen.clearRect(0,0,W,H);                             //step 1:clear the old frame
    pen.fillStyle="red";                                //step 2:set the old frame 
                                                                                                         // pen.drawImage(enemy_img,box.x,box.y,box.w,box.h);
   
    
    
    //draw the player
    
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    
    
    
    //draw the gem
    
    
    
    for(let i=0;i<enemy.length;i++)
        {
            pen.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        }
    
    
    
     pen.fillStyle="white";
    pen.fillText("score::"+player.health,10,10);
    
    
    
}
function update()
{  
    //move the box downward for single box
   // box.y +=box.speed;
    
  //  if(box.y>H-box.h||box.y<0)
      //  {
           // box.speed *= -1;
      //  }
    
    for(let i=0;i<enemy.length;i++)
        {
            if(isoverlap(enemy[i],player))
                {
                    player.health -=20;
                  if(player.health<0)
                      {
                           game_over=true;
                          console.log(player.health);
                          alert("game over.!"+(player.health));
                         
                      }
                }
        }
    
   
    
    //if the player is moving
    if(player.moving==true)
        {
            player.x +=player.speed;
            player.health +=20;
        }
    
    
     //overlap overlap
    if(isoverlap(player,gem))
        {
            console.log("you won the game.!");
            alert("you the won the game..!");
            game_over=true;
            return;
        }
    
    
    for(let i=0;i<enemy.length;i++)
        {
            enemy[i].y +=enemy[i].speed;
            if(enemy[i].y>H-enemy[i].h||enemy[i].y<0)
                {
                    enemy[i].speed *=-1;
                }
        }
    
    
    
}
function gameloop()
{
    if(game_over==true)
        {
            clearInterval(f);
        }
    draw();
    update();
    console.log("this is the gameloop");
    
}

load_imgs();
init();
var f= setInterval(gameloop,100);
