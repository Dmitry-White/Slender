export class Noises {
    constructor() {
        this.noises_end = true;
        this.noises = {
            0: 'ghost_in_the_house',
            1: 'just_horror_ambient',
            2: 'weird_noises',
            3: 'scary_piano'
        }
        soundManager.setup({
            url: './soundmanager2/',
            onready: () => {
                // --------------- Random Noises ------------------
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
            }
        });
    }

    playNoises(noise_num) {
        this.noises_end = false;
        soundManager.play(this.noises[noise_num],{
            multiShotEvents: true,
            onfinish: ()=> {
                this.noises_end = true;
            }
        });
    };
}
