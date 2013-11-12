Crafty.load(["game/assets/enemy.png", "game/assets/ship0.png", "game/assets/s_bg.png", "game/assets/body-bg.jpg"], function () {
    Crafty.sprite(32, 'game/assets/enemy.png', {
        spr_enemy: [0, 0]
    });
    Crafty.sprite("game/assets/images/ships.png",{
        //Gold
        enemy1:[0,0,44,47],
        enemy2:[47,0,40,47],
        enemy3:[88,0,47,47],
        enemy4:[140,0,47,47],
        enemy5:[190,0,45,47],
        enemy6:[241,0,40,47],
        enemy7:[290,0,40,47],
        enemy8:[340,0,67,47],
        //Red
        enemy9:[0,48,44,47],
        enemy10:[47,48,40,47],
        enemy11:[88,48,47,47],
        enemy12:[140,48,47,47],
        enemy13:[190,48,45,47],
        enemy14:[241,48,40,47],
        enemy15:[290,48,40,47],
        enemy16:[340,48,67,47]
    });

    Crafty.sprite(Constant.player_width,Constant.player_height, 'game/assets/ship0.png', {
        spr_air: [0, 0]
    });

    Crafty.sprite(486,560, 'game/assets/s_bg.png', {
        spr_bg: [0, 0]
    });

    Crafty.sprite(1600, 1200, 'game/assets/body-bg.jpg', {
        start_bg: [0, 0]
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
    Crafty.audio.add('game_overV', [
        'game/assets/sounds/gameover.mp3'

    ]);

});
