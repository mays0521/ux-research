// This is the basic enemy
Crafty.c('BasicEnemy', {
  init: function() {
    this.attr({
      health: 5,
      speed: 2,
      fireRate: 80,
      weaponCoolDown: 0
    })
    .requires('Actor, Collision')
    .origin("center")
    .attr({
            rotation:180
        })
    .bind("EnterFrame", function() {

            if(this.y > Game.map_grid.height * Game.map_grid.tile.height)
            {
                this.destroy();
            }

    })

  },

  setSpeed: function(s){
    this.speed = s;
  },

  fire: function() {
            this.weaponCoolDown++;
            
            if(this.weaponCoolDown > this.fireRate)
            {
                Crafty.e('Weapon1').initBullet(this.x + this.w/2 - Constant.bullet_size/2,this.y + this.h + 5, -5);
                Crafty.audio.play('selfshoot1');
                this.weaponCoolDown = 0;
            }
  },

  move_down: function(){
    this.y = this.y + this.speed;
  },

  die: function(){
    this.explore();
    this.destroy();
    Attribute.total_score += 5;
  },

  move_to_player: function(s){
    if((this.x ) - (Attribute.player_position_x + 23 ) > 0){
        if((this.x ) - (Attribute.player_position_x + 23  ) > s){
        this.x -= s;
        }
        else{
            //this.x = (Attribute.player_position_x + Constant.player_width/2);
        }
    }else if ((Attribute.player_position_x + 23  ) - (this.x) > 0){
        if ((Attribute.player_position_x + 23  ) - (this.x) > s){
        this.x += s;
        }
        else{
            //this.x = (Attribute.player_position_x + Constant.player_width/2);
        }
    }
  },

  track_player: function(s){
        
      this.move_to_player(s);
      if(this.y - (Attribute.player_position_y ) > 0){
        if(this.y - (Attribute.player_position_y ) > s){
        this.y -= s;
        }
        else{
            //this.x = (Attribute.player_position_x + Constant.player_width/2);
        }
    }else if ((Attribute.player_position_y ) - this.y > 0){
        if ((Attribute.player_position_y ) - this.y > s){
        this.y += s;
        }
        else{
            //this.x = (Attribute.player_position_x + Constant.player_width/2);
        }
    }
  }


});

// This is the basic enemy
Crafty.c('Enemy1', {
  init: function() {
    this
    .requires('BasicEnemy, enemy1')
    .bind("EnterFrame", function() {
            this.move_down(); 
            this.move_to_player(this.speed/2);
            this.fire();
    })
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.hit_explore();
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            this.die();
            if(Math.random()< 0.1){
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w/2 - 16,this.y - 30, -1);
                    
            }
       }
    }) 
     .onHit("SpecialBullet",function(ent){
        if(Attribute.game_model == 3){
                Crafty.e('SmallBoss').attr({
                x: this.x,
                y: this.y,
                speed: 3,
                w: 128,
                h: 128,
                health: 100,
                fireRate: 20
            }); 
            this.destroy();
        }
       

       
    }) 
  }

});

Crafty.c('Enemy2', {
  init: function() {
    this
    .requires('BasicEnemy, enemy3')
    .bind("EnterFrame", function() {
            this.move_down(); 
            this.move_down(); 
            this.move_to_player(this.speed);
    })
    .onHit("SpecialBullet",function(ent){

       if(Attribute.game_model == 3){
                Crafty.e('SmallBoss').attr({
                x: this.x,
                y: this.y,
                speed: 3,
                w: 128,
                h: 128,
                health: 100,
                fireRate: 20
            }); 
            this.destroy();
        }
    }) 
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.hit_explore();
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            this.die();
            if(Math.random()< 0.05){
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w/2 - 16,this.y - 30, -1);
                    
            }
            
       }
    })
  }

});

Crafty.c('Enemy3', {
  init: function() {
    this
    .requires('BasicEnemy, enemy2')
    .bind("EnterFrame", function() {

            this.track_player(this.speed);
    })
    .onHit("SpecialBullet",function(ent){

       if(Attribute.game_model == 3){
                Crafty.e('SmallBoss').attr({
                x: this.x,
                y: this.y,
                speed: 3,
                w: 128,
                h: 128,
                health: 100,
                fireRate: 20
            }); 
            this.destroy();
        }
    }) 
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.hit_explore();
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            this.die();
            if(Math.random()< 0.15){
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w/2 - 16,this.y - 30, -1);
            }
            Attribute.total_score += 5;
       }
    })

  }

});

