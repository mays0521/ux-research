Crafty.c("RandomExplosion", {
    init: function () {
        var rand = Crafty.math.randomInt(1, 3);
        this.addComponent("2D", "Canvas", "explosion" + rand, "SpriteAnimation")
        .animate("explode1", 0, 0, Crafty.math.randomInt(6, 16))
        .animate("explode2", 0, 1, Crafty.math.randomInt(6, 16))
        .animate("explode3", 0, 2, Crafty.math.randomInt(6, 16))

        .animate("explode" + rand, Crafty.math.randomInt(6, 16), 0)
        .bind("AnimationEnd", function () {
            this.destroy();
        });
		Crafty.audio.play('explode1_sound');

    }
});

Crafty.c("BulletExplosion", {
    init: function () {
        this.addComponent("2D", "Canvas", "explosion1" , "SpriteAnimation")
        .animate("explode1", 0, 0, 1)

        .animate("explode1", 3, 2)
        .bind("AnimationEnd", function () {
            this.destroy();
        });

    }
});

Crafty.c('Grid', {
    init: function () {
        this.attr({
            w: Constant.map_width,
            h: Constant.map_height
        })
    }

});

Crafty.c("Flicker", {
    flicker: true,
    init: function () {
        this.attr({
            timer: 5
        })
        .requires('2D, Canvas, Grid, Color')
        .color('rgb(125, 125, 125)')
        .bind("EnterFrame", function (frame) {
            if (frame.frame % 5 == 0 && this.flicker) {
                if (this.alpha == 0.0) {
                    this.alpha = 1.0;
                } else {
                    this.alpha = 0.0;
                }
            }
            if (!this.flicker) {
                this.alpha = 1.0;
            }
            this.timer--;
            if (this.timer < 0) {
                this.destroy();
            }
        });
        this.flicker = true;

    },

    setTimer: function (t) {
        this.timer = t;
    }

});

