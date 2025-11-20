import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';
import { PyramidService } from '../services/PyramidService';

describe('PyramidService', () => {
  const basePoints = [
    new Point({ id: 'b1', x: 0, y: 0, z: 0 }),
    new Point({ id: 'b2', x: 1, y: 0, z: 0 }),
    new Point({ id: 'b3', x: 1, y: 1, z: 0 }),
    new Point({ id: 'b4', x: 0, y: 1, z: 0 }),
  ];
  const apex = new Point({ id: 'apex', x: 0.5, y: 0.5, z: 1 });
  const pyramid = new Pyramid({ id: 'p1', basePoints, apex });

  test('calculates volume', () => {
    const vol = PyramidService.volume(pyramid);
    expect(vol).toBeGreaterThan(0);
    expect(vol).toBeCloseTo(1/3, 2); 
  });

  test('calculates surface area', () => {
    const area = PyramidService.surfaceArea(pyramid);
    expect(area).toBeGreaterThan(0);
  });

  test('checks base on plane', () => {
    expect(PyramidService.isBaseOnPlane(pyramid, 0)).toBe(true);
    expect(PyramidService.isBaseOnPlane(pyramid, 1)).toBe(false);
  });

  test('calculates volume ratio by plane', () => {
    const ratio = PyramidService.volumeRatioByPlane(pyramid, 0.5);
    expect(ratio.below).toBeGreaterThan(0);
    expect(ratio.above).toBeGreaterThan(0);
    expect(ratio.below + ratio.above).toBeCloseTo(PyramidService.volume(pyramid), 5);
  });
});
