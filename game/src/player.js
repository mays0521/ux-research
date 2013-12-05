Crafty.c('Player', {
    init: function () {

        this.attr({
            health: 20,
            w: Constant.player_width,
            h: Constant.player_height,
            speed: 4,
            fireKey: false,
            upKey: false,
            downKey: false,
            leftKey: false,
            rightKey: false,
            fireRate: 4,
            WeaponLevel: 1,
            weaponCoolDown: 0
        })
            .requires('Actor, spr_air, Collision')
            //Describe behavior on getting hitted by enemy
            .onHit("BasicEnemy", function (ent) {
                var Enemy = ent[0].obj;
                this.hurtByEnemy(Enemy.health);
                Crafty.e('Flicker');
                Enemy.die(); //Destroy the bullet
            })
            .onHit("Bullet", function (ent) {
                var bullet = ent[0].obj;
                this.hurt(bullet.dmg);
                bullet.hit_explore();
                Crafty.e('Flicker');
                bullet.destroy(); //Destroy the bullet

            })
            .onHit("SpecialBullet", function (ent) {
                var SpecialBullet = ent[0].obj;
                SpecialBullet.destroy();

                if (this.WeaponLevel < 3) {
                    this.WeaponLevel++;
                }

                Attribute.total_score += 30;

            })
            .bind("KeyDown", function (e) {
                if (e.keyCode === Crafty.keys.SPACE) {
                    this.fireKey = true;

                }
                if (e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.leftKey = true;
                } else if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.rightKey = true;
                } else if (e.keyCode === Crafty.keys.UP_ARROW) {
                    this.upKey = true;
                } else if (e.keyCode === Crafty.keys.DOWN_ARROW) {
                    this.downKey = true;
                }
            })
            .bind("KeyUp", function (e) {
                if (e.keyCode === Crafty.keys.SPACE) {
                    this.fireKey = false;
                }
                if (e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.leftKey = false;
                } else if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.rightKey = false;
                } else if (e.keyCode === Crafty.keys.UP_ARROW) {
                    this.upKey = false;
                } else if (e.keyCode === Crafty.keys.DOWN_ARROW) {
                    this.downKey = false;
                }
            })
            .bind("EnterFrame", function () {
                Attribute.player_position_x = this.x;
                Attribute.player_position_y = this.y;
                Attribute.player_life = this.health;
                this.movement();
                this.fire();
                if (this.health <= 0) {
                    Attribute.player_life = this.health;
                    this.die();
                    // pass value to angular app
                    this.passValue();
                }
            })
    },

    fire: function () {
        if (this.fireKey == true) {
            this.weaponCoolDown++;

            if (this.weaponCoolDown > this.fireRate) {
                if (Math.random() < 0.03 && Attribute.game_model == 3) {
                    Crafty.e('SpecialBullet').initBullet(this.x + this.w / 2 - 16, this.y - 60, 10);
                } else if (this.WeaponLevel == 1) {
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2, this.y - 20, 10);
                } else if (this.WeaponLevel == 2) {
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2, this.y - 20, 10);
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2 + 20, this.y - 20, 10);
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2 - 20, this.y - 20, 10);
                } else if (this.WeaponLevel == 3) {
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2, this.y - 20, 10);
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2 + 20, this.y - 20, 10);
                    Crafty.e('Weapon1').initBullet(this.x + this.w / 2 - Constant.bullet_size / 2 - 20, this.y - 20, 10);
                    Crafty.e('Weapon2').init_weapon2(this.x + this.w / 2 - 8 - 60, this.y - 40, 10, 5);
                    Crafty.e('Weapon2').init_weapon2(this.x + this.w / 2 - 8 + 60, this.y - 40, 10, -5);
                }

                Crafty.audio.play('selfshoot1');
                this.weaponCoolDown = 0;

            }
        }
    },

    die: function () {
        this.destroy();

        this.explore();
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y + Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y + Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y + Crafty.math.randomInt(-100, 100));
        this.exploreAt(this.x + Crafty.math.randomInt(-100, 100), this.y + Crafty.math.randomInt(-100, 100));
    },

    movement: function () {
        if (this.leftKey == true) {
            this.x -= this.speed;
        }
        if (this.rightKey == true) {
            this.x += this.speed;
        }
        if (this.upKey == true) {
            this.y -= this.speed;
        }
        if (this.downKey == true) {
            this.y += this.speed;
        }
        this.stayInMap();
    },

    // Stops the movement
    stayInMap: function () {
        if (this.x > Constant.map_width - this.w)
            this.x = Constant.map_width - this.w;
        if (this.x < 0)
            this.x = 0;
        if (this.y > Constant.map_height - this.h)
            this.y = Constant.map_height - this.h;
        if (this.y < 0)
            this.y = 0;
    },

    hurtByEnemy: function (dmg) {
        this.hurt(dmg);
        Crafty.e('Flicker');
    },

    // pass value to angular app
    passValue: function () {
        var scope = angular.element($("#cr-stage")).scope();
        scope.$apply(function(){
            scope.score = Attribute.total_score;
            scope.time = Attribute.total_time;
            scope.model = Attribute.game_model;
        });
    }
});