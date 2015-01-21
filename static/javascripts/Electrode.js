var Electrode = function(canvas, player) {
	this.TYPE = "ELECTRODE";
	this.X_MIN = 10;
	this.X_MAX = 548;
	this.Y_MIN = 10; 
	this.Y_MAX = 384;
	this.X_PADDING = 100;
	this.Y_PADDING = 100;
	this.WIDTH = 18;
	this.HEIGHT = 18;
	this.IMAGE = "static/images/sprites/electrode3.png"; // Sprite Source file
	this.IMAGES = [
		"static/images/sprites/electrode1.png", 
		"static/images/sprites/electrode3.png"
	];
	this.canvas = canvas;
	this.player = player;
	this.x = this.X_MIN+parseInt(this.X_MAX*Math.random());
	this.y = this.Y_MIN+parseInt(this.Y_MAX*Math.random());
	this.sprite = null;
	this.diff = {};
	this.init();
};

Electrode.prototype.init = function() {
	var img = new Image();
	img.src = this.IMAGES[Math.floor(this.IMAGES.length*Math.random())];//this.IMAGE;
	this.sprite = new Sprite({
		context: this.canvas.getContext("2d"), 
		width: this.WIDTH, 
		height: this.HEIGHT, 
		image: img, 
		numberOfFrames: 3, 
		ticksPerFrame: 8, 
		scaleRatio: 1, 
		x: this.x, 
		y: this.y
	});
	this.update();
	this.render();
};

Electrode.prototype.update = function() {
	this.sprite.update(this.x, this.y);
};

Electrode.prototype.updateCollision = function() {
	var dx = Math.abs(this.x-this.player.x);
	var dy = Math.abs(this.y-this.player.y);
	this.diff = {"dx":dx, "dy":dy};
};

Electrode.prototype.render = function() {
	this.sprite.render();
};
