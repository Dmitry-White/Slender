const checkbox = document.querySelector('#checkbox');
const snowBlock = document.querySelector('.snow');

const snowHandler = () => {
  if (snowBlock.style.display === 'block') snowBlock.style.display = 'none';
  else snowBlock.style.display = 'block';
};

const set_slides = (side, dir) => {
  const slideTitle = document.querySelector(`.slider-${side} .slider-title`);
  const slideData = document.querySelector(`.slider-${side} .slider-data`);

  let val = '50px';
  if (!dir) {
    dir = 'out';
    val = 'calc(-40vw - 70px)';
  } else dir = 'over';

  const mouseMoveHandler = () => (slideData.style[side] = val);

  slideTitle.addEventListener(`mouse${dir}`, mouseMoveHandler);
};

const initSlides = () => {
  set_slides('right', true);
  set_slides('right', false);
  set_slides('left', true);
  set_slides('left', false);
};

checkbox.addEventListener('change', snowHandler);
document.addEventListener('DOMContentLoaded', initSlides);
