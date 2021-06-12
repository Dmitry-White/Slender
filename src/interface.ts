const enum SlideMap {
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

export { SlideMap, SlideConfig };
