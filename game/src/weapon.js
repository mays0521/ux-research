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
    this.y = this.y - 5;
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