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

game.add(ball);

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