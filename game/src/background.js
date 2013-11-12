
Crafty.c('BackGround', {
  init: function() {
    this.requires('Actor, spr_bg')  
        this.attr({
            speed: 3,

        })
        .bind("EnterFrame", function() {
            this.move_down(); 
            if(this.y > 560)
            {
                this.y = -560 + this.speed;
            }
        });
  },

  move_down: function() {
        this.y += this.speed;
  },
  

});

Crafty.c('BGManager', {
  init: function() {
        
    var bg1 = Crafty.e('BackGround').at(0, 0);
    var bg2 = Crafty.e('BackGround').at(0, 560);
  },

});

Crafty.c('StartPage', {
  init: function() {
    this.requires('Actor, start_bg')  
  },

});