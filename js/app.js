
/* app.js
 * This file defines game levels, gems to be won, game score
 * enemies and player objects. It also initiates these objects
 * and provides the business rules as the layer under Engine.js.
 *
 * Frontend Web Developer Nanodegee, Udacity
 * Project 3
 * @date May 23rd, 2015
 * @author Samata Bulusu
*/

/* Level class to track the game level for the player
 * three levels are allowed in this version
 * - level1, level2, level3
 * Parameter level: level the game is played at
*/
var Level = function(level) {
    this.level = level;
};
// font colors used for display on canvas
Level.prototype.GAME_LEVEL_FONT_COLOR = "#000";
Level.prototype.PLAY_AGAIN_FONT_COLOR = "#654422";
Level.prototype.GAME_OVER_FONT_COLOR = "#e62e00";
Level.prototype.YOU_WIN_FONT_COLOR = "#e62e00";

Level.prototype.getLevel = function() {
    return this.level;
};

Level.prototype.setLevel = function(level) {
    this.level = level;
};

Level.prototype.isLevel = function(level) {
    if (this.level == level) {
        return true;
    }
    return false;
};

// resets the game level to level1
Level.prototype.reset = function() {
    this.level = "level1";
};


// Score class to keep track of score
var Score = function() {
    this.score = 0;
};

Score.prototype.INCREMENT_VALUE = 10;

Score.prototype.add = function() {
    this.score = this.score + Score.prototype.INCREMENT_VALUE;
};

Score.prototype.getValue = function() {
    return this.score;
};

Score.prototype.reset = function() {
    this.score = 0;
    level1 = true;
    level2 = false;
    level3 = false;
    gameOver = false;
};


// Heart class to keep track of lives
var Heart = function() {
    this.hearts = Heart.prototype.ALLOWED_HEARTS;
};

Heart.prototype.ALLOWED_HEARTS = 5;

Heart.prototype.remove = function() {
    this.hearts = this.hearts - 1;
};

Heart.prototype.getValue = function() {
    return this.hearts;
};

Heart.prototype.setZero = function() {
    this.hearts = 0;
};

Heart.prototype.reset = function() {
    this.hearts = Heart.prototype.ALLOWED_HEARTS;
};

// Gem Score class to keep score of each of the
// gems - emeralds, garnets, sapphires
var GemScore = function() {
    this.emerald = 0;
    this.garnet = 0;
    this.sapphire = 0;
};

GemScore.prototype.addEmerald = function() {
    this.emerald = this.emerald + 1;
};

GemScore.prototype.getEmerald = function() {
    return this.emerald;
};

GemScore.prototype.addGarnet = function() {
    this.garnet = this.garnet + 1;
};

GemScore.prototype.getGarnet = function() {
    return this.garnet;
};

GemScore.prototype.addSapphire = function() {
    this.sapphire = this.sapphire + 1;
};

GemScore.prototype.getSapphire = function() {
    return this.sapphire;
};

GemScore.prototype.reset = function() {
    this.emerald = 0;
    this.garnet = 0;
    this.sapphire = 0;
    // reset all gems to their original locations
    allEmeralds.forEach(function(emerald) {emerald.reset();});
    allGarnets.forEach(function(garnet) {garnet.reset();});
    allSapphires.forEach(function(sapphire) {sapphire.reset();});
};


/* parent class for all gem classes - Emerald, Garnet and Sapphire
 * implemented as a good showcase for inheritance and encapsulation
 * keeps track of size of the gem
 */
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
};

// width of the gem
Gem.prototype.WIDTH = 80;
// height of the gem
Gem.prototype.HEIGHT = 80;

Gem.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
};

Gem.prototype.disappear = function() {
    this.x = -1000;
    this.y = -1000;
};

/* Emerald class
 * Parameter x: the x position on the canvas
 * Parameter y; the y position on the canvas
 */
