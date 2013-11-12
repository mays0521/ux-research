// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('BaseUnit', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height,
      x: 0,
      y: 0
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    this.x = x;
    this.y = y;
  }
   
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, BaseUnit')  
  },

  setHealth: function(h) {
        this.health = h;
  },

  hurt: function(dmg) {
        this.health -= dmg;
  },
  
  explore: function() {
        Crafty.e("RandomExplosion").attr({
                x: this.x - Constant.explosion_size/2 + this.w/2,
                y: this.y - Constant.explosion_size/2 + this.h/2
            });
  },

  exploreAt: function(x1, y1) {
        Crafty.e("RandomExplosion").attr({
                x: x1 - Constant.explosion_size/2 + this.w/2,
                y: y1 - Constant.explosion_size/2 + this.h/2
            });
		
  },
});

// The total score bar
Crafty.c('ScoreBar', {
  init: function() {
    this.requires('2D, DOM, Text')  
    .text('Total Score: ' + Attribute.total_score)
    .attr({ x: 0, y: 0, w: Game.width()/4 })
    .css($text_css)
    .bind("EnterFrame", function() {
        this.text('Total Score: ' + Attribute.total_score);
    });
  },   
});

//  life bar
Crafty.c('Life', {
  init: function() {
    this.requires('2D, DOM, Text') 
	.text('Life:')
    .attr({ x: 380, y: 0, })
    .css($text_css) 
    
  },   
});
Crafty.c('LifeBG', {
  init: function() {
    this.requires('2D, DOM, Text')  
    .attr({ x: 430, y: 0, w: 100, h: 30 })
    .css($life_bg)
    
  },   
});
Crafty.c('LifeBar', {
  init: function() {
    this.requires('2D, DOM, Text')  
    .attr({ x: 430, y: 0, w: 0, h: 30 })
    .css($life_bar)
    .bind("EnterFrame", function() {
        this.w=Attribute.player_life*5;
    });
  },   
});

//  Timer
Crafty.c('Timer', {
  
  init: function() {
    this.requires('2D, DOM, Text')  
    .attr({ x: 600, y: 0, w: Game.width()/4, h: 30, s:0, ms:0 })
    .text('Game Time: ')
    .css($text_css)
    .bind("EnterFrame", function() {
        this.ms++;
        if(this.ms>99){
            this.s++;
            this.ms = 0;
        }
        this.text('Game Time:     ' + this.s + ':' + this.ms);
        Attribute.total_time = this.s + this.ms/100
    });
  },   

});

//  Noticer
Crafty.c('Noticer', {
  
  init: function() {
    this.requires('2D, DOM, Text')  
    .attr({ x: 0, y: Constant.map_height/2, w: Constant.map_width, showTime: 300 })
    .text('some notice')
    .css($game_start_intro)
    .bind("EnterFrame", function() {
        this.show();
    });
  },   
  setText: function(x) {
        this.text(x);
  },

  show: function() {
        this.showTime --;
        if(this.showTime <=0 )
        {
            this.destroy();
        }
  },
});



