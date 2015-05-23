// an app scope variable to keep track of sprite dimensions
// this will be used for player, enemy, gems when checking
// for collision illusion

var Level = function(level) {
    this.level = level;
}

Level.prototype.getLevel = function() {
    return this.level;
}

Level.prototype.setLevel = function(level) {
    this.level = level;
}

Level.prototype.isLevel = function(level) {
    if (this.level == level) {
        return true;
    }
    return false;
}

// resets the game level to level1
Level.prototype.reset = function() {
    this.level = "level1";
}

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

Score.prototype.reset = function() {
    this.score = 0;
    level1 = true;
    level2 = false;
    level3 = false;
    gameOver = false;
}


// heart score class
var Heart = function() {
    this.hearts = Heart.prototype.ALLOWED_HEARTS;
}

Heart.prototype.ALLOWED_HEARTS = 1;

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
var GemScore = function() {
    this.emerald = 0;
    this.garnet = 0;
    this.sapphire = 0;
}

GemScore.prototype.addEmerald = function() {
    this.emerald = this.emerald + 1;
}

GemScore.prototype.getEmerald = function() {
    return this.emerald;
}

GemScore.prototype.addGarnet = function() {
    this.garnet = this.garnet + 1;
}

GemScore.prototype.getGarnet = function() {
    return this.garnet;
}

GemScore.prototype.addSapphire = function() {
    this.sapphire = this.sapphire + 1;
}

GemScore.prototype.getSapphire = function() {
    return this.sapphire;
}

GemScore.prototype.reset = function() {
    this.emerald = 0;
    this.garnet = 0;
    this.sapphire = 0;
}


// parent class for all gem classes - Emerald, Garnet and Sapphire
// implemented as a good showcase for inheritance and encapsulation
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
}

Gem.prototype.WIDTH = 80;
Gem.prototype.HEIGHT = 80

// each gem get's its own class for extensibility
// of randomness in its location, frequency
// and what ever else higher levels might be fun with
// Emerald class
var Emerald = function(x, y) {
    this.emerald = 'images/Gem Green.png';
    this.x = x;
    this.y = y;
}

Emerald.prototype = Object.create(Gem.prototype)
Emerald.prototype.constructor = Emerald;

Emerald.prototype.render = function() {
    // 40, 40 defines the size of the gem
    ctx.drawImage(Resources.get(this.emerald), this.x, this.y, this.WIDTH, this.HEIGHT);
}

Emerald.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

Emerald.prototype.disappear = function() {
    this.x = -1000;
    this.y = -1000;
}

// Garnet class
var Garnet = function(x, y) {
    this.garnet = 'images/Gem Orange.png';
    this.x = x;
    this.y = y;
}

Garnet.prototype = Object.create(Gem.prototype);
Garnet.prototype.constructor = Garnet;

Garnet.prototype.render = function() {
    // 40, 40 defines the size of the gem
    ctx.drawImage(Resources.get(this.garnet), this.x, this.y, this.WIDTH, this.HEIGHT);
}

Garnet.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

Garnet.prototype.disappear = function() {
    this.x = -1000;
    this.y = -1000;
}

// Sapphire class
var Sapphire = function(x, y) {
    this.sapphire = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
}

Sapphire.prototype = Object.create(Gem.prototype);
Sapphire.prototype.constructor = Sapphire;

Sapphire.prototype.render = function() {
    // 40, 40 defines the size of the gem
    ctx.drawImage(Resources.get(this.sapphire), this.x, this.y, this.WIDTH, this.HEIGHT);
}

Sapphire.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
}

