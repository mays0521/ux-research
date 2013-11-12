// This is the basic enemy
Crafty.c('BasicEnemy', {
  init: function() {
    this.attr({
      health: 5,
      speed: 2
    })
    .requires('Actor, Collision')
	.origin("center")
        .attr({
            rotation:180,
            y:-this.h,
            x:Crafty.math.randomInt(this.w,Crafty.viewport.width - this.w)
        })
    //Describe behavior on getting hitted by Player Bullet
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       Attribute.total_score += bullet.dmg;
       bullet.hit_explore();
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
    
  },

  move_to_player: function(){
    if(this.x - (Attribute.player_position_x + Constant.player_width/2) > 0){
        if(this.x - (Attribute.player_position_x + Constant.player_width/2) > this.speed){
        this.x -= this.speed;
        }else
        this.x = (Attribute.player_position_x + Constant.player_width/2);
    }else if ((Attribute.player_position_x + Constant.player_width/2) - this.x > 0){
        if ((Attribute.player_position_x + Constant.player_width/2) - this.x > this.speed){
        this.x += this.speed;
        }else
        this.x = (Attribute.player_position_x + Constant.player_width/2);
    }
  },


});

// This is the basic enemy
Crafty.c('Enemym1', {
  init: function() {
    this
    .requires('BasicEnemy, enemy1')
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

Crafty.c('Enemym2', {
  init: function() {
    this
    .requires('BasicEnemy, enemy3')
    .bind("EnterFrame", function() {
            this.move_down(); 
            this.move_to_player();
            if(this.y > Game.map_grid.height * Game.map_grid.tile.height)
            {
                this.destroy();
            }
    })
  },

  track_player: function(){
    if(this.x > Attribute.player_position_x){
        this.x -= this.speed;
    }else if (this.x < Attribute.player_position_x){
        this.x += this.speed;
    }

    if(this.y > Attribute.player_position_y){
        this.y -= this.speed;
    }else if (this.y < Attribute.player_position_y){
        this.y += this.speed;
    }
  },

});

Crafty.c('Enemym3', {
  init: function() {
    this
    .requires('BasicEnemy, enemy2')
    .bind("EnterFrame", function() {

            this.track_player();
            if(this.y > Game.map_grid.height * Game.map_grid.tile.height)
            {
                this.destroy();
            }
    })
  },

  track_player: function(){
    if(this.x > Attribute.player_position_x){
        this.x -= this.speed;
    }else if (this.x < Attribute.player_position_x){
        this.x += this.speed;
    }

    if(this.y > Attribute.player_position_y){
        this.y -= this.speed;
    }else if (this.y < Attribute.player_position_y){
        this.y += this.speed;
    }
  },

});

// This is the basic enemy
Crafty.c('EnemymManager', {
  init: function() {
    this.attr({
            delay: -1
        })
        .bind("EnterFrame", function() {
                l =  parseInt(Attribute.total_score/100) *0.1;
                this.generateEnemy(l);

                if(Math.random()< 0.001 + l* 0.001){
                    this.delay = 100;
                    if(Attribute.game_model != 2){
                        Crafty.e('Noticer').setText('Danger!!!!!');
                    }
                    
                }
                
                if(this.delay> -1){
                    this.delay--;
                }

                if(this.delay == 0){
                    this.hugeWave(l);
                }
                

        });
  },

  generateEnemy: function(l){
       if(Math.random()< 0.01 + l* 0.01){
            Crafty.e('Enemym1').attr({
                x: Math.random()* 960,
                y: 0,
                speed: 2 + l,

            });
       }
  },

  hugeWave: function(l){
            

            for (var i = 0; i < 5 + l*10; i++) {
                Crafty.e('Enemym2').attr({
                x: Math.random()* 960,
                y: 0,
                speed: 4 + l*2,
                health: 3,
                });
            }   
            
            for (var j = 0; j < 1 + l*10; j++) {
                Crafty.e('Enemym3').attr({
                x: Math.random()* 960,
                y:50,
                speed: 1 + l,
                health: 30 + l*10,
                });   
   }
},



});




 
