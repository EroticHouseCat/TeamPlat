function World(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	// Creates the groups for the world map
	this.ground = this.add(this.game.add.group());
	this.walls  = this.add(this.game.add.group());
	this.obstacles = this.add(this.game.add.group());
	this.enemies = this.add(this.game.add.group());
	this.checkpoints = this.add(this.game.add.group());
	this.legs = this.add(this.game.add.group());
			
	this.runTime = this.game.time.now;

	this.absBottom = null;
	this.thePlayer = null;

	// Start music
	this.bg_music = this.game.add.audio('bg_music');
	this.bg_music.loop = true;
	this.bg_music.volume = 1;
	this.bg_music.play();
};

World.prototype = Object.create(Phaser.Group.prototype);
World.prototype.constructor = World;

// Gives world a reference of player
World.prototype.retreivePlayer = function(player) {
	this.thePlayer = player;
	this.init();
}

// Stops background music
World.prototype.stopMusic = function() {
	this.bg_music.stop();
}

// Initializes the world, spawns all prefabs
World.prototype.init = function() {
	this.loadWalls('platform_atlas', 'platform0');
	this.loadFloor('platform_atlas', 'platform0');
	this.loadChecks();
	this.loadEnemies();
	this.loadObstacles('platform_atlas', 'bigspike');
	this.loadLegs();
	
	this.loadAbsBottom();
}

// Loads legs (lives) in the map and gives them a super sweet tween
World.prototype.loadLegs = function() {
	var newLeg = this.legs.add(new Leg(this.game, 'leg', 264, 2270, this.thePlayer));
	var tween = this.game.add.tween(newLeg);
	tween.to({y: newLeg.y - 10}, 1000, 'Linear', true, 200, false, true);

	newLeg = this.legs.add(new Leg(this.game, 'leg', 940, 400, this.thePlayer));
	tween = this.game.add.tween(newLeg);
	tween.to({y: newLeg.y - 10}, 1000, 'Linear', true, 200, false, true);

	newLeg = this.legs.add(new Leg(this.game, 'leg', 1800, 1650, this.thePlayer));
	tween = this.game.add.tween(newLeg);
	tween.to({y: newLeg.y - 10}, 1000, 'Linear', true, 200, false, true);
}

// Loads checkpoints and the end portal in the map
World.prototype.loadChecks = function() {
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, this.thePlayer.x-100, this.thePlayer.y+100));
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1415, 2275));
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 550, 1850));
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 110, 975));
	this.checkpoints.add(new Checkpoint(this.game, 'checkpoint', 'portal0', this.thePlayer, 1850, 1550));	
	this.checkpoints.add(new Portal(this.game, 'checkpoint', 'portal0', this.thePlayer, 2050, 1850, 'LevelSelect', 0));
}

// Loads all horizontal platforms
World.prototype.loadFloor = function(atlas, frame) {
	let temp = this.ground.add(new PlatformA(this.game, atlas, frame, 32));
	temp.x = -32;
	temp.y = 2000;
	
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 1205;
	temp.y = 1900;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4));
	temp.x = 1365;
	temp.y = 1804;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 688 + 224;
	temp.y = 1718;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 5));
	temp.x = 664;
	temp.y = 1504;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 470;
	temp.y = 1408;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 16;
	temp.y = 504;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 408;
	temp.y = 448;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 13));
	temp.x = 1308;
	temp.y = 648;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 6));
	temp.x = 1308 + (5*32);
	temp.y = 348;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1308 - (15*32);
	temp.y = 98;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 4));
	temp.x = 1308 + (16 * 32);
	temp.y = 448;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1820;
	temp.y = 1148;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 7));
	temp.x = 1948;
	temp.y = 1348;
}

// Loads all vertical platforms (walls)
World.prototype.loadWalls = function(atlas, frame) {
	let temp = this.walls.add(new WallA(this.game, atlas, frame, 3));
	temp.x = 1365;
	temp.y = 1804;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 7));
	temp.x = 812;
	temp.y = 1504;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 3));
	temp.x = 664;
	temp.y = 1408;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 23));
	temp.x = 280;
	temp.y = 704;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 280;
	temp.y = 704

	temp = this.walls.add(new WallA(this.game, atlas, frame, 20));
	temp.x = 408;
	temp.y = 576;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 30));
	temp.x = 1493;
	temp.y = 876;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 408;
	temp.y = 576;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 17));
	temp.x = 1308 + (12 * 32);
	temp.y = 648;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 15));
	temp.x = 1308 + (16 * 32);
	temp.y = 448;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 20));
	temp.x = 1308 + (19 * 32);
	temp.y = 448 - (19 * 32);
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 1308 + (19 * 32);
	temp.y = 448 - (19 * 32);

	temp = this.walls.add(new WallA(this.game, atlas, frame, 18));
	temp.x = 2044;
	temp.y = 416;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2044;
	temp.y = 416;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 23));
	temp.x = 2172;
	temp.y = 480;
	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2172;
	temp.y = 480;

	temp = this.walls.add(new WallA(this.game, atlas, frame, 28));
	temp.x = 2332;
	temp.y = 480;

	temp = this.ground.add(new PlatformA(this.game, atlas, frame, 1));
	temp.x = 2332;
	temp.y = 480;

}

// Loads all enemies
World.prototype.loadEnemies = function() {
	this.enemies.add(new Mob(this.game, 'robobitch_atlas', 'robobitch0', 520, 974, this, this.thePlayer, 0));
}

// Loads all obstacles
World.prototype.loadObstacles = function(atlas, frame) {
	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 7));
	temp.x = 986;
	temp.y = 2100;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 5));
	temp.x = 310;
	temp.y = 1440;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 3));
	temp.x = 1724;
	temp.y = 1180;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 4));
	temp.x = 2044;
	temp.y = 1180;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, Math.PI, 9));
	temp.x = 2076;
	temp.y = 308;

	temp = this.obstacles.add(new Obstacle(this.game, atlas, frame, 0, 0, 0.5, 0.5, 0, 7));
	temp.x = 2140;
	temp.y = 1380;
}

// Loads bottom line of map
World.prototype.loadAbsBottom = function() {
	this.absBottom = this.game.add.sprite(0, 3000, null);
	this.game.physics.enable(this.absBottom, Phaser.Physics.ARCADE);
	this.absBottom.body.setSize(this.game.world.width, 5);

}

// Respawns all enemies when the player dies
World.prototype.resetWorld = function() {
	this.enemies.forEach(function(enemy) {
		enemy.stopMusic();
		enemy.reinitialize();
	}, Mob);
}
