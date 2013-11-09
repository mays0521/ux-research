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



