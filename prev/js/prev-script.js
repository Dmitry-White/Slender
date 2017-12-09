function set_slides(side, dir){
    let val = '50px';
    if (!dir){
        dir = 'out';
        val = 'calc(-40vw - 70px)'
    } else dir = 'over';
    document.querySelector(`.slider-${side} .slider-title`).addEventListener(`mouse${dir}`, function(){
        document.querySelector(`.slider-${side} .slider-data`).style[side] = val;
    });
}

document.addEventListener("DOMContentLoaded", function(){
    set_slides('right',true);
    set_slides('right',false);
    set_slides('left',true);
    set_slides('left',false);
});
