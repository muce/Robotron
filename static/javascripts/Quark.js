var Quark = function(canvas, player) {
	this.TYPE = "QUARK";
	this.canvas = canvas;
	this.player = player;
	this.MIN_STEPS = 80;
	this.MAX_STEPS = 200;
	this.X_MIN = 0;
	this.X_MAX = 554;
	this.Y_MIN = 0; 
	this.Y_MAX = 404;
	this.X_PADDING = 100;
	this.Y_PADDING = 100;
	this.x = this.X_MIN+parseInt(this.X_MAX*Math.random());
	this.y = this.Y_MIN+parseInt(this.Y_MAX*Math.random());
	this.speed = 0.01;//0.008;
	this.direction = [];
	this.targets = [
		{x:this.X_MAX, y:this.Y_MIN}, 
		{x:this.X_MAX, y:this.Y_MAX},
		{x:this.X_MIN, y:this.Y_MAX}, 
		{x:this.X_MIN, y:this.Y_MIN}
	];
	this.target = {};
	this.steps = 0;
	this.sprite = null;
	this.IMAGE = "static/images/sprites/quark.png";
	this.diff = {};
	this.init();
};

Quark.prototype.init = function() {
	var img = new Image();
	img.src = this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: 32, 
		height: 32, 
		image: img, 
		numberOfFrames: 8,  
		ticksPerFrame: 4, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});
	this.reset();
	this.update();
	this.render();
};

Quark.prototype.reset = function() {
	var ox = this.targets[Math.floor(4*Math.random())].x;
	var oy = this.targets[Math.floor(4*Math.random())].y;
	this.target = {x:ox, y:oy};
};

Quark.prototype.update = function() {
	
	var dx = Math.round(this.target.x-this.x);
	var dy = Math.round(this.target.y-this.y);
	var resx = false;
	var resy = false; 
	//var rnd = 100*Math.random();
	var rnd = 0;
	
	if (dx>0&&this.x<this.target.x)
		this.x+=dx*this.speed+rnd;
	else if (dx<0&&this.x>this.target.x)
		this.x+=dx*this.speed+rnd;
	else
		resx = true;
	
	if (dy>0&&this.y<this.target.y)
		this.y+=dy*this.speed+rnd;
	else if (dy<0&&this.y>this.target.y)
		this.y+=dy*this.speed+rnd;
	else
		resy = true;
		
	if (resx&&resy)
		this.reset();
	
	this.sprite.update(this.x, this.y);
		
};

Quark.prototype.updateCollision = function(player) {
	var dx = Math.abs(this.x-this.player.x);
	var dy = Math.abs(this.y-this.player.y);
	this.diff = {"dx":dx, "dy":dy};
};

Quark.prototype.render = function() {
	this.sprite.render();
};