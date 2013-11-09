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

