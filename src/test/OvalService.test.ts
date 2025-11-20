import { Point } from '../entities/Point';
import { Oval } from '../entities/Oval';
import { OvalService } from '../services/OvalService';

describe('OvalService', () => {
  const oval = new Oval({
    id: 'o1',
    point1: new Point({ id: 'p1', x: 0, y: 0 }),
    point2: new Point({ id: 'p2', x: 2, y: 2 }),
  });

  test('calculates area', () => {
    const area = OvalService.area(oval);
    expect(area).toBeCloseTo(Math.PI);
    expect(area).toBeGreaterThan(0);
  });

  test('calculates perimeter', () => {
    const perim = OvalService.perimeter(oval);
    expect(perim).toBeGreaterThan(0);
  });

  test('detects circle', () => {
    expect(OvalService.isCircle(oval)).toBe(true);
  });
});
