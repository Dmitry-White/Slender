function enterFS(intro) {
    if (intro.requestFullscreen) {
        intro.requestFullscreen();
    } else if (intro.mozRequestFullScreen) {
        intro.mozRequestFullScreen();
    } else if (intro.webkitRequestFullscreen) {
        intro.webkitRequestFullscreen();
    }
}

function exitFS(intro) {
    if (intro.exitFullscreen) {
        intro.exitFullscreen();
    } else if (intro.mozExitFullScreen) {
        intro.mozExitFullScreen();
    } else if (intro.webkitExitFullscreen) {
        intro.webkitExitFullscreen();
    }
}

function mouseLock() {
    if (document.body.requestPointerLock) {
        document.body.requestPointerLock();
    } else if (document.body.mozRequestPointerLock) {
        document.body.mozRequestPointerLock();
    } else if (document.body.webkitRequestPointerLock) {
        document.body.webkitRequestPointerLock();
    }
}

function setToWinter(state) {
    state.winter = true;
    state.light = 1;
    state.lightning = false;
    state.lightRange = 5;
    state.shadows = "#fff";
    state.drops = "#fff";
    state.drops_opacity = 1;
    state.drops_amount = 100;
    state.ground = "#fff";
    state.param = 0.5;
    state.particlesWidth = 6;
    state.particlesHeight = 6;
    state.fence_texture = "img/snow/fence_snow.png";
    state.sky_texture = "img/snow/sky_panorama_snow.jpg";
    state.wall_texture = "img/snow/wall_texture_snow.jpg";
};
function setToVanilla(state) {
    state.winter = false;
    state.light = 2;
    state.lightning = true;
    state.lightRange = 5;
    state.shadows = "#000";
    state.drops = "#fff";
    state.drops_opacity = 0.15;
    state.drops_amount = 30;
    state.ground = "#56361f";
    state.param = 0.1;
    state.particlesWidth = 2;
    state.particlesHeight = 20;
    state.sky_texture = "img/rain/rain_sky_panorama.jpg";
    state.fence_texture = "img/rain/rain_fence.jpg";
    state.wall_texture = "img/rain/rain_wall_texture.jpg";
};

function changeAmbient(noises, Calc) {
    if (noises.noises_end) {
        const next = Calc.getRandomInt(0,4)
        noises.playNoises(next);
    }
}

function enableMenuSounds(sounds) {
    sounds.loopSound('piano_menu_ambient');
    sounds.loopSound('static_menu_ambient');

    document.getElementById('play').addEventListener('mouseover', function(e){
        sounds.loopSound("play_button_hover");
    });

    document.getElementById('play').addEventListener('mouseout', function(e){
        soundManager.stop('play_button_hover');
    });

    document.getElementById('logo').addEventListener('mouseover', function(){
        sounds.loopSound("slender_logo_hover");
    });

    document.getElementById('logo').addEventListener('mouseout', function(){
        soundManager.stop('slender_logo_hover');
    });

    document.getElementById('about_us').addEventListener('mouseover', function(){
        sounds.loopSound("about_us");
        soundManager.mute('piano_menu_ambient');
    });

    document.getElementById('about_us').addEventListener('mouseout', function(){
        soundManager.stop('about_us');
        soundManager.unmute('piano_menu_ambient');
    });
    document.getElementById('about_game').addEventListener('mouseover', function(){
        sounds.loopSound("about_game");
        soundManager.mute('piano_menu_ambient');
    });

    document.getElementById('about_game').addEventListener('mouseout', function(){
        soundManager.stop('about_game');
        soundManager.unmute('piano_menu_ambient');
    });
};
