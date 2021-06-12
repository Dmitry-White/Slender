class Bitmap {
  height: number;

  width: number;

  image: HTMLImageElement;

  constructor(src: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = src;
  }
}

export default Bitmap;
