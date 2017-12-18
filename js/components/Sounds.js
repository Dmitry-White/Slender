export class Sounds{
    constructor() {
        this.sound_end = true;
        this.ending = {
            0: 'come_out',
            1: 'lululala'
        };
        soundManager.setup({
            url: './soundmanager2/',
            onready: () => {
                // ------------------ Menu ------------------------
                const piano_menu_ambient =  soundManager.createSound({
                    id: 'piano_menu_ambient',
                    url: 'sounds/ambient/piano_menu_ambient.mp3'
                });
                const static_menu_ambient =  soundManager.createSound({
                    id: 'static_menu_ambient',
                    url: 'sounds/ambient/static_menu_ambient.mp3',
                    volume: 50,
                });
                const slender_logo_hover =  soundManager.createSound({
                    id: 'slender_logo_hover',
                    url: 'sounds/menu/slender_logo_hover.mp3'
                });
                const play_button_hover =  soundManager.createSound({
                    id: 'play_button_hover',
                    url: 'sounds/menu/play_button_hover.mp3'
                });
                const ho_ho_ho =  soundManager.createSound({
                    id: 'ho_ho_ho',
                    url: 'sounds/menu/ho_ho_ho.mp3'
                });
                const about_us =  soundManager.createSound({
                    id: 'about_us',
                    url: 'sounds/menu/about_us.mp3'
                });
                const about_game =  soundManager.createSound({
                    id: 'about_game',
                    url: 'sounds/menu/about_game.mp3'
                });
                // ------------------------------------------------

                // --------------- Winter Mode --------------------
                const wind_ambient =  soundManager.createSound({
                    id: 'wind_ambient',
                    url: 'sounds/ambient/wind_ambient.mp3'
                });
                const forward_step =  soundManager.createSound({
                    id: 'forward_step',
                    url: 'sounds/walking/forward_step.mp3'
                });
                const backward_step =  soundManager.createSound({
                    id: 'backward_step',
                    url: 'sounds/walking/backward_step.mp3'
                });
                const dodge_step_0 =  soundManager.createSound({
                    id: 'dodge_step_0',
                    url: 'sounds/walking/dodge_step_0.mp3'
                });
                const dodge_step_1 =  soundManager.createSound({
                    id: 'dodge_step_1',
                    url: 'sounds/walking/dodge_step_1.mp3'
                });
                const running =  soundManager.createSound({
                    id: 'running',
                    url: 'sounds/walking/running.mp3'
                });
                // ------------------------------------------------

                // --------------- Vanilla Mode -------------------
                const rain_ambient =  soundManager.createSound({
                    id: 'rain_ambient',
                    url: 'sounds/ambient/rain_ambient.mp3',
                    volume: 80
                });
                const rain_forward_step =  soundManager.createSound({
                    id: 'rain_forward_step',
                    url: 'sounds/walking/rain_forward_step.mp3'
                });
                const rain_backward_step =  soundManager.createSound({
                    id: 'rain_backward_step',
                    url: 'sounds/walking/rain_backward_step.mp3'
                });
                const rain_step =  soundManager.createSound({
                    id: 'rain_step',
                    url: 'sounds/walking/rain_step.mp3'
                });
                const rain_dodge_step_0 =  soundManager.createSound({
                    id: 'rain_dodge_step_0',
                    url: 'sounds/walking/rain_dodge_step_0.mp3'
                });
                const rain_dodge_step_1 =  soundManager.createSound({
                    id: 'rain_dodge_step_1',
                    url: 'sounds/walking/rain_dodge_step_1.mp3'
                });
                const rain_running =  soundManager.createSound({
                    id: 'rain_running',
                    url: 'sounds/walking/rain_running.mp3'
                });
                // ------------------------------------------------

                // ------------------ End Game --------------------
                const ghost_scream =  soundManager.createSound({
                    id: 'ghost_scream',
                    url: 'sounds/ending/ghost_scream.mp3'
                });
                const come_out =  soundManager.createSound({
                    id: 'come_out',
                    url: 'sounds/ending/come_out.mp3'
                });
                const lululala =  soundManager.createSound({
                    id: 'lululala',
                    url: 'sounds/ending/lululala.mp3'
                });
                // ------------------------------------------------

            }
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
                this.obj_sound_end = true
                this.sound_end = true;
            }
        });
    };

    makeEndmode() {
        this.map.light = 2;
        this.mode.param = 20;
        this.mode.drops  = "#f00";
        this.mode.ground = "#f00";
        this.mode.lightning = false;
        this.mode.drops_opacity = 1;
        this.mode.particlesWidth = 10;
        this.mode.particlesHeight = 10;
    };

    playEnding(ending_num) {
        soundManager.play(this.ending[ending_num],{
            onfinish: ()=> {
                location.reload();
            }
        });
    };
};