var Emerald = function(x, y) {
    this.emerald = 'images/Gem-Green.png';
    this.original = [x, y];
    this.x = x;
    this.y = y;
};

// hooks itself to Gem class as its parent
Emerald.prototype = Object.create(Gem.prototype);
Emerald.prototype.constructor = Emerald;

Emerald.prototype.render = function() {
    ctx.drawImage(Resources.get(this.emerald), this.x, this.y, this.WIDTH, this.HEIGHT);
};

/* Garnet class
 * Parameter x: the x position on the canvas
 * Parameter y: the y position on the canvas
 */
var Garnet = function(x, y) {
    this.garnet = 'images/Gem-Orange.png';
    this.original = [x, y];
    this.x = x;
    this.y = y;
};

// hooks itself to Gem class as its parent
Garnet.prototype = Object.create(Gem.prototype);
Garnet.prototype.constructor = Garnet;

Garnet.prototype.render = function() {
    ctx.drawImage(Resources.get(this.garnet), this.x, this.y, this.WIDTH, this.HEIGHT);
};


/* Sapphire class
 * Parameter x: the x position on the canvas
 * Parameter y: the y position on the canvas
*/
var Sapphire = function(x, y) {
    this.sapphire = 'images/Gem-Blue.png';
    this.original = [x, y];
    this.x = x;
    this.y = y;
};

// hooks itself to Gem class as its parent
Sapphire.prototype = Object.create(Gem.prototype);
Sapphire.prototype.constructor = Sapphire;

Sapphire.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sapphire), this.x, this.y, this.WIDTH, this.HEIGHT);
};

/* Enemies our player must avoid
 * Parameter x: the x position on the canvas
 * Parameter y: the y position on th canvas
 * Parameter speed: the rate at which the enemy moves
 */
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.original = [x, y];
    this.x = x;
    this.y = y;
    this.speed = speed;
};

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
};

/* Player class
 * Parameter x: the x position of the player
 * Parameter y: the y position of the player
 */
var Player = function(x, y) {
    // associate the image with the player
    this.sprite = "images/char-princess-girl.png";
    this.original = [x, y];
    this.x = x;
    this.y = y;
};

// best collision width for gem
Player.prototype.GEM_COLLISION_WIDTH = 20;
// best collision width for player and bug
Player.prototype.COLLISION_WIDTH = 20;

// update method for Player class
Player.prototype.update = function() {

    // if we have enemies, they are moving
    // we check if our player has hit any bugs
    // and throw a collision exception if they do
    // to reset the player and the bugs
    if (allEnemies !== null && allEnemies.length > 0) {
        for (var i = 0; i < allEnemies.length; i++) {
            if (this.checkCollision(allEnemies[i])) {
                hearts.remove();
                throw new CollisionException("collided!");
            }
        }
    }

    // if we're at level1, emeralds are available for pickup
    // check if the player collided with the emeralds
    // and if it did, emerald disappears
    if (level.getLevel() == "level1") {
        for (var k = 0; k < allEmeralds.length; k++) {
            if (this.checkGemCollision(allEmeralds[k])) {
                gemScore.addEmerald();
                allEmeralds[k].disappear();
            }
        }
    }

    // if we're at level2, garnets are available for pickup
    // check if the player collided with the garnets
    // and if it did, garnet disappears
    if (level.getLevel() == "level2" && !newLevel) {
        for (var p = 0; p < allGarnets.length; p++) {
            if (this.checkGemCollision(allGarnets[p])) {
                gemScore.addGarnet();
                allGarnets[p].disappear();
            }
        }
    }

    // if we're at level3, sapphires are available for pickup
    // check if the player collided with the sapphires
    // and if it did, sapphires disappear
    if (level.getLevel() == "level3" && !newLevel) {
        for (var t = 0; t < allSapphires.length; t++) {
            if (this.checkGemCollision(allSapphires[t])) {
                gemScore.addSapphire();
                allSapphires[t].disappear();
            }
        }
    }

    // y location on canvas where the player has successfully
    // crossed the bug territory to water! yay!
    // the player MUST get to the water ONCE, after gems are
    // collected to move up to the next level
    if (this.y < 80) {
        //up the score
        score.add();
        // if we have a gem when we get to the water
        if (this.hasGem()) {
            // did the player collect all the emeralds?
            // if so, move the player to the next level
            if (level.getLevel() == "level1" && gemScore.getEmerald() == allEmeralds.length) {
                level.setLevel("level2");
                // add extra enemies on level2
                allEnemies.push(enemy6, enemy7);
                newLevel = true;
                throw new GemException("all emeralds collected");
            }
            // did the player collect all the garnets?
            // if so, move the player to the next level
            if (level.getLevel() == "level2" && gemScore.getGarnet() == allGarnets.length) {
                level.setLevel("level3");
                // add extra enemies on level3
                allEnemies.push(enemy8);
                newLevel = true;
                throw new GemException("all garnets collected");
            }
            // did the player collect all the sapphires?
            // if so, game is over!
            if (level.getLevel() == "level3" && gemScore.getSapphire() == allSapphires.length) {
                gameOver = true;
                newLevel = true;
                throw new GemException("all sapphires collected");
            }
        } else {
            // new level is NOT set if all gems are not collected
            newLevel = false;
        }
        // reset the player if the player has crossed to the water successfully
        player.reset();
    }
};

