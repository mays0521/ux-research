Crafty.load(["game/assets/enemy.png", "game/assets/ship0.png", "game/assets/bg.png" ], function () {
    Crafty.sprite(32, 'game/assets/enemy.png', {
        spr_enemy: [0, 0]
    });

    Crafty.sprite(Constant.player_width,Constant.player_height, 'game/assets/ship0.png', {
        spr_air: [0, 0]
    });

    Crafty.sprite(960,1280, 'game/assets/bg.png', {
        spr_bg: [0, 0]
    });

	Crafty.sprite(Constant.bullet_size,13,'game/assets/images/bullet1.png', {
        bullet1:[0,0]
    });

    Crafty.sprite(128,"game/assets/explosion.png", {
        explosion1:[0,0],
        explosion2:[0,1],
        explosion3:[0,2]
    });
	Crafty.audio.add('selfshoot1', [
        'game/assets/sounds/laser1.mp3',
        'game/assets/sounds/laser1.ogg'
    ]);
	Crafty.audio.add('explode1_sound', [
        'game/assets/sounds/explode.mp3',
        'game/assets/sounds/explode.ogg'
    ]);
	Crafty.audio.add('intro', [
        'game/assets/sounds/through-space.mp3',
        'game/assets/sounds/through-space.ogg'
    ]);

});     
