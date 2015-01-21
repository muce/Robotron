var Bullet = function(canvas, player, dir, i) {
	this.X_MIN = 0;
	this.X_MAX = 558;
	this.Y_MIN = 1; 
	this.Y_MAX = 394;
	this.UP = 1;
	this.RIGHT = 2;
	this.DOWN = 4;
	this.LEFT = 8;
	this.IMAGE = "static/images/sprites/bullet.png"; // Sprite source
	
	this.COLLISION_SIZE = 4;
	
	this.canvas = canvas;
	this.player = player;
	this.direction = dir;
	this.index = i;
	this.x = this.player.x;
	this.y = this.player.y;
	this.speed = 8;
	this.sprite = null;
	this.init();
};
	
Bullet.prototype.init = function() {
	
	//alert("Bullet dir:"+this.direction);
	
	var img = new Image();
	img.src = this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: 2,  
		height: 18, 
		image: img, 
		numberOfFrames: 1, 
		ticksPerFrame: 4, 
		scaleRatio: 2, 
		x: this.x, 
		y: this.y
	});
	
	this.sprite.setFrameStart(1);
	this.update();
	this.render();
};

Bullet.prototype.update = function() {

	if (this.direction&1) {
		if (this.y>this.Y_MIN) {
			this.y-=this.speed;
		}
		else this.player.destroyBullet(this.index);
	}
	
	if (this.direction&2) {
		if (this.x<this.X_MAX) {
			this.x+=this.speed;
		}
		else this.player.destroyBullet(this.index);
	}
	
	if (this.direction&4) {
		if (this.y<this.Y_MAX) {
			this.y+=this.speed;
		}
		else this.player.destroyBullet(this.index);
	}
	
	if (this.direction&8) {
		if (this.x>this.X_MIN) {
			this.x-=this.speed;
		}
		else this.player.destroyBullet(this.index);
	}
	
	this.sprite.update(this.x, this.y);
};

Bullet.prototype.updateCollision = function(char) {
	this.txt = "";
	var diffX = Math.abs(this.x-char.x);
	var diffY = Math.abs(this.y-char.y);
	if (diffX<this.COLLISION_SIZE&&diffY<this.COLLISION_SIZE) {
		return char;
	}
	return false;
	//this.txt = "Bullet Collision: diffX:"+diffX+", diffY:"+diffY;
};

Bullet.prototype.render = function() {
	this.sprite.render();
};

Bullet.prototype.print = function() {
	var rtn = this.txt + "<br/>"; 
	return rtn;
};

