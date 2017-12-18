import { Sounds } from "./Sounds.js";

export class ObjSounds extends Sounds {
    constructor(game, map, mode) {
        super();
        this.game = game;
        this.map = map;
        this.mode = mode;
        this.obj_sound_end = true;
        soundManager.setup({
            url: './soundmanager2/',
            onready: () => {
                // --------------- General Stuff ------------------
                const entering_area =  soundManager.createSound({
                    id: 'entering_area',
                    url: 'sounds/objects/entering_area.mp3'
                });
                const hitting_the_fence =  soundManager.createSound({
                    id: 'hitting_the_fence',
                    url: 'sounds/objects/hitting_the_fence.mp3'
                });
                const hitting_the_rain_fence =  soundManager.createSound({
                    id: 'hitting_the_rain_fence',
                    url: 'sounds/objects/hitting_the_rain_fence.mp3',
                    volume:50
                });
                const hitting_the_wall =  soundManager.createSound({
                    id: 'hitting_the_wall',
                    url: 'sounds/objects/hitting_the_wall.mp3'
                });
                const placing_paper =  soundManager.createSound({
                    id: 'placing_paper',
                    url: 'sounds/objects/placing_paper.mp3'
                });
                const placing_loo_paper =  soundManager.createSound({
                    id: 'placing_loo_paper',
                    url: 'sounds/objects/placing_loo_paper.mp3',
                    volume:40
                });
                const placing_bomb =  soundManager.createSound({
                    id: 'placing_bomb',
                    url: 'sounds/objects/placing_bomb.mp3'
                });
                const slashing =  soundManager.createSound({
                    id: 'slashing',
                    url: 'sounds/objects/slashing.mp3'
                });
                const killing =  soundManager.createSound({
                    id: 'killing',
                    url: 'sounds/objects/killing.mp3'
                });
                // ------------------------------------------------
            }
        });
    };

    makeSound(sound_id) {
        this.obj_sound_end = false
        super.makeSound(sound_id);
        this.checkGameEnding();
    };

    checkGameEnding() {
        console.log("To be eaten: ",this.map.people)
        if (this.map.people == 0) {
            console.log("People = 0");
            this.makeEndmode();
            soundManager.play("ghost_scream",{
                onfinish: () => {
                    this.game.game_ending = true;
                }
            });
        };
    };
};
