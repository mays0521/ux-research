Crafty.c('Player', {
  init: function() {
    this.attr({
      health: 20,
      w: Constant.player_width,
      h: Constant.player_height,
      speed: 4
    })
    .requires('Actor, spr_air, Fourway, Collision')
    .fourway(4)
    .bind("KeyDown", function(e) {
            if(e.keyCode === Crafty.keys.SPACE){
                this.fire();
            } 
        })
	.bind("EnterFrame", function() {
            Attribute.player_position_x = this.x;
            Attribute.player_position_y = this.y;
            this.movement();
    })
    //Describe behavior on getting hitted by Player Bullet
    .onHit("BasicEnemy",function(ent){
       var Enemy = ent[0].obj;
       this.hurt(Enemy.health);
       Enemy.die(); //Destroy the bullet
       if(this.health <= 0)
       {
           this.die();
           this.passValue();
       }
    })  
  },
  fire: function() {
        Crafty.e('Weapon1').at(this.x + this.w/2 - Constant.bullet_size/2,this.y);
        Crafty.audio.play('selfshoot1');
  },
  die: function() {
        this.destroy();
        this.explore();
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y +  Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y +  Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y +  Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y +  Crafty.math.randomInt(-100, 100));
  },

  movement: function() {
        this.stayInMap();
  },

  // Stops the movement
	stayInMap: function() {
		if(this.x > Constant.map_width - this.w)
            this.x = Constant.map_width - this.w;
        if(this.x < 0)
            this.x = 0;
        if(this.y > Constant.map_height - this.h)
            this.y = Constant.map_height - this.h;
        if(this.y < 0)
            this.y = 0;
	},

    // pass value to angular app
    passValue: function () {
        var scope = angular.element($("#cr-stage")).scope();
        scope.$apply(function(){
            scope.score = Attribute.total_score;
        })
    }
});