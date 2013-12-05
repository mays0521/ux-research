$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };  

$life_bg = {'background':'white', 'border':'1px solid silver'};
$life_bar = {'background':'#B31B34'};

$game_start_intro = {'font-size': '48px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };

$game_over = {'font-size': '50px', 'font-family': 'Arial', 'color': 'red', 'text-align': 'center' };

$restart ={'background':'#E0E5B7', 'color': '#4C5873', 'border':'silver 1px solid', '-webkit-box-shadow': '0 0 10px #555','-moz-border-radius': '10px','border-radius': '10px', 'alignment-adjust':'central', 'font-size':'20px', 'padding':'10px', 'text-align': 'center'};

$notice={'font-size': '40px', 'color': 'red', 'text-align': 'center', 'display': 'none'}

$startBtn = {
    'display': 'inline-block',
    'padding': '20px 12px',
    'font-size': '25px',
    'font-weight': '700',
    'cursor': 'pointer',
    'border': '1px solid #3C3C3C',
    'border-radius': '4px',
    'color': '#FFFFFF',
    'text-align': 'center'
};

Crafty.load(["game/assets/ship0.png", "game/assets/s_bg.png", "game/assets/body-bg.jpg", "game/assets/mid_monster.png", "game/assets/big_monster.png"], function () {
//    Crafty.sprite(32, 'game/assets/enemy.png', {
//        spr_enemy: [0, 0]
//    });
    Crafty.sprite("game/assets/images/ships.png", {
        //Gold
        enemy1: [0, 0, 44, 47],
        enemy2: [47, 0, 40, 47],
        enemy3: [88, 0, 47, 47],
        enemy4: [140, 0, 47, 47],
        enemy5: [190, 0, 45, 47],
        enemy6: [241, 0, 40, 47],
        enemy7: [290, 0, 40, 47],
        enemy8: [340, 0, 67, 47],
        //Red
        enemy9: [0, 48, 44, 47],
        enemy10: [47, 48, 40, 47],
        enemy11: [88, 48, 47, 47],
        enemy12: [140, 48, 47, 47],
        enemy13: [190, 48, 45, 47],
        enemy14: [241, 48, 40, 47],
        enemy15: [290, 48, 40, 47],
        enemy16: [340, 48, 67, 47]
    });

	Crafty.sprite(20,20,"game/assets/star.png", {
              star:[0,0]
          });
	Crafty.sprite(20,20,"game/assets/star1.png", {
              star1:[0,0]
          });
		  
    Crafty.sprite("game/assets/mid_monster.png", {
        mid_monster: [0, 0, 128, 128]
    });

    Crafty.sprite("game/assets/big_monster.png", {
        big_monster: [0, 0, 128, 128]
    });

    Crafty.sprite(Constant.player_width, Constant.player_height, 'game/assets/ship0.png', {
        spr_air: [0, 0]
    });

     Crafty.sprite(960, 560, 'game/assets/star-bg.png', {
        spr_bg: [0, 0]
    });

    Crafty.sprite(1600, 1200, 'game/assets/body-bg.jpg', {
        start_bg: [0, 0]
    });

    Crafty.sprite(Constant.bullet_size, 13, 'game/assets/images/bullet1.png', {
        bullet1: [0, 0]
    });

    Crafty.sprite(32, 32, 'game/assets/images/bullet2.png', {
        bullet2: [0, 0]
    });

    Crafty.sprite(16, 16, 'game/assets/images/bullet3.png', {
        bullet3: [0, 0]
    });

    Crafty.sprite(128, "game/assets/explosion.png", {
        explosion1: [0, 0],
        explosion2: [0, 1],
        explosion3: [0, 2]
    });
    Crafty.audio.add('selfshoot1', [
              'game/assets/sounds/laser1.mp3',
              'game/assets/sounds/laser1.ogg'
          ]);
    Crafty.audio.add('explode1_sound', [
              'game/assets/sounds/explode.mp3',
              'game/assets/sounds/explode.ogg'
          ]);


});

