var Grunt = function(canvas, player) {
	this.TYPE = "GRUNT";
	this.MIN_STEPS = 20;
	this.MAX_STEPS = 200;
	this.RANDOM_DIVERSION = 0;
	this.X_MIN = 10;
	this.X_MAX = 548;
	this.Y_MIN = 10; 
	this.Y_MAX = 384;
	this.W_TOL = 100;
	this.H_TOL = 100;
	
	this.START_POS = [
		{x:this.X_MIN, y:this.Y_MIN, w:this.W_TOL, h:this.H_TOL}, 
		{x:this.X_MAX, y:this.Y_MIN, w:this.W_TOL, h:this.H_TOL},
		{x:this.X_MAX, y:this.Y_MAX, w:this.W_TOL, h:this.H_TOL},
		{x:this.X_MIN, y:this.Y_MAX, w:this.W_TOL, h:this.H_TOL}
	];
	
	this.X_PADDING = 100;
	this.Y_PADDING = 100;
	this.SPEED_MAX = 1;
	this.SPEED_MIN = 0.001;
	this.SPEED_INC = 0.0001;
	this.IMAGE = "static/images/sprites/grunt.png"; // Sprite Source
	
	this.canvas = canvas;
	this.player = player;
	var startpos = Math.floor(4*Math.random());
	this.x = this.START_POS[startpos].x;
	this.y = this.START_POS[startpos].y;
	switch (startpos) {
		case 0:
		case 3:
			this.x += this.START_POS[startpos].w*Math.random();
			break;
		case 1:
		case 2:
			this.y += this.START_POS[startpos].h*Math.random();
			break;
	}
	this.speed = this.SPEED_MAX*Math.random()+this.SPEED_MIN;
	this.steps = 0;
	this.frame = 0;
	this.sprite = null;
	this.diff = {};
	this.init();
};

Grunt.prototype.init = function() {
	var img = new Image();
	img.src = this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: 18, 
		height: 26, 
		image: img, 
		numberOfFrames: 3, 
		ticksPerFrame: 8, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});
	this.reset();
	this.update();
	this.render();
};

Grunt.prototype.reset = function() {
	this.steps = this.MIN_STEPS+Math.floor(this.MAX_STEPS*Math.random());
	this.frame = 0;
	this.direction = [0, 0, 0, 0];
	this.diversion = this.RANDOM_DIVERSION*Math.random();
};

Grunt.prototype.update = function() {
	
	this.frame++;
	this.direction = [0, 0, 0, 0];
	if (this.y<this.player.y) {
		this.direction[2] = 1;
		this.direction[0] = 0; 
	}
	else if (this.y>this.player.y) {
		this.direction[0] = 1;
		this.direction[2] = 0;
	}
	if (this.x>this.player.x) {
		this.direction[3] = 1;
		this.direction[1] = 0;
	}
	else if (this.x<this.player.x) {
		this.direction[1] = 1;
		this.direction[3] = 0;
	}
	
	if (this.direction[0]==1) {
		if (this.y>this.Y_MIN) this.y-=this.speed+this.diversion;
	}
	else if (this.direction[2]==1) {
		if (this.y<this.Y_MAX) this.y+=this.speed+this.diversion;;
	}
	if (this.direction[1]==1) {
		if (this.x<this.X_MAX) this.x+=this.speed+this.diversion;;
	}
	else if (this.direction[3]==1) {
		if (this.x>this.X_MIN) this.x-=this.speed+this.diversion;;
	}
	
	this.speed+=this.SPEED_INC*Math.random();
	
	this.sprite.update(this.x, this.y);
};

Grunt.prototype.updateCollision = function() {
	var dx = Math.abs(this.x-this.player.x);
	var dy = Math.abs(this.y-this.player.y);
	this.diff = {"dx":dx, "dy":dy};
};

Grunt.prototype.render = function() {
	this.sprite.render();
};

Grunt.prototype.test = function() {
	return "GRUNT TEST";
};

Grunt.prototype.print = function() {
	//var dir = this.direction.join("");
	//var rtn = "GRUNT<br/>steps:"+this.steps+", direction:"+dir+"<br/>";
	var rtn = "GRUNT"+"<br/>";
	//rtn += "diff: dx:"+Math.floor(this.diff["dx"])+", dy:"+Math.floor(this.diff["dy"])+"<br/>";
	//rtn += "x:"+Math.floor(this.x)+", y:"+Math.floor(this.y)+"<br/>directions: "+dir+"<br/>";
	return rtn;
};