import { Pyramid } from '../entities/Pyramid';
import { Point } from '../entities/Point';
import { InvalidDataError } from '../validators/InvalidDataError';

export class PyramidFactory {
  public static createFromLine(id: string, line: string): Pyramid {
    const parts = line.trim().split(/\s+/).map(Number);

    if (parts.length !== 15 || parts.some(isNaN)) {
      throw new InvalidDataError();
    }

    const basePoints = [
      new Point({ id: `${id}-b1`, x: parts[0], y: parts[1], z: parts[2] }),
      new Point({ id: `${id}-b2`, x: parts[3], y: parts[4], z: parts[5] }),
      new Point({ id: `${id}-b3`, x: parts[6], y: parts[7], z: parts[8] }),
      new Point({ id: `${id}-b4`, x: parts[9], y: parts[10], z: parts[11] }),
    ];

    const apex = new Point({
      id: `${id}-apex`,
      x: parts[12],
      y: parts[13],
      z: parts[14],
    });

    return new Pyramid({ id, basePoints, apex });
  }
}
