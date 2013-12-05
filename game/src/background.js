
Crafty.c('BackGround', {
  init: function() {
    this.requires('Actor, spr_bg')  
        this.attr({
            speed: 0.5
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
  }
  

});

Crafty.c('BGManager', {
  init: function() {
        
    var bg1 = Crafty.e('BackGround').at(0, 0);
    var bg2 = Crafty.e('BackGround').at(0, 560);
	var bg3 = Crafty.e('Star').at(100,89);
	var bg4 = Crafty.e('Star').at(550,100);
	var bg5 = Crafty.e('Star').at(256,357);
	var bg6 = Crafty.e('Star').at(800,500);
	var bg7 = Crafty.e('Star').at(609,260);
	var bg8 = Crafty.e('Star').at(460,360);
	var bg9 = Crafty.e('Star1').at(333, 454);
    var bg10 = Crafty.e('Star1').at(758, 59); 
	var bg11 = Crafty.e('Star1').at(2, 4);
    var bg12 = Crafty.e('Star1').at(145, 80); 
	var bg14 = Crafty.e('Star').at(780,150);
	var bg16 = Crafty.e('Star').at(670,50);
	var bg18 = Crafty.e('Star1').at(500, 31);
    var bg19 = Crafty.e('Star1').at(300, 50);
  }

});

Crafty.c('StartPage', {
  init: function() {
    this.requires('Actor, start_bg')  
  }

});

Crafty.c('Star', {
  init: function() {
    this.requires('Actor, star')  
        this.attr({
			w:12,
			h:12,
			i_st:0,
			s_speed:1
			
        })
        .bind("EnterFrame", function() {
            
			this.star_shining(); 
        });
  },

  star_shining: function(){
	  
	  var i=this.i_st%7;
	  
	  switch(i){
	  	case 0:
			this.w=this.w+((this.s_speed%5)==0?5:0);
			this.h=this.h+((this.s_speed%5)==0?5:0);
			this.s_speed++;
			  break;
		case 1: 
			this.w=this.w+((this.s_speed%5)==0?5:0);
			this.h=this.h+((this.s_speed%5)==0?5:0);
			this.s_speed++;
			  break; 
		case 2:  
			this.w=this.w+((this.s_speed%5)==0?5:0);
			this.h=this.h+((this.s_speed%5)==0?5:0);
			this.s_speed++;
			  break;
		case 3:  
			this.w=this.w+((this.s_speed%5)==0?-5:0);
			this.h=this.h+((this.s_speed%5)==0?-5:0);
			this.s_speed++;
			  break;
		case 4:  
			this.w=this.w+((this.s_speed%5)==0?-5:0);
			this.h=this.h+((this.s_speed%5)==0?-5:0);
			this.s_speed++;
			  break;
		case 5:  
			this.w=this.w+((this.s_speed%5)==0?-5:0);
			this.h=this.h+((this.s_speed%5)==0?-5:0);
			this.s_speed++;
			  break;
		default: break;
	  
	  }
	 
		  this.i_st++;
	  
  }

});
Crafty.c('Star1', {
  init: function() {
    this.requires('Actor, star1')  
        this.attr({
            
			w:16,
			h:16,
			i_st:0,
			s_speed:5,

           speed:1

        })
        .bind("EnterFrame", function() {
            this.star_shining(); 
            this.move_down(); 
            if(this.y > 560||this.x>960)
            {
                this.y = -560 + this.speed;
				this.x = -960 + this.speed;
            }
        });
  },

  move_down: function() {
        this.y += this.speed;
		this.x +=this.speed*1.3;
  },

  star_shining: function(){
	  
	  var i=this.i_st%7;
	  
	  switch(i){
	  	case 0:
			this.w=this.w+((this.s_speed%5)==0?7:0);
			this.h=this.h+((this.s_speed%5)==0?7:0);
			this.s_speed++;
			  break;
		case 1: 
			this.w=this.w+((this.s_speed%5)==0?7:0);
			this.h=this.h+((this.s_speed%5)==0?7:0);
			this.s_speed++;
			  break; 
		case 2:  
			this.w=this.w+((this.s_speed%5)==0?7:0);
			this.h=this.h+((this.s_speed%5)==0?7:0);
			this.s_speed++;
			  break;
		case 3:  
			this.w=this.w+((this.s_speed%5)==0?-7:0);
			this.h=this.h+((this.s_speed%5)==0?-7:0);
			this.s_speed++;
			  break;
		case 4:  
			this.w=this.w+((this.s_speed%5)==0?-7:0);
			this.h=this.h+((this.s_speed%5)==0?-7:0);
			this.s_speed++;
			  break;
		case 5:  
			this.w=this.w+((this.s_speed%5)==0?-7:0);
			this.h=this.h+((this.s_speed%5)==0?-7:0);
			this.s_speed++;
			  break;
		default: break;
	  
	  }	 
		  this.i_st++;	  
  }

});