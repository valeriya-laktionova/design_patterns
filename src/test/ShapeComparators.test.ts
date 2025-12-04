import { Point } from '../entities/Point';
import { Oval } from '../entities/Oval';
import {
  sortByFirstPointX,
  sortByFirstPointY,
  sortById,
  sortByName,
} from '../comparators/ShapeComparators';

describe('ShapeComparators', () => {
  const o1 = new Oval({
    id: '2',
    point1: new Point({ id: 'p1', x: 5, y: 1 }),
    point2: new Point({ id: 'p2', x: 6, y: 2 }),
  });
  (o1 as any).name = 'beta';

  const o2 = new Oval({
    id: '1',
    point1: new Point({ id: 'p3', x: 1, y: 5 }),
    point2: new Point({ id: 'p4', x: 2, y: 6 }),
  });
  (o2 as any).name = 'alpha';

  it('sortById sorts by id', () => {
    const arr = [o1, o2].slice().sort(sortById);
    expect(arr[0]).toBe(o2);
    expect(arr[1]).toBe(o1);
  });

  it('sortByName sorts by name (fallback to id)', () => {
    const arr = [o1, o2].slice().sort(sortByName);
    expect(arr[0]).toBe(o2);
    expect(arr[1]).toBe(o1);
  });

  it('sortByFirstPointX sorts by first point X coordinate', () => {
    const arr = [o1, o2].slice().sort(sortByFirstPointX);
    expect(arr[0]).toBe(o2);
    expect(arr[1]).toBe(o1);
  });

  it('sortByFirstPointY sorts by first point Y coordinate', () => {
    const arr = [o1, o2].slice().sort(sortByFirstPointY);
    expect(arr[0]).toBe(o1);
    expect(arr[1]).toBe(o2);
  });
});


