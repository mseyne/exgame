//game.js
var game = new ex.Engine({
    width: 800,
    height: 600
});
var paddle = new ex.Actor(150, game.getHeight() - 40, 150, 20);
paddle.color = ex.Color.Azure;
paddle.collisionType = ex.CollisionType.Fixed;
game.add(paddle);
game.input.pointers.primary.on('move', function (evt) {
    paddle.pos.x = evt.x;
});
var ball = new ex.Actor(100, 300, 20, 20);
ball.color = ex.Color.Red;
ball.vel.setTo(150, 150);
ball.collisionType = ex.CollisionType.Elastic;
game.add(ball);
ball.on('update', function () {
});
game.start();
