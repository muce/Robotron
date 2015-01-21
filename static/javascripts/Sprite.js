var Sprite = function(options) {

	this.frameIndex = 0;
	this.frameStart = 0;
	this.tickCount = 0;
	this.ticksPerFrame = options.ticksPerFrame || 0;
	this.numberOfFrames = options.numberOfFrames || 1;
	this.context = options.context;
	this.width = options.width*this.numberOfFrames;
	this.height = options.height;
	this.x = options.x;
	this.y = options.y;
	this.image = options.image;
	this.scaleRatio = options.scaleRatio;

};

Sprite.prototype.setFrameStart = function(i) {
	this.frameStart = i;
};

Sprite.prototype.update = function(x, y) {
	this.tickCount++;
	if (this.tickCount>this.ticksPerFrame) {
		this.tickCount = 0;
		if (this.frameIndex<this.numberOfFrames-1)
			this.frameIndex++;
		else
			this.frameIndex = 0;
	};
	this.x = x;
	this.y = y;
};

Sprite.prototype.render = function() {
	
	this.context.drawImage(
		this.image, 
		(this.frameIndex+this.frameStart)*this.width/this.numberOfFrames, 
		0, 
		this.width/this.numberOfFrames, 
		this.height, 
		this.x, 
		this.y, 
		this.width/this.numberOfFrames*this.scaleRatio, 
		this.height*this.scaleRatio
	);
	
};
