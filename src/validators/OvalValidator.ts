import { Oval } from '../entities/Oval';

export class OvalValidator {
  static pointsNotCollinear(oval: Oval): boolean {
    const { point1, point2 } = oval;
    if (point1.x === point2.x) return false;
    if (point1.y === point2.y) return false;
    return true;
  }
}

