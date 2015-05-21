// an app scope variable to keep track of sprite dimensions
// this will be used for player, enemy, gems when checking
// for collision illusion

width = 0;

// successful crossing score keeping class
var Score = function() {
    this.score = 0;
}

Score.prototype.INCREMENT_VALUE = 10;

Score.prototype.add = function() {
    this.score = this.score + Score.prototype.INCREMENT_VALUE;
}

Score.prototype.getValue = function() {
    return this.score;
}


// heart score class
var Heart = function() {
    this.hearts = Heart.prototype.ALLOWED_HEARTS;
}

Heart.prototype.ALLOWED_HEARTS = 10;

Heart.prototype.remove = function() {
    this.hearts = this.hearts - 1;
}

Heart.prototype.getValue = function() {
    return this.hearts;
}

Heart.prototype.reset = function() {
    this.hearts = Heart.prototype.ALLOWED_HEARTS;
}


// gem score keeping class
var Gem = function() {
    this.emerald = 0;
    this.garnet = 0;
    this.sapphire = 0;
}

Gem.prototype.addEmerald = function() {
    this.emerald = this.emerald + 1;
}

Gem.prototype.getEmerald = function() {
    return this.emerald;
}

Gem.prototype.addGarnet = function() {
    this.garnet = this.garnet + 1;
}

Gem.prototype.getGarnet = function() {
    return this.garnet;
}

Gem.prototype.addSapphire = function() {
    this.sapphire = this.sapphire + 1;
}

Gem.prototype.getSapphire = function() {
    return this.sapphire;
}


// each gem get's its own class for extensibility
// of randomness in its location, frequency
// and what ever else higher levels might be fun with
// Emerald class
var Emerald = function(x, y) {
    this.emerald = 'images/Gem Green.png';
    this.x = x;
    this.y = y;
}

Emerald.prototype.visible = true;

Emerald.prototype.render = function() {
    // 40, 40 defines the size of the gem
    if (this.visible) {
        ctx.drawImage(Resources.get(this.emerald), this.x, this.y, 40, 40);
    }
}

Emerald.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

Emerald.prototype.disappear = function() {
    Emerald.prototype.visible = false;
}

// Garnet class
var Garnet = function(x, y) {
    this.garnet = 'images/Gem Orange.png';
    this.x = x;
    this.y = y;
}

Garnet.prototype.render = function() {
    // 40, 40 defines the size of the gem
    ctx.drawImage(Resources.get(this.garnet), this.x, this.y, 40, 40);
}

Garnet.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

// Sapphire class
var Sapphire = function(x, y) {
    this.sapphire = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
}

Sapphire.prototype.render = function() {
    // 40, 40 defines the size of the gem
    ctx.drawImage(Resources.get(this.sapphire), this.x, this.y, 40, 40);
}

Sapphire.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
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
    // keep the enemy in a loop
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

// update method for Player class
Player.prototype.update = function(keyCode) {

    if (allEnemies != null && allEnemies.length >0) {
        for (var i = 0; i < allEnemies.length; i++) {
            //console.log("checkCollision = " + this.checkCollision(allEnemies[i]));
            if (this.checkCollision(allEnemies[i])) {
                hearts.remove();
                //console.log("Num hearts left = " + hearts.getValue());
                //console.log("WE HAVE COLLISION! STOP THE GAME!!!");
                throw new CollisionException("collided!");
            }

        }
    }

    if (level1) {
        console.log("playing level1");
        if (this.checkCollision(emerald)) {
            gem.addEmerald();
            emerald.disappear();
        }
    }
    // y location on canvas where the player has successfully
    // crossed the bug territory to water! yay!
    if (this.y < 80) {
        score.add();
        player.reset();
        // console.log("successfully got to water : " + score.getValue());
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

// if collision is true, move the sprite to its original location
Player.prototype.reset = function() {
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
    if (e instanceof Enemy) {
        width = 25
        return !(getLeft(this.x, width) > getRight(e.x, width) || getRight(this.x, width) < getLeft(e.x, width)
              || getBottom(this.y, width) < getTop(e.y, width) || getBottom(e.y, width) < getTop(this.y, width));
    } else {
        width = 10;
        return !(getLeft(this.x, width) > getRight(e.x, width) || getRight(this.x, width) < getLeft(e.x, width)
              || getBottom(this.y, width) < getTop(e.y, width) || getBottom(e.y, width) < getTop(this.y, width));
    }
    console.log("width = " + width);

}


function getLeft(xVal, width) {
    return xVal - width;
}

function getTop(yVal, width) {
    return yVal - width;
}

function getRight(xVal, width) {
    return xVal + width;
}

function getBottom(yVal, width) {
    return yVal + width;
}

// an array to hold all enemies
var allEnemies = [];
// instantiate all enemies
var enemy1 = new Enemy(-50, 120, 10);
var enemy2 = new Enemy(-80, 170, 20);
var enemy3 = new Enemy(-90, 280, 25);
var enemy4 = new Enemy(-100, 310, 40);
var enemy5 = new Enemy(-30, 240, 40);
allEnemies.push(enemy1, enemy2, enemy3);

// instantiate the player
var player = new Player(200, 420);

// instantiate score counter
var score = new Score();

// instantiate gem counter
var gem = new Gem();

// instantiate heart counter
var hearts = new Heart();

// instantiate emerald object
var emerald = new Emerald(200, 250);

var allGarnets = [];
var garnet1 = new Garnet(300, 270);
var garnet2 = new Garnet(120, 400);
allGarnets.push(garnet1, garnet2);

var allSapphires = [];
var sapphire1 = new Sapphire(30, 220);
var sapphire2 = new Sapphire(120, 400);
var sapphire3 = new Sapphire(350, 350);
allSapphires.push(sapphire1, sapphire2, sapphire3);

var level1 = false;
var level2 = false;
var level3 = false;


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
