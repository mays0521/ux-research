// -------------
// The start page of game
Crafty.scene('StartPage', function () {

    Crafty.e('2D, DOM, Text')
    .text('Air Compact Game')
    .attr({ x: 0, y: 150, w: Game.width() })
    .css($game_start_intro);

    Crafty.e('2D, DOM, Text')
    .text('Use Arrow Keys to move, Space to shoot')
    .attr({ x: Game.width() / 2 - 240, y: 230, w: 480 })
    .css($restart);

    var button = Crafty.e('Button');

}, function () {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    //this.unbind('KeyDown', this.restart_game);
});

// -------------
// The 1st level of game
    Crafty.scene('Level1', function () {

        Attribute.game_model = Crafty.math.randomInt(1, 3);

        Crafty.e('BGManager');

        var player = Crafty.e('Player').at(600, 310);

        var enemyManager = Crafty.e('EnemyManager');

        Crafty.e('ScoreBar');
        Crafty.e('Life');
        Crafty.e('LifeBG');
        Crafty.e('LifeBar');

        Crafty.e('Timer');



        this.lose = this.bind('EnterFrame', function () {

            if (Attribute.player_life <= 0) {
                Attribute.player_life--;
            }
            if (Attribute.player_life <= -100) {
                Attribute.total_score = 0;
                enemyManager.destroy();
                Crafty.scene('EndPage');
            }
        });

    }, function () {
        // Remove our event binding from above so that we don't
        //  end up having multiple redundant event watchers after
        //  multiple restarts of the game
        this.unbind('EnterFrame', this.lose);
    });




// -------------
// The end page of game
    Crafty.scene('EndPage', function () {
//		Crafty.audio.play('game_over');

        Crafty.e('2D, DOM, Text')
        .text('Game Over')
        .attr({ x: Game.width()/2-150, y: 250, w: 300 })
        .css($restart);

        Crafty.e('2D, DOM, Color, Text, Mouse')
            .text('TRY AGAIN')
            .attr({ x: Game.width() / 2 - 150, y: 350, w: 300 })
            .bind('MouseDown', function () { Crafty.scene('Level1') })
            .bind('MouseOver', function () { this.color('#B31B34') })
            .bind('MouseOut', function () { this.color('black') })
            .areaMap([0, 0], [35 * 16, 0], [35 * 16, 60 * 16], [0, 60 * 16])
            .css($startBtn);

        this.end_page = this.bind('KeyDown', function (e) {

//            if (e.keyCode === Crafty.keys.R) {
//                Crafty.scene('Level1');
//            } else {
                Attribute.game_over = true;
                this.destroy();
//            }
        });

    }, function () {
        // Remove our event binding from above so that we don't
        //  end up having multiple redundant event watchers after
        //  multiple restarts of the game
        this.unbind('KeyDown', this.end_page);
    });