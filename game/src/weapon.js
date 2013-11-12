// This is the bullet
Crafty.c('Bullet', {
  dmg:0,
  firerate:0,
  init: function() {
    this.requires('Actor, bullet1, "Collision"')
    .bind("EnterFrame", function() {
            this.move_up(); 
            if(this.y < 0)
            {
                this.destroy();
            }
        });
  },

  move_up: function(){
    this.y = this.y - 10;
  },

  hit_explore: function() {
        Crafty.e("BulletExplosion").attr({
                x: this.x - Constant.explosion_size/2 + this.w/2,
                y: this.y - Constant.explosion_size/2 + this.h/2
            });
  },
});

Crafty.c("Weapon1",{
    init:function(){
        this
        .addComponent("Bullet")
        .origin("center")
        .attr({
            dmg:5
        });
    } 
});