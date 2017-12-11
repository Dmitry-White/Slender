export class Sounds{
    constructor() {
        this.sound_end = true;
        soundManager.setup({
            url: './soundmanager2/',
            onready: function() {
                // ------------------ Menu ------------------------
                let piano_menu_ambient =  soundManager.createSound({
                    id: 'piano_menu_ambient',
                    url: 'sounds/ambient/piano_menu_ambient.mp3'
                });
                let static_menu_ambient =  soundManager.createSound({
                    id: 'static_menu_ambient',
                    url: 'sounds/ambient/static_menu_ambient.mp3'
                });
                let slender_logo_hover =  soundManager.createSound({
                    id: 'slender_logo_hover',
                    url: 'sounds/menu/slender_logo_hover.mp3'
                });
                let play_button_hover =  soundManager.createSound({
                    id: 'play_button_hover',
                    url: 'sounds/menu/play_button_hover.mp3'
                });
                let ho_ho_ho =  soundManager.createSound({
                    id: 'ho_ho_ho',
                    url: 'sounds/menu/ho_ho_ho.mp3'
                });
                // ------------------------------------------------

                // --------------- Winter Mode --------------------
                let wind_ambient =  soundManager.createSound({
                    id: 'wind_ambient',
                    url: 'sounds/ambient/wind_ambient.mp3'
                });
                let forward_step =  soundManager.createSound({
                    id: 'forward_step',
                    url: 'sounds/walking/forward_step.mp3'
                });
                let backward_step =  soundManager.createSound({
                    id: 'backward_step',
                    url: 'sounds/walking/backward_step.mp3'
                });
                let dodge_step_0 =  soundManager.createSound({
                    id: 'dodge_step_0',
                    url: 'sounds/walking/dodge_step_0.mp3'
                });
                let dodge_step_1 =  soundManager.createSound({
                    id: 'dodge_step_1',
                    url: 'sounds/walking/dodge_step_1.mp3'
                });
                let running =  soundManager.createSound({
                    id: 'running',
                    url: 'sounds/walking/running.mp3'
                });
                // ------------------------------------------------

                // --------------- General Stuff-------------------
                let entering_area =  soundManager.createSound({
                    id: 'entering_area',
                    url: 'sounds/objects/entering_area.mp3'
                });
                let hitting_the_fence =  soundManager.createSound({
                    id: 'hitting_the_fence',
                    url: 'sounds/objects/hitting_the_fence.mp3'
                });
                let hitting_the_wall =  soundManager.createSound({
                    id: 'hitting_the_wall',
                    url: 'sounds/objects/hitting_the_wall.mp3'
                });
                let placing_paper =  soundManager.createSound({
                    id: 'placing_paper',
                    url: 'sounds/objects/placing_paper.mp3'
                });
                let placing_loo_paper =  soundManager.createSound({
                    id: 'placing_loo_paper',
                    url: 'sounds/objects/placing_loo_paper.mp3'
                });
                let placing_bomb =  soundManager.createSound({
                    id: 'placing_bomb',
                    url: 'sounds/objects/placing_bomb.mp3'
                });
                // ------------------------------------------------

            },
        });
    };

    loopSound(sound_id) {
        soundManager.play(sound_id,{
            multiShotEvents: true,
            onfinish: ()=> {
                this.loopSound(sound_id);
            }
        });
    };

    makeSound(sound_id) {
        self = this;
        self.sound_end = false;
        soundManager.play(sound_id,{
            multiShotEvents: true,
            onfinish: ()=> {
                self.sound_end = true;
            }
        });
    };

}
