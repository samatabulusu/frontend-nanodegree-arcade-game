var width = 25;

var Score = function(score) {
    this.score = score;
}

Score.prototype.add = function() {
    this.score = score + 10;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.original = [x, y];
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // the location of the enemy will depend on its current
    // location and the speed at which its supposed to go
    this.x = this.x + this.speed * dt;
    // if enemy moves out of bounds bring it back to the beginning!
    if (this.x > 505) {
        this.x = -100;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class - Samata
var Player = function(x, y) {
    // associate the image with the player
    this.sprite = "images/char-princess-girl.png";
    this.original = [x, y];
    this.x = x;
    this.y = y;
}

// update method for Player class - Samata
Player.prototype.update = function(keyCode) {
    // TODO
    // if we have collision
    // reset the player
    // reset the enemies
    // update the score

    //TODO if sprite reaches water successfully,
    // reset the game!
    if (allEnemies != null && allEnemies.length >0) {
        for (var i = 0; i < allEnemies.length; i++) {
            //console.log("checkCollision = " + this.checkCollision(allEnemies[i]));
            if (this.checkCollision(allEnemies[i])) {
                console.log("WE HAVE COLLISION! STOP THE GAME!!!");
                throw new CollisionException("collided!");
            }

        }
    }

    if (this.y < 80) {
        score.add();
        console.log("successfully got to water : " + score);
    }
}

// render method for Player class - Samata
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handleInput method for Player class - Samata
Player.prototype.handleInput = function(keyCode) {
    // move by 10 units
    // set left, right, up and down boundaries
    // so the player cannot move outside the box
    if (keyCode == 'left') {
        if (!((this.x - 10) < -10)) {
            this.x = this.x - 10;
        }
    } else if (keyCode == 'right') {
        if (!((this.x + 10) > 420)) {
            this.x = this.x + 10;
        }
    } else if (keyCode == 'up') {
        if (!((this.y - 10) < 0)){
            this.y = this.y - 10;
        }
    } else if (keyCode == 'down') {
        if (!((this.y + 10) > 430)) {
            this.y = this.y + 10;
        }
    }
}

// if collision is true, reset the game
Player.prototype.reset = function() {
    // check if there are more lives - TODO
    // update score and keep playing

    // if there are NO MORE lives
    // update score, display score with some positive message

    // move the sprite to its original location
    this.x = this.original[0];
    this.y = this.original[1];
}

function CollisionException(message) {
    this.message = message;
    this.name = "CollisionException";
}

Player.prototype.checkCollision = function(e) {
//    var val = (this.left > e.right) || (this.right < e.left)
//          || (this.bottom < e.top) || (e.bottom < this.top);
    return !(getLeft(this.x) > getRight(e.x) || getRight(this.x) < getLeft(e.x)
          || getBottom(this.y) < getTop(e.y) || getBottom(e.y) < getTop(this.y));
}


function getLeft(xVal) {
    return xVal - width;
}

function getTop(yVal) {
    return yVal - width;
}

function getRight(xVal) {
    return xVal + width;
}

function getBottom(yVal) {
    return yVal + width;
}

var allEnemies = [];
// instantiate all enemies
var enemy1 = new Enemy(-50, 120, 10);
var enemy2 = new Enemy(-80, 170, 20);
var enemy3 = new Enemy(-90, 280, 25);
var speedster = new Enemy(-100, 310, 40);
var enemy4 = new Enemy(-30, 240, 40);
allEnemies.push(enemy1, enemy2, enemy3, speedster, enemy4);

// instantiate the player
var player = new Player(200, 420);
var score = new Score(0);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