// setter for if the player has collected the gem
Player.prototype.setGemCollected = function(collected) {
    this.hasGem = collected;
};

// getter for if the player has gem
// return true if player has gem, false otherwise
Player.prototype.hasGem = function() {
    if (this.hasGem) {
        return true;
    }
    return false;
};

// render method for Player class
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// when left or right arrow keys are pressed, player must move by a col width of 101
Player.prototype.STEP_WIDTH_X = 101;
// when top or bottom arrow keys are pressed, player must move by a row width of 83
Player.prototype.STEP_WIDTH_Y = 83;

// handleInput method for Player class -
Player.prototype.handleInput = function(keyCode) {
    // set left, right, up and down boundaries
    // so the player cannot move outside the box
    if (keyCode == 'left') {
        if (!((this.x - this.STEP_WIDTH_Y) < -10)) {
            this.x = this.x - this.STEP_WIDTH_Y;
        }
    } else if (keyCode == 'right') {
        if (!((this.x + this.STEP_WIDTH_Y) > 420)) {
            this.x = this.x + this.STEP_WIDTH_Y;
        }
    } else if (keyCode == 'up') {
        if (!((this.y - this.STEP_WIDTH_X) < 0)){
            this.y = this.y - this.STEP_WIDTH_X;
        }
    } else if (keyCode == 'down') {
        if (!((this.y + this.STEP_WIDTH_X) > 430)) {
            this.y = this.y + this.STEP_WIDTH_X;
        }
    }
};

// if collision is true, move the sprite to its original location
Player.prototype.reset = function() {
    this.x = this.original[0];
    this.y = this.original[1];
};

// check if the player collided with any of the enemy bugs
Player.prototype.checkCollision = function(e) {
//    var val = (this.left > e.right) || (this.right < e.left)
//          || (this.bottom < e.top) || (e.bottom < this.top);
    var val = !(getLeft(this.x, this.COLLISION_WIDTH) > getRight(e.x, this.COLLISION_WIDTH) ||
                getRight(this.x, this.COLLISION_WIDTH) < getLeft(e.x, this.COLLISION_WIDTH) ||
                getBottom(this.y, this.COLLISION_WIDTH) < getTop(e.y, this.COLLISION_WIDTH) ||
                getBottom(e.y, this.COLLISION_WIDTH) < getTop(this.y, this.COLLISION_WIDTH));
    return val;
};

