// -------------
// The start page of game
Crafty.scene('StartPage', function () {
    
    Crafty.e('2D, DOM, Text')
    .text('FE Air Compact')
    .attr({ x: 0, y: 150, w: Game.width() })
    .css($game_start_intro);

    Crafty.e('2D, DOM, Text')
    .text('Press Any key to start')
    .attr({ x: Game.width()/2-150, y: 350, w: 300 })
    .css($restart);

    this.restart_game = this.bind('KeyDown', function () {

        Crafty.scene('Level1');
    });

    }, function () {
        // Remove our event binding from above so that we don't
        //  end up having multiple redundant event watchers after
        //  multiple restarts of the game
        this.unbind('KeyDown', this.restart_game);
    });

// -------------
// The 1st level of game
    Crafty.scene('Level1', function () {

        Attribute.game_model = 1;

        Crafty.e('BGManager');

        var player = Crafty.e('Player').at(0, 310);

        Crafty.e('EnemymManager');

        Crafty.e('ScoreBar');
		Crafty.e('Life');
		Crafty.e('LifeBG');
        Crafty.e('LifeBar');

        Crafty.e('Timer');

        this.lose = this.bind('EnterFrame', function () {

            if (Attribute.player_life <= 0) {
                Attribute.total_score = 0;
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
		Crafty.audio.play('game_overV');

        Crafty.e('2D, DOM, Text')
    .text('Press R to Restart Game!')
    .attr({ x: Game.width()/2-150, y: 250, w: 300 })
    .css($restart);

        Crafty.e('2D, DOM, Text')
    .text('Press other key to end game')
    .attr({ x: Game.width()/2-200, y: 350, w: 400  })
    .css($restart);

        this.end_page = this.bind('KeyDown', function (e) {
            if (e.keyCode === Crafty.keys.R) {
                Crafty.scene('Level1');
            } else {
                Attribute.game_over = true;
                this.destroy();
            }
        });

    }, function () {
        // Remove our event binding from above so that we don't
        //  end up having multiple redundant event watchers after
        //  multiple restarts of the game
        this.unbind('KeyDown', this.end_page);
    });