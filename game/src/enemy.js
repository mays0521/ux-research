// This is the basic enemy
Crafty.c('BasicEnemy', {
  init: function() {
    this.attr({
      health: 5,
      speed: 2
    })
    .requires('Actor, spr_enemy, Collision')
    //Describe behavior on getting hitted by Player Bullet
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            
            this.die();
            
       }
    })  
    

  },

  setSpeed: function(s){
    this.speed = s;
  },

  move_down: function(){
    this.y = this.y + this.speed;
  },

  die: function(){
    this.explore();
    this.destroy();
    Attribute.total_score += 5;
  },

  move_to_player: function(){
    if(this.x > Attribute.player_position_x){
        this.x -= this.speed;
    }else if (this.x < Attribute.player_position_x){
        this.x += this.speed;
    }
  },


});

// This is the basic enemy
Crafty.c('Enemym1', {
  init: function() {
    this
    .requires('BasicEnemy')
    .bind("EnterFrame", function() {
            this.move_down(); 
            this.move_to_player();
            if(this.y > Game.map_grid.height * Game.map_grid.tile.height)
            {
                this.destroy();
            }
    })
  },

});

// This is the basic enemy
Crafty.c('EnemymManager', {
  init: function() {
    this
    .bind("EnterFrame", function() {

                this.GenerateEnemy();
        });
  },

  GenerateEnemy: function(){
       if(Math.random()< 0.01){
            Crafty.e('Enemym1').attr({
                x: Math.random()* 960,
                y: 0,
                speed: 2
            });
       }
  },

  HugeWave: function(){
       if(Crafty.math.randomInt(1, 10000) < 2){
//            for(var i = 0; i < Game.map_grid.width; i++){
//                Crafty.e('Enemym1').attr({
//                x: Math.random()* 960,
//                y: 0,
//                speed£º10
//                });
//            }
            
       }
  },

});




 