// check if the player picked up any of the gems
// TODO - refine gem collision further - in version 2
//      - make it depend on width and height i.e., size of gem which could vary
//      - make gems of varying sizes depending on levels
Player.prototype.checkGemCollision = function(gem) {
    var val = !(getLeft(this.x, this.COLLISION_WIDTH) > getRight(gem.x , this.GEM_COLLISION_WIDTH) ||
                getRight(this.x, this.COLLISION_WIDTH) < getLeft(gem.x, this.GEM_COLLISION_WIDTH)  ||
                getBottom(this.y, this.COLLISION_WIDTH) < getTop(gem.y, this.GEM_COLLISION_WIDTH)  ||
                getBottom(gem.y, this.GEM_COLLISION_WIDTH) < getTop(this.y, this.COLLISION_WIDTH));
    if (val) {
        this.setGemCollected = true;
    }
    return val;
};

// get the x coordinate for collision to the left of sprite
function getLeft(xVal, width) {
    return xVal - width;
}

// get the y coordinate for collision to the top of the sprite
function getTop(yVal, width) {
    return yVal - width;
}

// get the x coordinate for collision to the right of the sprite
function getRight(xVal, width) {
    return xVal + width;
}

// get the y coordinate for collision to the bottom of the sprite
function getBottom(yVal, width) {
    return yVal + width;
}

// the CollisionException class
function CollisionException(message) {
    this.message = message;
    this.name = "CollisionException";
}

// global Error object is the parent for CollisionException class
CollisionException.prototype = Object.create(Error.prototype);
CollisionException.prototype.constructor = CollisionException;


// the GemException class
function GemException(message) {
    this.name = "GemException";
    this.message = message;
}

// global Error object is the parent for the GemException class
GemException.prototype = Object.create(Error.prototype);
GemException.prototype.constructor = GemException;


// an array to hold all enemies
var allEnemies = [];
// instantiate all enemies
var enemy1 = new Enemy(-50, 120, 25);
var enemy2 = new Enemy(-80, 220, 20);
var enemy3 = new Enemy(-90, 280, 25);
var enemy4 = new Enemy(-100, 320, 40);
var enemy5 = new Enemy(-30, 240, 40);
var enemy6 = new Enemy(-30, 160, 80);
var enemy7 = new Enemy(-70, 260, 100);
var enemy8 = new Enemy(-100, 100, 120);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// instantiate the player
// location of player is critical to where the player 'seems'
// to be able to move - edges of the canvas since we have
// to move in a box of 83x101 per game specs
// Do NOT change these values!
var player = new Player(160, 415);

// instantiate score counter
var score = new Score();

// instantiate gem counter
var gemScore = new GemScore();

// instantiate heart counter
var hearts = new Heart();

// an array to hold all emeralds
var allEmeralds = [];
// instantiate emerald object
var emerald1 = new Emerald(190, 250);
var emerald2 = new Emerald(10, 280);
var emerald3 = new Emerald(360, 190);
// push the emerald(s) to the array
allEmeralds.push(emerald1, emerald2, emerald3);

// an array to hold all garnets
var allGarnets = [];
var garnet1 = new Garnet(300, 280);
var garnet2 = new Garnet(120, 200);
var garnet3 = new Garnet(240, 300);
var garnet4 = new Garnet(10, 180);
// push all garnets to the array
allGarnets.push(garnet1, garnet2, garnet3, garnet4);

// an array to hold all sapphires
var allSapphires = [];
var sapphire1 = new Sapphire(300, 340);
var sapphire2 = new Sapphire(220, 300);
var sapphire3 = new Sapphire(390, 350);
var sapphire4 = new Sapphire(10, 280);
var sapphire5 = new Sapphire(150, 200);
// push all sapphires to the array
//allSapphires.push(sapphire1, sapphire2, sapphire3, sapphire4, sapphire5);
allSapphires.push(sapphire1, sapphire2, sapphire3, sapphire4, sapphire5);

// var level1, level2, level3;
// game should always start at 'level1'
var level = new Level("level1");

// variable to check before a level is changed
var newLevel = false;
// variable to check if game is over
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
