var Family = function(canvas, player) {
	this.TYPE = "FAMILY";
	this.MIN_STEPS = 100;
	this.MAX_STEPS = 200;
	this.X_MIN = 30;
	this.X_MAX = 508;
	this.Y_MIN = 30; 
	this.Y_MAX = 354;
	this.X_PADDING = 100;
	this.Y_PADDING = 100;
	this.DIRECTIONS = [1, 2, 3, 4, 6, 8, 9, 12];
	
	this.canvas = canvas;
	this.player = player;
	this.x = this.X_MIN+parseInt(this.X_MAX*Math.random());
	this.y = this.Y_MIN+parseInt(this.Y_MAX*Math.random());
	this.diff = {};
	this.type = 0;
	this.speed = 0.5;
	this.dir = 0;
	this.steps = 0;
	this.sprite = null;
	this.images = [
		{name:"MOMMY", src:"static/images/sprites/mommy.png", width:14, height:26}, 
		{name:"DADDY", src:"static/images/sprites/daddy.png", width:16, height:26}, 
		{name:"MIKEY", src:"static/images/sprites/mikey.png", width:10, height:22}
	];
	this.init();
};

Family.prototype.init = function() {
	var img = new Image();
	var type = this.images[Math.floor(3*Math.random())];
	img.src = type.src;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: type.width,  
		height: type.height, 
		image: img, 
		numberOfFrames: 3, // 12, 
		ticksPerFrame: 8, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});
	this.reset();
	this.update();
	this.render();
};

Family.prototype.reset = function() {
	this.steps = this.MIN_STEPS+Math.floor(this.MAX_STEPS*Math.random());
	this.direction = [0, 0, 0, 0];
	this.dir = this.DIRECTIONS[Math.floor(this.DIRECTIONS.length*Math.random())];
};

Family.prototype.update = function() {
	
	switch(this.dir) {
		case 1:
			if (this.y>this.Y_MIN) {
				this.y-=this.speed;
				this.sprite.setFrameStart(0);
			}
			else this.reset();
			break;
		case 2:
			if (this.x<this.X_MAX) {
				this.x+=this.speed;
				this.sprite.setFrameStart(3);
			}
			else this.reset();
			break;
		case 3:
			if (this.y>this.Y_MIN&&this.x<this.X_MAX) {
				this.y-=this.speed;
				this.x+=this.speed;
				this.sprite.setFrameStart(3);
			} 
			else this.reset();
			break;
		case 4:
			if (this.y<this.Y_MAX) {
				this.y+=this.speed;
				this.sprite.setFrameStart(6);
			}
			else this.reset();
			break;
		case 6:
			if (this.y<this.Y_MAX&&this.x<this.X_MAX) {
				this.y+=this.speed;
				this.x+=this.speed;
				this.sprite.setFrameStart(3);
			}
			else this.reset();
			break;
		case 8:
			if (this.x>this.X_MIN) {
				this.x-=this.speed;
				this.sprite.setFrameStart(9);
			}
			else this.reset();
			break;
		case 9:
			if (this.x>this.X_MIN&&this.y>this.Y_MIN) {
				this.x-=this.speed;
				this.y-=this.speed;
				this.sprite.setFrameStart(9);
			}
			else this.reset();
			break;
		case 12:
			if (this.x<this.X_MIN&&this.y<this.Y_MAX) {
				this.x-=this.speed;
				this.y+=this.speed;
				this.sprite.setFrameStart(9);
			}
			else this.reset();
			break;
	}
	
	this.sprite.update(this.x, this.y);
	--this.steps;
	if (this.steps==0)
		this.reset();
	
};

Family.prototype.updateCollision = function() {
	var dx = Math.abs(this.x-this.player.x);
	var dy = Math.abs(this.y-this.player.y);
	this.diff = {"dx":dx, "dy":dy};
};

Family.prototype.render = function() {
	this.sprite.render();
};

Family.prototype.print = function() {
	//var dir = parseInt(this.direction.join(""), 2);
	//var rtn = "Family steps:"+this.steps+", direction:"+dir+"<br/>";
	//var rtn = "<b>Family:</b><br/>x:"+this.x+", y:"+this.y+"<br/>directions: "+dir+"<br/>";
	var rtn = "FAMILY:"+"<br/>";
	return rtn;
};