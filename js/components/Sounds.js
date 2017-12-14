export class Sounds{
    constructor() {
        this.sound_end = true;
        this.obj_sound_end = true;
        this.noises_end = true;
        this.noises = {
            0: 'ghost_in_the_house',
            1: 'just_horror_ambient',
            2: 'weird_noises',
            3: 'scary_piano'
        }
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
                    url: 'sounds/ambient/static_menu_ambient.mp3',
                    volume: 50,
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
                let about_us =  soundManager.createSound({
                    id: 'about_us',
                    url: 'sounds/menu/about_us.mp3'
                });
                let about_game =  soundManager.createSound({
                    id: 'about_game',
                    url: 'sounds/menu/about_game.mp3'
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

                // --------------- Vanilla Mode -------------------
                let rain_ambient =  soundManager.createSound({
                    id: 'rain_ambient',
                    url: 'sounds/ambient/rain_ambient.mp3',
                    volume: 70
                });
                let rain_forward_step =  soundManager.createSound({
                    id: 'rain_forward_step',
                    url: 'sounds/walking/rain_forward_step.mp3'
                });
                let rain_backward_step =  soundManager.createSound({
                    id: 'rain_backward_step',
                    url: 'sounds/walking/rain_backward_step.mp3'
                });
                let rain_step =  soundManager.createSound({
                    id: 'rain_step',
                    url: 'sounds/walking/rain_step.mp3'
                });
                let rain_dodge_step_0 =  soundManager.createSound({
                    id: 'rain_dodge_step_0',
                    url: 'sounds/walking/rain_dodge_step_0.mp3'
                });
                let rain_dodge_step_1 =  soundManager.createSound({
                    id: 'rain_dodge_step_1',
                    url: 'sounds/walking/rain_dodge_step_1.mp3'
                });
                let rain_running =  soundManager.createSound({
                    id: 'rain_running',
                    url: 'sounds/walking/rain_running.mp3'
                });
                // ------------------------------------------------

                // --------------- General Stuff ------------------
                let entering_area =  soundManager.createSound({
                    id: 'entering_area',
                    url: 'sounds/objects/entering_area.mp3'
                });
                let hitting_the_fence =  soundManager.createSound({
                    id: 'hitting_the_fence',
                    url: 'sounds/objects/hitting_the_fence.mp3'
                });
                let hitting_the_rain_fence =  soundManager.createSound({
                    id: 'hitting_the_rain_fence',
                    url: 'sounds/objects/hitting_the_rain_fence.mp3',
                    volume:50
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
                let killing =  soundManager.createSound({
                    id: 'killing',
                    url: 'sounds/objects/killing.mp3'
                });
                // ------------------------------------------------

                // --------------- Random Ambient -----------------
                let ghost_in_the_house =  soundManager.createSound({
                    id: 'ghost_in_the_house',
                    url: 'sounds/ambient/ghost_in_the_house.mp3'
                });
                let just_horror_ambient =  soundManager.createSound({
                    id: 'just_horror_ambient',
                    url: 'sounds/ambient/just_horror_ambient.mp3'
                });
                let weird_noises =  soundManager.createSound({
                    id: 'weird_noises',
                    url: 'sounds/ambient/weird_noises.mp3'
                });
                let scary_piano =  soundManager.createSound({
                    id: 'scary_piano',
                    url: 'sounds/ambient/scary_piano.mp3'
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
        this.sound_end = false;
        soundManager.play(sound_id,{
            multiShotEvents: true,
            onfinish: ()=> {
                this.sound_end = true;
            }
        });
    };

    makeObjSound(sound_id) {
        self = this;
        self.obj_sound_end = false;
        soundManager.play(sound_id,{
            multiShotEvents: true,
            onfinish: ()=> {
                self.obj_sound_end = true;
            }
        });
    };

    playNoise(noise_num) {
        this.noises_end = false;
        soundManager.play(this.noises[noise_num],{
            multiShotEvents: true,
            onfinish: ()=> {
                this.noises_end = true;
            }
        });
    };
}
