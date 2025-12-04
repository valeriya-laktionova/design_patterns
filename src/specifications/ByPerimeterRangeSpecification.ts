import type { Specification } from './Specification';

export class ByPerimeterRangeSpecification<T> implements Specification<T> {
  constructor(
    private readonly perimeterFn: (shape: T) => number,
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(candidate: T): boolean {
    const value = this.perimeterFn(candidate);
    return value >= this.min && value <= this.max;
  }
}


