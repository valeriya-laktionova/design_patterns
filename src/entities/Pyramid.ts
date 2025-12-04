import { Point } from './Point';
import type { Shape } from './Shape';

export interface IPyramidProps {
  id: string;
  basePoints: Point[];
  apex: Point;
}

export class Pyramid implements Shape {
  public readonly id: string;
  public readonly basePoints: Point[];
  public readonly apex: Point;
  public readonly name?: string;

  constructor(props: IPyramidProps) {
    this.id = props.id;
    this.basePoints = props.basePoints;
    this.apex = props.apex;
    this.name = (props as Partial<IPyramidProps & { name?: string }>).name;
  }

  public getFirstPoint(): Point {
    return this.basePoints[0];
  }
}
