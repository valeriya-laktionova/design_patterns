export interface IPointProps {
  id: string;
  x: number;
  y: number;
  z?: number;
}

export class Point {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly z?: number;

  constructor(props: IPointProps) {
    this.id = props.id;
    this.x = props.x;
    this.y = props.y;
    this.z = props.z;
  }
}
