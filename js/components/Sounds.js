export class Sounds{
    constructor() {
        soundManager.setup({
            url: './soundmanager2/',
            onready: function() {
                let wind_ambient =  soundManager.createSound({
                    id: 'wind_ambient',
                    url: 'sounds/wind_ambient.mp3'
                });
                let forward_step =  soundManager.createSound({
                    id: 'forward_step',
                    url: 'sounds/forward_step.mp3'
                });
                let backward_step =  soundManager.createSound({
                    id: 'backward_step',
                    url: 'sounds/backward_step.mp3'
                });

                function loopSound(sound) {
                    sound.play({
                        multiShotEvents: true,
                        onfinish: function() {
                            loopSound(sound);
                        }
                    });
                };

                loopSound(wind_ambient);
            },
        });
    };

}
