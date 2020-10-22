var ball;
var database, position;
function setup()
{
    database = firebase.database();

    createCanvas(500,500);
    
    ball = createSprite(20,20,10,10);
    ball.shapeColor = "red";

    var ballPos = database.ref('ball/position');
    ballPos.on("value",readPosition,showError);
}
function readPosition(data)
{
    position = data.val();
    console.log(position.x);

    ball.x = position.x;
    ball.y = position.y;
}
function showError()
{
    console.log("not connected")
}
function draw()
{
    background("white");
    if(keyDown(LEFT_ARROW))
    {
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW))
    {
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW))
    {
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW))
    {
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y)
{
    database.ref('ball/position').set(
        {
        x: position.x + x,
        y: position.y + y
        });
  
}
