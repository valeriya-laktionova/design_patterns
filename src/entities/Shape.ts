import { Point } from './Point';

export interface Shape {
  id: string;
  name?: string;
  getFirstPoint(): Point;
}

