var Enforcer = function(canvas, player) {
	this.TYPE = "ENFORCER";
	this.canvas = canvas;
	this.player = player;
	this.MIN_STEPS = 80;
	this.MAX_STEPS = 200;
	this.X_MIN = 30;
	this.X_MAX = 508;
	this.Y_MIN = 30; 
	this.Y_MAX = 354;
	this.X_PADDING = 100;
	this.Y_PADDING = 100;
	this.x = this.X_MIN+parseInt(this.X_MAX*Math.random());
	this.y = this.Y_MIN+parseInt(this.Y_MAX*Math.random());
	this.speed = 0.5;
	this.direction = [0, 0, 0, 0];
	this.steps = 0;
	this.sprite = null;
	this.IMAGE = "static/images/sprites/enforcer.png";
	this.diff = {};
	this.init();
};

Enforcer.prototype.init = function() {
	this.direction = 4*Math.floor(4*Math.random());
	var img = new Image();
	img.src = this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: 18, 
		height: 22, 
		image: img, 
		numberOfFrames: 6,  
		ticksPerFrame: 4, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});
	this.reset();
	this.update();
	this.render();
};

Enforcer.prototype.reset = function() {
	//alert("Enforcer reset");
	this.steps = this.MIN_STEPS+Math.floor(this.MAX_STEPS*Math.random());
	this.direction = [0, 0, 0, 0];
	this.direction[Math.floor(4*Math.random())] = 1;
};

Enforcer.prototype.update = function() {
	/*
	switch (parseInt(this.direction.join(""), 2)) {
		case 1:
			if (this.x>this.X_MIN) {
				this.x-=this.speed;
				this.sprite.setFrameStart(9);
			}
			else this.reset();
			break;
		case 2:
			if (this.y<this.Y_MAX) {
				this.y+=this.speed;
				this.sprite.setFrameStart(6);
			}
			else this.reset();
			break;
		case 4:
			if (this.x<this.X_MAX) {
				this.x+=this.speed;
				this.sprite.setFrameStart(3);
			}
			else this.reset();
			break;
		case 8:
			if (this.y>this.Y_MIN) {
				this.y-=this.speed;
				this.sprite.setFrameStart(0);
			}
			else this.reset();
			break;
	}
	*/
	this.sprite.update(this.x, this.y);
	--this.steps;
	if (this.steps==0)
		this.reset();
};

Enforcer.prototype.updateCollision = function() {
	var dx = Math.abs(this.x-this.player.x);
	var dy = Math.abs(this.y-this.player.y);
	this.diff = {"dx":dx, "dy":dy};
};

Enforcer.prototype.render = function() {
	this.sprite.render();
};
/*
Enforcer.prototype.print = function() {
	var dir = parseInt(this.direction.join(""), 2);
	var rtn = "Enforcer steps:"+this.steps+", direction:"+dir+"<br/>";
	var rtn = "<b>Enforcer:</b><br/>x:"+this.x+", y:"+this.y+"<br/>directions: "+dir+"<br/>";
	return rtn;
};
*/