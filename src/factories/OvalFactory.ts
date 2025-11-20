import { Oval } from '../entities/Oval';
import { Point } from '../entities/Point';
import { InvalidDataError } from '../validators/InvalidDataError';

export class OvalFactory {
  public static createFromLine(id: string, line: string): Oval {
    const parts = line.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some((n) => isNaN(n))) throw new InvalidDataError();
    const p1 = new Point({ id: `${id}-p1`, x: parts[0], y: parts[1] });
    const p2 = new Point({ id: `${id}-p2`, x: parts[2], y: parts[3] });
    return new Oval({ id, point1: p1, point2: p2 });
  }
}
