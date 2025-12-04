import { Shape } from '../entities/Shape';
import type { Specification } from './Specification';

export class ByFirstQuadrantSpecification<T extends Shape> implements Specification<T> {
  public isSatisfiedBy(candidate: T): boolean {
    const p = candidate.getFirstPoint();
    return p.x >= 0 && p.y >= 0 && (p.z ?? 0) >= 0;
  }
}


