import { Shape } from '../entities/Shape';
import type { Specification } from './Specification';

export class ByDistanceFromOriginRangeSpecification<T extends Shape> implements Specification<T> {
  constructor(private readonly min: number, private readonly max: number) {}

  public isSatisfiedBy(candidate: T): boolean {
    const p = candidate.getFirstPoint();
    const z = p.z ?? 0;
    const distance = Math.sqrt(p.x * p.x + p.y * p.y + z * z);
    return distance >= this.min && distance <= this.max;
  }
}


