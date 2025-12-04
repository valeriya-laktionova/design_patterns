import { Point } from '../entities/Point';
import { Oval } from '../entities/Oval';
import { Pyramid } from '../entities/Pyramid';
import { ShapeRepository } from '../repository/ShapeRepository';
import { Warehouse } from '../warehouse/Warehouse';

describe('Warehouse singleton and observer integration', () => {
  it('stores and updates metrics when shapes are added and updated', () => {
    const warehouse = Warehouse.getInstance();
    const repo = new ShapeRepository<Oval>();
    repo.attach(warehouse);

    const oval = new Oval({
      id: 'oval-1',
      point1: new Point({ id: 'p1', x: 0, y: 0 }),
      point2: new Point({ id: 'p2', x: 4, y: 2 }),
    });

    repo.add(oval);
    const initialMetrics = warehouse.getMetrics('oval-1');
    expect(initialMetrics).toBeDefined();
    expect(initialMetrics?.area).toBeGreaterThan(0);
    expect(initialMetrics?.perimeter).toBeGreaterThan(0);

    const updatedOval = new Oval({
      id: 'oval-1',
      point1: new Point({ id: 'p1', x: 0, y: 0 }),
      point2: new Point({ id: 'p2', x: 8, y: 4 }),
    });
    repo.update(updatedOval);

    const updatedMetrics = warehouse.getMetrics('oval-1');
    expect(updatedMetrics).toBeDefined();
    expect(updatedMetrics?.area).toBeGreaterThan(initialMetrics!.area!);
    expect(updatedMetrics?.perimeter).toBeGreaterThan(initialMetrics!.perimeter!);
  });

  it('stores surface area and volume for pyramids and clears metrics on delete', () => {
    const warehouse = Warehouse.getInstance();
    const repo = new ShapeRepository<Pyramid>();
    repo.attach(warehouse);

    const pyramid = new Pyramid({
      id: 'pyr-1',
      basePoints: [
        new Point({ id: 'b1', x: 0, y: 0, z: 0 }),
        new Point({ id: 'b2', x: 2, y: 0, z: 0 }),
        new Point({ id: 'b3', x: 2, y: 2, z: 0 }),
        new Point({ id: 'b4', x: 0, y: 2, z: 0 }),
      ],
      apex: new Point({ id: 'a1', x: 0, y: 0, z: 3 }),
    });

    repo.add(pyramid);
    const metrics = warehouse.getMetrics('pyr-1');
    expect(metrics).toBeDefined();
    expect(metrics?.area).toBeGreaterThan(0);
    expect(metrics?.volume).toBeGreaterThan(0);

    repo.deleteById('pyr-1');
    expect(warehouse.getMetrics('pyr-1')).toBeUndefined();
  });
});


