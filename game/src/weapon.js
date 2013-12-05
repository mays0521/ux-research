// This is the bullet
Crafty.c('Bullet', {
  dmg:0,
  firerate:0,
  init: function() {
    this
    .attr({
            speed:0
        })
    .requires('Actor, Collision')
    .bind("EnterFrame", function() {
            this.fly(); 
            if(this.y < 0)
            {
                this.destroy();
            }
            if(this.y > Constant.map_height){
                this.destroy();
            }
        })
        .onHit('Bullet',function(ent){
            this.destroy();
            ent[0].obj.destroy();
        });
  },

  fly: function(){
    this.y = this.y - this.speed;
  },

  hit_explore: function() {
        Crafty.e("BulletExplosion").attr({
                x: this.x - Constant.explosion_size/2 + this.w/2,
                y: this.y - Constant.explosion_size/2 + this.h/2
            });
  },

  initBullet: function( x, y, s) {
        this.at(x,y);
        this.speed = s;
  }
});

Crafty.c("Weapon1",{
    init:function(){
        this
        .requires("Bullet, bullet1")
        .attr({
            dmg:5,
            speed: 10
        });
    } 
});

Crafty.c("Weapon2",{
    init:function(){
        this
        .requires("Bullet, bullet3")
        .attr({
            dmg:5,
            speed: 10,
            speedx: 0
        })
        .bind("EnterFrame", function() {
            this.random_fly();
        });
    },

    random_fly: function(){
        this.x = this.x - this.speedx;
    },

    init_weapon2: function( x, y, s, sx) {
        this.initBullet(x, y, s);
        this.speedx = sx;
    }
});

Crafty.c('SpecialBullet', {
  dmg:0,
  firerate:0,
  init: function() {
    this
    .attr({
            speed:2
        })
    .requires('Actor, bullet2, Collision')
    .bind("EnterFrame", function() {
            this.fly(); 
            if(this.y < 0)
            {
                this.destroy();
            }
        })
  },

  fly: function(){
    this.y = this.y - this.speed;
  },

  initBullet: function( x, y, s) {
        this.at(x,y);
        this.speed = s;
  }
});