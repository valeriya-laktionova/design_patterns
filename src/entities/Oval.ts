import { Point } from './Point';
import type { Shape } from './Shape';

export interface IOvalProps {
  id: string;
  point1: Point;
  point2: Point;
}

export class Oval implements Shape {
  public readonly id: string;
  public readonly point1: Point;
  public readonly point2: Point;
  public readonly name?: string;

  constructor(props: IOvalProps) {
    this.id = props.id;
    this.point1 = props.point1;
    this.point2 = props.point2;
    this.name = (props as Partial<IOvalProps & { name?: string }>).name;
  }

  public getFirstPoint(): Point {
    return this.point1;
  }
}
