//game.js

var game = new ex.Engine({
    width: 800,
    height: 600
});


var paddle = new ex.Actor(150, game.getHeight() - 40, 150, 20);

paddle.color = ex.Color.Azure;

paddle.collisionType = ex.CollisionType.Fixed;

game.add(paddle);

game.input.pointers.primary.on('move', function(evt){
    paddle.pos.x = evt.x;
});

var ball = new ex.Actor(100, 300, 20, 20);

ball.color = ex.Color.Red;

ball.vel.setTo(150, 150);

ball.collisionType = ex.CollisionType.Elastic;

ball.draw = function (ctx, delta) {
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

game.add(ball);

enum brickWall {
    margin = 20,
    xoffset = 65,
    yoffset = 20,
    columns = 5,
    rows = 4
}

var brickColors = [
    ex.Color.Vermillion,
    ex.Color.Violet, 
    ex.Color.Orange,
    ex.Color.Yellow
    ]

enum brickUnit {
    width = game.getWidth() / brickWall.columns - brickWall.margin - brickWall.margin / brickWall.columns,
    height =  30
}

var bricks = [];
for (var j = 0; j < brickWall.rows; j++){
    for (var i = 0; i < brickWall.columns; i++){
        bricks.push(new ex.Actor(
            brickWall.xoffset + i * (brickUnit.width + brickWall.margin) + brickWall.margin,
            brickWall.yoffset + j * (brickUnit.height + brickWall.margin) + brickWall.margin, 
            brickUnit.width,
            brickUnit.height,
            brickColors[j % brickColors.length])
        );
    }
}

bricks.forEach(function(brick){
    console.log(brick.x, brick.y, brick.color);
    brick.collisionType = ex.CollisionType.Fixed;
    game.add(brick);
});

ball.on('preupdate', function() {
    if (this.pos.x < (this.getWidth() / 2)){
        this.vel.x *= -1;
    }

    if (this.pos.x + (this.getWidth() / 2) > game.getWidth()){
        this.vel.x *= -1;
    }

    if (this.pos.y - (this.getHeight() / 2) < 0){
        this.vel.y *= -1;
    }
});

paddle.on('preupdate', function() {
    if (this.pos.x < (this.getWidth() / 2)){
        paddle.pos.x = this.getWidth() / 2;
    }
    if (this.pos.x + (this.getWidth() / 2) > game.getWidth()){
        paddle.pos.x = game.getWidth() - (this.getWidth() / 2);
    }
});


game.start();