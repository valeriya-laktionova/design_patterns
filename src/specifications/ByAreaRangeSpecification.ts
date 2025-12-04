import type { Specification } from './Specification';

export class ByAreaRangeSpecification<T> implements Specification<T> {
  constructor(
    private readonly areaFn: (shape: T) => number,
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(candidate: T): boolean {
    const value = this.areaFn(candidate);
    return value >= this.min && value <= this.max;
  }
}


