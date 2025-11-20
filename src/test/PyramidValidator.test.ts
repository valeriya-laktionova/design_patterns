import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';
import { PyramidValidator } from '../validators/PyramidValidator';

describe('PyramidValidator', () => {
  test('base has 4 points', () => {
    const basePoints = [
      new Point({ id: 'b1', x: 0, y: 0, z: 0 }),
      new Point({ id: 'b2', x: 1, y: 0, z: 0 }),
      new Point({ id: 'b3', x: 1, y: 1, z: 0 }),
      new Point({ id: 'b4', x: 0, y: 1, z: 0 }),
    ];
    const apex = new Point({ id: 'apex', x: 0.5, y: 0.5, z: 1 });
    const pyramid = new Pyramid({ id: 'p1', basePoints, apex });
    expect(PyramidValidator.isValid(pyramid)).toBe(true);

    const pyramid2 = new Pyramid({ id: 'p2', basePoints: basePoints.slice(0,3), apex });
    expect(PyramidValidator.isValid(pyramid2)).toBe(false);
  });
});