Sapphire.prototype.disappear = function() {
    this.x = -1000;
    this.y = -1000;
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
// best collision width for gem
Player.prototype.GEM_COLLISION_WIDTH = 20;
// best collision width for player and bug
Player.prototype.COLLISION_WIDTH = 20;

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
        for (var i = 0; i < allEmeralds.length; i++) {
            if (this.checkGemCollision(allEmeralds[i])) {
                gemScore.addEmerald();
                allEmeralds[i].disappear();
                throw new GemException("emerald collected")
            }
        }
    }

    if (level2) {
        for (var i = 0; i < allGarnets.length; i++) {
            if (this.checkGemCollision(allGarnets[i])) {
                gemScore.addGarnet();
                allGarnets[i].disappear();
                throw new GemException("garnet collected")
            }
        }
    }

    if (level3) {
        for (var i = 0; i < allSapphires.length; i++) {
            if (this.checkGemCollision(allSapphires[i])) {
                gemScore.addSapphire();
                allSapphires[i].disappear();
                throw new GemException("sapphire collected")
            }
        }
    }


    // y location on canvas where the player has successfully
    // crossed the bug territory to water! yay!
    if (this.y < 80) {
        score.add();
        if (this.hasGem()) {
            if ()
        }
        player.reset();
        // console.log("successfully got to water : " + score.getValue());
    }
}

Player.prototype.setGemCollected = function(value) {
    this.hasGem = value;
}

Player.prototype.hasGem = function() {
    if (this.hasGem) {
        return true;
    }
    return false;
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

// check if the player collided with any of the enemy bugs
Player.prototype.checkCollision = function(e) {
//    var val = (this.left > e.right) || (this.right < e.left)
//          || (this.bottom < e.top) || (e.bottom < this.top);
    var val = !(getLeft(this.x, this.COLLISION_WIDTH) > getRight(e.x, this.COLLISION_WIDTH)
                || getRight(this.x, this.COLLISION_WIDTH) < getLeft(e.x, this.COLLISION_WIDTH)
                || getBottom(this.y, this.COLLISION_WIDTH) < getTop(e.y, this.COLLISION_WIDTH)
                || getBottom(e.y, this.COLLISION_WIDTH) < getTop(this.y, this.COLLISION_WIDTH));
    return val;
}

// check if the player picked up any of the gems
Player.prototype.checkGemCollision = function(gem) {
    var val = !(getLeft(this.x, this.COLLISION_WIDTH) > getRight(gem.x , this.GEM_COLLISION_WIDTH)
                || getRight(this.x, this.COLLISION_WIDTH) < getLeft(gem.x, this.GEM_COLLISION_WIDTH)
                || getBottom(this.y, this.COLLISION_WIDTH) < getTop(gem.y, this.GEM_COLLISION_WIDTH)
                || getBottom(gem.y, this.GEM_COLLISION_WIDTH) < getTop(this.y, this.COLLISION_WIDTH));
    if (val) {
        this.setGemCollected = true;
    }
    return val;
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

// the CollisionException class
function CollisionException(message) {
    this.message = message;
    this.name = "CollisionException";
}

CollisionException.prototype = Object.create(Error.prototype);
CollisionException.prototype.constructor = CollisionException;


// the GemException class
function GemException(message) {
    this.name = "GemException";
    this.message = message;
}

GemException.prototype = Object.create(Error.prototype);
GemException.prototype.constructor = GemException;


// an array to hold all enemies
var allEnemies = [];
// instantiate all enemies
var enemy1 = new Enemy(-50, 120, 10);
var enemy2 = new Enemy(-80, 170, 20);
var enemy3 = new Enemy(-90, 280, 25);
var enemy4 = new Enemy(-100, 310, 40);
var enemy5 = new Enemy(-30, 240, 40);
allEnemies.push(enemy1, enemy2);

// instantiate the player
var player = new Player(200, 420);

// instantiate score counter
var score = new Score();

// instantiate gem counter
var gemScore = new GemScore();

// instantiate heart counter
var hearts = new Heart();

var allEmeralds = [];
// instantiate emerald object
var emerald = new Emerald(250, 250);
allEmeralds.push(emerald);

var allGarnets = [];
var garnet1 = new Garnet(300, 270);
var garnet2 = new Garnet(120, 400);
allGarnets.push(garnet1, garnet2);

var allSapphires = [];
var sapphire1 = new Sapphire(30, 220);
var sapphire2 = new Sapphire(120, 400);
var sapphire3 = new Sapphire(350, 350);
allSapphires.push(sapphire1, sapphire2, sapphire3);

var level = new Level("level1");


var level1 = true;
var level2 = false;
var level3 = false;
var gameOver = false;


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
