import { Point } from './Point';

export interface IOvalProps {
  id: string;
  point1: Point;
  point2: Point;
}

export class Oval {
  public readonly id: string;
  public readonly point1: Point;
  public readonly point2: Point;

  constructor(props: IOvalProps) {
    this.id = props.id;
    this.point1 = props.point1;
    this.point2 = props.point2;
  }
}
