var Player = function(canvas) {
	this.canvas = canvas;
	this.X_MIN = 0;
	this.X_MAX = 558;
	this.Y_MIN = 1; 
	this.Y_MAX = 394;
	this.BULLETS_MAX = 4; 
	this.BULLETS_SPEED = 2;
	this.UP = 1; // UP flag
	this.RIGHT = 2; // RIGHT flag
	this.DOWN = 4; // DOWN flag
	this.LEFT = 8; // LEFT flag
	this.IMAGE = "static/images/sprites/player.png"; // Sprite Source
	this.x = this.canvas.width/2;
	this.y = this.canvas.height/2;
	this.directions = [0, 0, 0, 0]; // up, right, down, left
	this.direction = 0; // 4 directions. UP, RIGHT, DOWN, LEFT
	this.bullets = []; // 0..BULLETS_MAX 4 bit direction
	this.bulletdir = 0; // 8 directions for bullets [1, 2, 3, 4, 6, 8, 9, 12]
	this.keysdown = 0;
	this.speed = 3; // movement speed
	this.sprite = null;
	
	this.init();
};
	
Player.prototype.init = function() {
	
	var img = new Image();
	img.src = this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: 14, //168, 
		height: 24, 
		image: img, 
		numberOfFrames: 3, 
		ticksPerFrame: 12, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});

	this.bullets = new Array(this.BULLETS_MAX);
	this.update();
	this.render();
};

Player.prototype.update = function() {
	
	this.sprite.update(this.x, this.y);

	for (var i=0; i<this.bullets.length; i++) {
		if (this.bullets[i]!=null) 
			this.bullets[i].update();
	}
	
	if (this.keysdown!=0)
		this.createBullet(this.keysdown);
	this.keysdown = 0;
	
};

Player.prototype.updateCollision = function(chars) {
	for (var i=0; i<this.bullets.length; i++) {
		if (this.bullets[i]!=null) {
			for (var j in chars) {
				if (chars[j]!=null) {
					if (this.bullets[i].updateCollision(chars[j]) != false) {
						//chars[j] = null;
						//this.destroyBullet(i));
						//this.destroyChar(chars[j]);
					}
					/*
					switch (this.chars[i].TYPE) {
						case "ELECTRODE":
							if (this.chars[i].diff["dx"]<8&&this.chars[i].diff["dy"]<8) {
								alert("hit ELECTRODE");
								this.chars[i] = null;
							}
							break;
						
						case "BRAIN":
							if (this.chars[i].diff["dx"]<8&&this.chars[i].diff["dy"]<8) {
								this.chars[i] = null;
							}
							break;
						case "FAMILY":
							if (this.chars[i].diff["dx"]<8&&this.chars[i].diff["dy"]<8) {
								this.chars[i] = null;
							}
							break;
						case "GRUNT":
							if (this.chars[i].diff["dx"]<8&&this.chars[i].diff["dy"]<8) {
								this.chars[i] = null;
							}
							break;
						
					}
					*/
				}
			}
		}	
	} 
};

Player.prototype.render = function() {
	this.sprite.render();
	for (var i=0; i<this.bullets.length; i++) {
		if (this.bullets[i]!=null)
			this.bullets[i].render();	
	} 
};


Player.prototype.createBullet = function(dir) {
	var i = 0;
	var found = false;
	for (var i=0; i<this.bullets.length; i++) {
		if (this.bullets[i]==null&&found==false) {
			this.bullets[i] = new Bullet(this.canvas, this, dir, i);
			found = true;
		}
	}
};

Player.prototype.destroyBullet = function(i) {
	//alert("Player.destroyBullet "+i);
	this.bullets[i] = null;
};

Player.prototype.destroyChar = function(char) {
	alert("Player.destroyChar "+char);
	this.char = null;
};

Player.prototype.move = function(dir) {
	switch (dir) {
		case "up":
			if (this.y>this.Y_MIN) {
				this.y-=this.speed;
			} else this.y = this.Y_MAX;
			this.sprite.setFrameStart(0);
			break;
		case "right":
			if (this.x<this.X_MAX) {
				this.x+=this.speed;
			} else this.x = this.X_MIN;
			this.sprite.setFrameStart(3);
			break;
			this.x+=this.speed;
			break;
		case "down":
			if (this.y<this.Y_MAX) {
				this.y+=this.speed;
			} else this.y = this.Y_MIN;
			this.sprite.setFrameStart(6);
			break;
			this.y+=this.speed;
			break;
		case "left":
			if (this.x>this.X_MIN) {
				this.x-=this.speed;
			} else this.x = this.X_MAX;
			this.sprite.setFrameStart(9);
			break;
	}
};

Player.prototype.fire = function(dir) {
	this.keysdown |= dir;
};

Player.prototype.print = function() {
	var rtn = "PLAYER:"+"<br/>";
	return rtn;
};
