class Paper {
  color: string;

  x: number;

  y: number;

  height: number;

  width: number;

  texture: any;

  constructor(x: number, y: number, texture: any) {
    this.color = '#fff';
    this.x = x;
    this.y = y;
    this.height = 0.2;
    this.width = 0.2;
    this.texture = texture;
  }
}

export default Paper;
