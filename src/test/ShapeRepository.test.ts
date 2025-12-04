import { Point } from '../entities/Point';
import { Oval } from '../entities/Oval';
import { Pyramid } from '../entities/Pyramid';
import { ShapeRepository } from '../repository/ShapeRepository';
import { ByIdSpecification } from '../specifications/ByIdSpecification';
import { ByNameSpecification } from '../specifications/ByNameSpecification';
import { ByAreaRangeSpecification } from '../specifications/ByAreaRangeSpecification';
import { ByVolumeRangeSpecification } from '../specifications/ByVolumeRangeSpecification';
import { ByFirstQuadrantSpecification } from '../specifications/ByFirstQuadrantSpecification';
import { ByDistanceFromOriginRangeSpecification } from '../specifications/ByDistanceFromOriginRangeSpecification';
import { sortByFirstPointX, sortById } from '../comparators/ShapeComparators';
import { OvalService } from '../services/OvalService';
import { PyramidService } from '../services/PyramidService';

describe('ShapeRepository with specifications and comparators', () => {
  const p0 = new Point({ id: 'p0', x: 0, y: 0 });
  const p1 = new Point({ id: 'p1', x: 2, y: 2 });
  const p2 = new Point({ id: 'p2', x: -3, y: -3 });

  const oval1 = new Oval({ id: '1', point1: p0, point2: p1 });
  const oval2 = new Oval({ id: '2', point1: p2, point2: p1 });

  const pyramid1 = new Pyramid({
    id: '3',
    basePoints: [
      new Point({ id: 'b1', x: 0, y: 0, z: 0 }),
      new Point({ id: 'b2', x: 1, y: 0, z: 0 }),
      new Point({ id: 'b3', x: 1, y: 1, z: 0 }),
      new Point({ id: 'b4', x: 0, y: 1, z: 0 }),
    ],
    apex: new Point({ id: 'a1', x: 0, y: 0, z: 1 }),
  });

  it('supports add, findById, update and deleteById', () => {
    const repo = new ShapeRepository<Oval>();
    repo.add(oval1);
    expect(repo.findById('1')).toBe(oval1);

    const updated = new Oval({ id: '1', point1: p1, point2: p0 });
    expect(repo.update(updated)).toBe(true);
    expect(repo.findById('1')).toBe(updated);

    expect(repo.deleteById('1')).toBe(true);
    expect(repo.findById('1')).toBeUndefined();
  });

  it('filters by IdSpecification and NameSpecification', () => {
    const namedOval = new Oval({ id: '10', point1: p0, point2: p1 } as any);
    (namedOval as any).name = 'named';

    const repo = new ShapeRepository<Oval>();
    repo.addMany([oval1, oval2, namedOval]);

    const byId = repo.findAll(new ByIdSpecification<Oval>('2'));
    expect(byId).toHaveLength(1);
    expect(byId[0]).toBe(oval2);

    const byName = repo.findAll(new ByNameSpecification<Oval>('named'));
    expect(byName).toHaveLength(1);
    expect(byName[0]).toBe(namedOval);
  });

  it('filters by metric range (area)', () => {
    const ovalRepo = new ShapeRepository<Oval>();
    ovalRepo.addMany([oval1, oval2]);

    const areaSpec = new ByAreaRangeSpecification(
      (o: Oval) => OvalService.area(o),
      0,
      OvalService.area(oval1) * 1.1,
    );
    const byArea = ovalRepo.findAll(areaSpec as any);
    expect(byArea.some((s) => s.id === '1')).toBe(true);
  });

  it('filters by metric range (volume)', () => {
    const pyramidRepo = new ShapeRepository<Pyramid>();
    pyramidRepo.add(pyramid1);

    const volSpec = new ByVolumeRangeSpecification(
      (p: Pyramid) => PyramidService.volume(p),
      0,
      PyramidService.volume(pyramid1) * 1.1,
    );
    const byVolume = pyramidRepo.findAll(volSpec as any);
    expect(byVolume.some((s) => s.id === '3')).toBe(true);
  });

  it('filters by first-quadrant rule', () => {
    const repo = new ShapeRepository<Oval>();
    repo.addMany([oval1, oval2]);

    const firstQuadrant = new ByFirstQuadrantSpecification<Oval>();
    const result = repo.findAll(firstQuadrant);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(oval1);
  });

  it('filters by distance from origin range (using first point)', () => {
    const repo = new ShapeRepository<Oval>();
    repo.addMany([oval1, oval2]);

    const nearOrigin = new ByDistanceFromOriginRangeSpecification<Oval>(0, 1);
    const farFromOrigin = new ByDistanceFromOriginRangeSpecification<Oval>(4, 10);

    const near = repo.findAll(nearOrigin);
    const far = repo.findAll(farFromOrigin);

    expect(near.some((s) => s.id === '1')).toBe(true);
    expect(near.some((s) => s.id === '2')).toBe(false);

    expect(far.some((s) => s.id === '2')).toBe(true);
    expect(far.some((s) => s.id === '1')).toBe(false);
  });

  it('sorts by id and first point X coordinate', () => {
    const repo = new ShapeRepository<Oval>();
    repo.addMany([oval2, oval1]);

    const byId = repo.findAll(undefined, sortById);
    expect(byId[0].id).toBe('1');
    expect(byId[1].id).toBe('2');

    const byX = repo.findAll(undefined, sortByFirstPointX);
    expect(byX[0]).toBe(oval2);
    expect(byX[1]).toBe(oval1);
  });
});


