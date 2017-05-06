function Player(game, atlas_key, atlas_frame, x, y) {
	Phaser.Sprite.call(this, game, x, y, atlas_key, atlas_frame);
	
	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enable(this);
	
	this.animations.add('walk', Phaser.Animation.generateFrameNames('WalkLeft_MouthOpen_Purple', 1, 3, '', 1), 23, true);
	this.animations.add('idle', ['WalkLeft_MouthOpen_Purple3'], 30, false);
		
	// Set scale and physics for character
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.drag = 50;
	this.anchor.setTo(.5, .5);
	this.scale.x = -1;
	this.scale.x = this.scale.x / 2;
	this.scale.y = this.scale.y / 2;
	this.animations.play('walk');
	
	// Character attributes
	this.jumping = false;
	this.facingForward = true;
	
	this.dashingForward = false;
	this.dashingBack = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = false;

	this.oldPosX = 0;
	this.oldPosY = 0;
	this.dashDistConst = 200;
	
	// Key Bindings
	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.moveRight, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(this.stopMovement, this);
	
	this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.moveLeft, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(this.stopMovement, this);
	
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.jump, this);
	this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.dash, this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.update = function() {	

	// If the player makes contact with an obstacle, dashing will stop
	//if(this.body.touchingRight || this.body.touchingLeft || this.body.touchingUp || this.body.touchingDown) {
	//	this.dashCancel();
	//}
	
	/*
	 * START HORIZONTAL DASHING
	 */

	// Dashes player to the right until the dashDistance is covered
	if(this.dashingRight && this.oldPosX - this.position.x > this.dashDistanceX) {
		this.body.velocity.x = 1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingRight) {
		this.dashingRight = false;
		this.justDashed = true;
	}
	
	// Dashes player to the left until the dashDistance is covered
	if(this.dashingLeft && this.oldPosX - this.position.x < this.dashDistanceX) {
		this.body.velocity.x = -1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingLeft) {
		this.dashingLeft = false;
		this.justDashed = true;
	}

	/*
	 * END HORIZONTAL DASHING
	 * START VERTICAL DASHING
	 */

		/*
		 * Vertical dashing doesnt work, distance is never met. I think this.oldPosY - this.position.y is incorrect
		 */
		 
	 // Debugging 
	console.log(this.oldPosY);
	console.log(this.position.y);
	console.log(this.oldPosY - this.position.y);
	console.log(this.dashDistanceY);
	
	// Dashes player down until the dashDistance is covered
	if(this.dashingDown && this.oldPosY - this.position.y < this.dashDistanceY) {
		this.body.velocity.y = 1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingDown) {
		this.dashingDown = false;
		this.justDashed = true;
	}
	
	// Dashes player up until the dashDistance is covered
	if(this.dashingUp && this.oldPosY - this.position.y > this.dashDistanceY) {
		this.body.velocity.y = -1000;
	}
	// End the dash after the distance has been covered
	else if(this.dashingUp) {
		this.dashingUp = false;
		this.justDashed = true;
	}
	
	/*
	 * END HORIZONTAL DASHING
	 */
	
	// Ends dash
	if(this.justDashed) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.justDashed = false;
	}
}

Player.prototype.moveRight = function() {
	// Lets player move right when they're grounded
	// Must be editted for movement in air
	if(this.body.touching.down) {		
		//  Move to the right
		this.facingForward = true;
		this.scale.x = -1/2;
		this.body.velocity.x = 300;
	}
}

Player.prototype.moveLeft = function() {
	// Lets player move left when they're grounded
	// Must be editted for movement in air
	if(this.body.touching.down) {		
		//  Move to the left
		this.facingForward = false;
		this.scale.x = 1/2;
		this.body.velocity.x = -300;
	}
}

/*
 * IS CALLED WHEN THE LEFT AND RIGHT ARROW KEYS ARE RELEASED
 */
Player.prototype.stopMovement = function() {
	var cursors = this.game.input.keyboard.createCursorKeys();	
	
	// Stops character movement when not jumping and not moving in another direction
	if(!this.jumping && !(cursors.left.isDown || cursors.right.isDown)) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
	}
}

Player.prototype.dash = function() {
	var cursors = this.game.input.keyboard.createCursorKeys();	
	
	if(cursors.right.isDown || 
	   cursors.left.isDown  || 
	   cursors.up.isDown    || 
	   cursors.down.isDown) {

		this.oldPosX = this.position.x;
		this.oldPosY = this.position.y;
		
		if(cursors.right.isDown) {
			this.dashDistanceX = -1 * this.dashDistConst;
			this.dashingRight = true;
		}
		else if(cursors.left.isDown) {
			this.dashDistanceX = this.dashDistConst;
			this.dashingLeft = true;
		}
	    else {
			this.dashDistanceX = 0;
		}
		
		if(cursors.up.isDown) {
			this.dashDistanceY = -1 * this.dashDistConst;
			this.dashingUp = true;
		}
		else if(cursors.down.isDown) {
			this.dashDistanceY = this.dashDistConst;
			this.dashingDown = true;
		}
		else {
			this.dashDistanceY = 0;
		}
	}
}

/*
 * CHECKS IF PLAYER IS DASHING OR NOT
 */
Player.prototype.isDashing = function() {
	return (this.dashingRight || this.dashingLeft || this.dashingUp || this.dashingDown);
}

/*
 * IS CALLED WHEN THE SPACEBAR IS PRESSED - JUMPS CHARACTER IF NOT JUMPING
 */
Player.prototype.jump = function() {
	// Executes if the character is not jumping
	if(!this.jumping) {
		this.jumping = true;
		// Play jump sound
		this.game.sound.play('player_jump');
		// Jumps
		this.body.velocity.y = -500;	
	}
}

/*
 * IS CALLED ON COLLISION WITH THE FLOOR - ENDS JUMP IF NOT JUMPING
 */
Player.prototype.touchDown = function() {
	if(this.jumping) {
		this.jumping = false;
		this.body.velocity.x = 0;
	}
}

/*
 * IS CALLED ON COLLISION WITH OBJECT CANCELS DASHING
 */
Player.prototype.dashCancel = function() {
	this.dashingRight = false;
	this.dashingLeft = false;
	this.dashingUp = false;
	this.dashingDown = false;
	this.justDashed = true;
}