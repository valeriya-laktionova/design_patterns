import { Point } from './Point';

export interface IPyramidProps {
  id: string;
  basePoints: Point[];
  apex: Point;
}

export class Pyramid {
  public readonly id: string;
  public readonly basePoints: Point[];
  public readonly apex: Point;

  constructor(props: IPyramidProps) {
    this.id = props.id;
    this.basePoints = props.basePoints;
    this.apex = props.apex;
  }
}
