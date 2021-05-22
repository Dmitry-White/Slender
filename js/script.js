const checkbox = document.querySelector('#checkbox');
const snowBlock = document.querySelector('.snow');

const snowHandler = () => {
  if (snowBlock.style.display === 'block') snowBlock.style.display = 'none';
  else snowBlock.style.display = 'block';
};

const SLIDE_MAP = {
  LEFT: 'left',
  RIGHT: 'right',
};

const SLIDE_CONFIG = {
  [SLIDE_MAP.LEFT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.LEFT} .slider-data`),
  },
  [SLIDE_MAP.RIGHT]: {
    title: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-title`),
    data: document.querySelector(`.slider-${SLIDE_MAP.RIGHT} .slider-data`),
  },
};

const setSlides = (side, isHovered) => {
  const value = isHovered ? '50px' : 'calc(-40vw - 70px)';
  const direction = isHovered ? 'over' : 'out';

  const mouseMoveHandler = () => {
    SLIDE_CONFIG[side].data.style[side] = value;
  };

  SLIDE_CONFIG[side].title.addEventListener(
    `mouse${direction}`,
    mouseMoveHandler,
  );
};

const initSlides = () => {
  setSlides(SLIDE_MAP.LEFT, true);
  setSlides(SLIDE_MAP.LEFT, false);
  setSlides(SLIDE_MAP.RIGHT, true);
  setSlides(SLIDE_MAP.RIGHT, false);
};

checkbox.addEventListener('change', snowHandler);
document.addEventListener('DOMContentLoaded', initSlides);
