const enum SLIDE_MAP {
  LEFT = 'left',
  RIGHT = 'right',
}

interface ISlider {
  title: HTMLDivElement;
  data: HTMLDivElement;
}

type SlideConfig = {
  [key: string]: ISlider;
};

export { SLIDE_MAP, SlideConfig };
