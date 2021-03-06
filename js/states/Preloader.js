	var Preloader = function(game) {
};
Preloader.prototype = {
	preload: function() {
		console.log('Preloader: preload');
		
		// Set assest path
		this.game.load.path = 'assets';
		
		// Load Images
		// Load MainMenu assets
		this.game.load.image('background00', '/img/background01.png');
		this.game.load.image('background01', '/img/background02.png');
		this.game.load.image('background02', '/img/background03.png');
		this.game.load.image('play_Button', '/img/playbutton.png');
		this.game.load.image('title_button', '/img/titlebutton.png')
		this.game.load.image('power_Button', '/img/power_Button.png');
		this.game.load.image('lvl1button', '/img/levelbutton1.png');
		this.game.load.image('lvl2button', '/img/levelbutton2.png');
		this.game.load.image('bossFightButton', '/img/boss_button.png');
		this.game.load.image('vaporTrails', '/img/cloud.png');
		
		// Load this.game assets
		this.game.load.atlas('player_atlas', '/img/player.png', '/img/sprites.json');
		this.game.load.atlas('robobitch_atlas', '/img/robobitch.png', '/img/robobitch.json');
		//this.game.load.atlas('robospawn_atlas', '/img/robospawn.png', '/img/robospawn.json');
		this.game.load.atlas('bossbot_atlas', '/img/bossbot.png', '/img/bossbot.json');
		this.game.load.atlas('tile_atlas', '/img/tiles.png', '/img/tiles.json');
		this.game.load.atlas('platform_atlas', '/img/platforms.png', '/img/platforms.json');
		this.game.load.image('lemon', '/img/lemon.png');
		this.game.load.image('evil_lemon', '/img/evilLemon.png');
		this.game.load.image('leg', '/img/legpickup.png');
		this.game.load.image('tileShade', '/img/tile_shadow.png');
		this.game.load.atlas('checkpoint', '/img/portal.png', '/img/portal.json');
		//this.game.load.spritesheet('player_test', '/img/Player.png', 123, 164);
		
		// Load Sounds
		this.game.load.audio('bg_music', '/audio/Run_bg.ogg');
		this.game.load.audio('Armless_bg', '/audio/Armless_bg.ogg');
		this.game.load.audio('GearUp_bg', '/audio/GearUp_bg.ogg');
		this.game.load.audio('boss_explode', '/audio/bossexplode.ogg');
		this.game.load.audio('player_dash', '/audio/dash.ogg');
		this.game.load.audio('player_death', '/audio/death.ogg');
		this.game.load.audio('robot_explode', '/audio/explode.ogg');
		this.game.load.audio('player_jump', '/audio/jump.ogg');
		this.game.load.audio('portal', '/audio/portal.ogg');
		this.game.load.audio('robot_fire', '/audio/roboshot.ogg');
		this.game.load.audio('boss_firing', '/audio/robospray.ogg');
		this.game.load.audio('robot_idle', '/audio/robot.ogg');
		this.game.load.audio('player_shot', '/audio/shot.ogg');
		this.game.load.audio('player_slide', '/audio/slide.ogg');//
		
		this.game.load.audio('boss_take_dmg', '/audio/bossDamage.ogg');
		this.game.load.audio('boss_laugh', '/audio/bossLaugh.ogg');
		this.game.load.audio('boss_scream', '/audio/bossScream.ogg');
		this.game.load.audio('boss_pound', '/audio/groundPound.ogg');
		this.game.load.audio('bossFly', '/audio/bossFly.ogg');
		this.game.load.audio('pickup', '/audio/pickup.ogg');
		this.game.load.audio('player_walk', '/audio/walk.ogg');
	},
	
	create: function() {
		console.log('Preloader: create');
		
		// Starts MainMenu state
		this.game.state.start('MainMenu');
	}
}