Crafty.c('SmallBoss', {
  init: function() {
    this.attr({
      w: 128,
      h: 128,
      health: 100,
      speed: 3,
      fireRate: 10
    })
    .requires('BasicEnemy, mid_monster')
    .bind("EnterFrame", function() {
            this.rotation = this.rotation + 2;
            if(this.rotataion>360)
            {
                this.rotation = 0;
            }
            this.move_around();
            this.boss_fire();
    })
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.hit_explore();
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            this.die();
            if(Math.random()< 0.5){
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w/2 - 16,this.y - 30, -1);
                    
            }
            Attribute.total_score += 100;
       }
    })
  },

  move_around: function(){
    this.x += this.speed;
    if(this.x < 64){

        this.speed = 3;
    }else if (this.x > Constant.map_width - 128){
        this.speed = -3;
    }
  },

  boss_fire: function() {
            this.weaponCoolDown++;
            
            if(this.weaponCoolDown > this.fireRate)
            {
                Crafty.e('Weapon2').init_weapon2(this.x + this.w/2 - 8,this.y + 140, -10, Crafty.math.randomInt(-10, 10));
                Crafty.audio.play('selfshoot1');
                this.weaponCoolDown = 0;
            }
  }

});

Crafty.c('BigBoss', {
  init: function() {
    this.attr({
      w: 128,
      h: 128,
      health: 300
    })
    .requires('BasicEnemy, big_monster')
    .bind("EnterFrame", function() {

            this.track_player(this.speed);
    })
    .onHit("Bullet",function(ent){
       var bullet = ent[0].obj;
       this.hurt(bullet.dmg);
       bullet.hit_explore();
       bullet.destroy(); //Destroy the bullet
       if(this.health <= 0)
       {
            this.die();
            if(Math.random()< 0.1){
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w/2 - 16,this.y - 30, -1);
                    
            }
       }
    })
  }

});

// This is the basic enemy
Crafty.c('EnemyManager', {
  init: function() {
    this.attr({
            generateFlag: true,
            delay: -1,
            dangerTime: 0
        })
        .bind("EnterFrame", function() {
                var l =  parseInt(Attribute.total_score/100) *0.1;
                this.generateEnemy(l);
                this.hugeWave(l);
                if(Math.random()< 0.001 + l* 0.001){
                    this.delay = 300;
                    if(Attribute.game_model != 2){
                        Crafty.e('Noticer').shake();		
                    }   
                    
                }
                
                if(this.delay> -1){
                    this.delay--;
                }

                if(this.delay == 0){
                    this.dangerTime = 300;
                }
                

        });
  },

  generateEnemy: function(l){
       if(Math.random()< 0.01 + l* 0.01){
            Crafty.e('Enemy1').attr({
                x: Math.random()* 960,
                y: 0,
                speed: 2 + l,
                health: 10+l

            });
       }
  },

  hugeWave: function(l){
            
            if(this.dangerTime > 0){
                this.dangerTime--;
                if(this.dangerTime%parseInt(30-l) == 0){
                    Crafty.e('Enemy2').attr({
                    x: Math.random()* 960,
                    y: 0,
                    speed: 4 + l*2,
                    health: 6 + l
                    });
                }
                if(this.dangerTime%parseInt(80-l) == 0){
                    Crafty.e('Enemy3').attr({
                    x: Math.random()* 960,
                    y:0,
                    speed: 0.5 + l,
                    health: 40 + l*10
                    });
                }

                if(Attribute.game_model != 3){
                    if(this.dangerTime%parseInt(180-l) == 0){
                        Crafty.e('SmallBoss').attr({
                            x: Math.random()* 960,
                            y: 128,
                            speed: 3,
                            w: 128,
                            h: 128,
                            health: 100,
                            fireRate: 20
                        }); 
                    }
                    
                }
            } 
            
}
});




 
