var Robotron = function(root, canvas, context, player, debug) {
	this.root = root;
	this.canvas = canvas;
	this.context = context;
	this.debug = debug;
	
	this.SHOW_DEBUG = true;
	
	this.txt = "";
	
	this.WIDTH = 554; 
	this.HEIGHT = 380;
	this.FPS = 60;
	
	this.FAMILY_NAMES = ["MOMMY", "DADDY", "MIKEY"];
	
	this.CHARACTERS = { 
		"FAMILY":[1000,2000,3000,4000,5000], 
		"GRUNT":100, 
		"SPHEREOID":1000, 
		"QUARK":1000, 
		"ENFORCER":150, 
		"TANK":200, 
		"BRAIN":500, 
		"CRUISE_MISSILE":25
	};
	
	this.EXTRA_LIFE_SCORE = 25000;
	
	this.UP = 1;
	this.RIGHT = 2;
	this.DOWN = 4;
	this.LEFT = 8;
	
	this.KEYS = {
		"cursor_left":37, 
		"cursor_up":38,
		"cursor_right":39,
		"cursor_down":40,
		"move_left":65, 
		"move_right":68, 
		"move_up":87, 
		"move_down":83, 
		"fire_left":74, 
		"fire_right":76, 
		"fire_up":73, 
		"fire_down":75
	};
	
	this.COLLISION = 16;
	
	this.keyState = {};
	
	this.keyflags = 0;
	
	this.timerID = 0;
	this.currentFrame = 0;
	
	this.level = 0; // Level object
	this.stage = 1; // Current stage
	
	this.player = null;
	this.characters = {};
	this.chars = {};

};

Robotron.prototype.init = function() {
	this.txt = "Robotron.init";
	//this.print();
	this.player = new Player(this.canvas);
	this.level = new Level();
	this.createCharacters();
	this.addEventListeners();
	this.run();
};

Robotron.prototype.createCharacters = function() {
	
	this.characters = this.level.init(this.stage);
	
	var i = 0;
	for (var type in this.characters) {
		switch (type) {
			case "ELECTRODE":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Electrode(this.canvas, this.player);
				break;
			case "BLOCKER":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Blocker(this.canvas, this.player);
				break;
			case "BRAIN":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Brain(this.canvas, this.player);
				break;
			case "GRUNT":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Grunt(this.canvas, this.player);
				break;
			case "TANK":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Tank(this.canvas, this.player);
				break;
			case "SPHEREOID":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Sphereoid(this.canvas, this.player);
				break;
			case "ENFORCER":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Enforcer(this.canvas, this.player);
				break;
			case "QUARK":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Quark(this.canvas, this.player);
				break;
			case "FAMILY":
				for (var j=0; j<this.characters[type]; j++)
					this.chars[i++] = new Family(this.canvas, this.player);
				break;
		}
	}

};

Robotron.prototype.removeCharacter = function(i) {
	this.chars[i] = null;
};

Robotron.prototype.run = function() {
	var self = this;
	window.requestAnimationFrame(function() {self.run.call(self);});
	this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.updateInput();
	this.update();
	this.updateCollision();
	this.render();
	this.print();
};

Robotron.prototype.updateInput = function() {
	
	if (this.keyState[this.KEYS["move_up"]]||this.keyState[this.KEYS["cursor_up"]]) {
		this.player.move("up");
	}
	else if (this.keyState[this.KEYS["move_down"]]||this.keyState[this.KEYS["cursor_down"]]) {
		this.player.move("down");
	}
	if (this.keyState[this.KEYS["move_right"]]||this.keyState[this.KEYS["cursor_right"]]) {
		this.player.move("right");
	}
	else if (this.keyState[this.KEYS["move_left"]]||this.keyState[this.KEYS["cursor_left"]]) {
		this.player.move("left");
	}
	
	if (this.keyState[this.KEYS["fire_up"]]) {
		this.player.fire(this.UP);
	}
	else if (this.keyState[this.KEYS["fire_down"]]) {
		this.player.fire(this.DOWN);
	}
	if (this.keyState[this.KEYS["fire_right"]]) {
		this.player.fire(this.RIGHT);
	}
	else if (this.keyState[this.KEYS["fire_left"]]) {
		this.player.fire(this.LEFT);
	}
	
};

Robotron.prototype.update = function() {
	this.player.update(this.chars);
	for (var i in this.chars) {
		if (this.chars[i]!=null) 
			this.chars[i].update();
	}
};

Robotron.prototype.updateCollision = function() {
	this.player.updateCollision(this.chars);

	for (var i in this.chars) {
		if (this.chars[i]!=null) {
			this.chars[i].updateCollision(this.player);
			
			switch (this.chars[i].TYPE) {
				//case "BLOCKER":
				//case "ELECTRODE":
				//case "GRUNT":
				//case "BRAIN":
				//case "TANK":
				//case "SPHEREOID":
				//case "QUARK":
				case "MISSILE":
				case "PROG":
					if (this.chars[i].diff["dx"]<this.COLLISION&&this.chars[i].diff["dy"]<this.COLLISION) {
						this.removeCharacter(i);
					}
					break;
				case "FAMILY":
					if (this.chars[i].diff["dx"]<this.COLLISION&&this.chars[i].diff["dy"]<this.COLLISION) {
						this.removeCharacter(i);
					}
					break;
			}
			
		}
	}
};


Robotron.prototype.render = function() {
	this.player.render();
	for (var i in this.chars) {
		if (this.chars[i]!=null) {
			this.chars[i].render();
		}
	}
};

Robotron.prototype.tap = function(e) {
	alert(e);
};

Robotron.prototype.addEventListeners = function() {
	var self = this;
	window.onkeydown = function(e) {
		self.keyState[e.keyCode] = true;
	};
	window.onkeyup = function(e) {
		self.keyState[e.keyCode] = false;
	};
};

Robotron.prototype.print = function() {
	rtn = "DEBUG";
	rtn += "<br/>";
	rtn += "MOVE: CURSOR KEYS";
	rtn += "<br/>";
	rtn += "MOVE: UP:W, RIGHT:D, DOWN:S, LEFT:A";
	rtn += "<br/>";
	rtn += "FIRE: UP:I, RIGHT:L, DOWN:K, LEFT:J";
	rtn += "<br/>";
	/*
	var k = "";
	for (var i in this.keyState) 
		k+=i+this.keyState[i]+"<br/>";
	this.txt += "keyState[test]: "+this.keyState["test"]+"<br/>"+k;
	*/
	//rtn += this.player.print();
	
	/*
	rtn += "CHARACTERS: "+"<br/>";
	for (var i in this.chars) {
		rtn += this.chars[i].TYPE+"<br/>";
		//rtn += this.chars[i].test()+"<br/>";
		//rtn += this.chars[i].print();
		//this.txt += i+" dx:"+this.chars[i].diff["dx"];
		//this.txt += this.chars[i].diff;
	}
	*/
	if (this.SHOW_DEBUG)
		this.debug.innerHTML = rtn;
};
