export class Sounds{
    constructor(map="", loop="", state="") {
        this.map = map;
        this.loop = loop;
        this.state = state;
        this.sound_end = true;
        this.obj_sound_end = true;
        this.noises_end = true;
        this.noises = {
            0: 'ghost_in_the_house',
            1: 'just_horror_ambient',
            2: 'weird_noises',
            3: 'scary_piano'
        }
        this.ending = {
            0: 'come_out',
            1: 'lululala'
        }
        soundManager.setup({
            url: './soundmanager2/',
            onready: function() {
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
                    volume: 70
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
                    url: 'sounds/objects/placing_loo_paper.mp3'
                });
                const placing_bomb =  soundManager.createSound({
                    id: 'placing_bomb',
                    url: 'sounds/objects/placing_bomb.mp3'
                });
                const killing =  soundManager.createSound({
                    id: 'killing',
                    url: 'sounds/objects/killing.mp3'
                });
                // ------------------------------------------------

                // --------------- Random Ambient -----------------
                const ghost_in_the_house =  soundManager.createSound({
                    id: 'ghost_in_the_house',
                    url: 'sounds/ambient/ghost_in_the_house.mp3'
                });
                const just_horror_ambient =  soundManager.createSound({
                    id: 'just_horror_ambient',
                    url: 'sounds/ambient/just_horror_ambient.mp3'
                });
                const weird_noises =  soundManager.createSound({
                    id: 'weird_noises',
                    url: 'sounds/ambient/weird_noises.mp3'
                });
                const scary_piano =  soundManager.createSound({
                    id: 'scary_piano',
                    url: 'sounds/ambient/scary_piano.mp3'
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
                this.checkGameEnding();
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
    playNoises(noise_num) {
        this.noises_end = false;
        soundManager.play(this.noises[noise_num],{
            multiShotEvents: true,
            onfinish: ()=> {
                this.noises_end = true;
            }
        });
    };

    checkGameEnding() {
        if (this.map.people === 0) {
            this.makeEndState();
            soundManager.play("ghost_scream",{
                onfinish: () => {
                    this.loop.game_ending = true;
                }
            });
        }
    }

    makeEndState() {
        this.map.light = 2;
        this.state.param = 20;
        this.state.drops  = "#f00";
        this.state.ground = "#f00";
        this.state.lightning = false;
        this.state.drops_opacity = 1;
        this.state.particlesWidth = 10;
        this.state.particlesHeight = 10;
    }

    playEnding(ending_num) {
        soundManager.play(this.ending[ending_num],{
            onfinish: ()=> {
                location.reload();
            }
        });
    };
}
