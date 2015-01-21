var Level = function() {
	
	this.stage = 0;
	
	this.STAGES = [
		{
			"BLOCKER": 1, //0,
			"BRAIN": 1, //0,
			"ELECTRODE": 1, 
			"FAMILY": 1, //2, 
			"GRUNT": 10, 
			"TANK": 1, 
			"SPHEREOID": 1, 
			"QUARK": 1,  
			"PROG": 0, 
			"ENFORCER": 0
		}, 
		{
			"BLOCKER": 0, //0,
			"BRAIN": 0, //0,
			"ELECTRODE": 0, 
			"FAMILY": 0, //2, 
			"GRUNT": 50, 
			"TANK": 0, 
			"SPHEREOID": 0, 
			"QUARK": 0, 
			"TANK": 0, 
			"PROG": 0
		}
	];
	
};

Level.prototype.init = function(stage) {
	this.stage = stage-1;
	return this.STAGES[this.stage];
};
