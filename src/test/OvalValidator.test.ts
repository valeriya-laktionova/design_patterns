import { Point } from '../entities/Point';
import { Oval } from '../entities/Oval';
import { OvalValidator } from '../validators/OvalValidator';

describe('OvalValidator', () => {
  test('points not collinear', () => {
    const p1 = new Point({ id: 'p1', x: 0, y: 0 });
    const p2 = new Point({ id: 'p2', x: 1, y: 1 });
    const oval = new Oval({ id: 'o1', point1: p1, point2: p2 });
    expect(OvalValidator.pointsNotCollinear(oval)).toBe(true);

    const p3 = new Point({ id: 'p3', x: 0, y: 0 });
    const p4 = new Point({ id: 'p4', x: 0, y: 5 });
    const oval2 = new Oval({ id: 'o2', point1: p3, point2: p4 });
    expect(OvalValidator.pointsNotCollinear(oval2)).toBe(false);
  });
});
