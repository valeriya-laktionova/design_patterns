import type { Specification } from './Specification';

export class ByVolumeRangeSpecification<T> implements Specification<T> {
  constructor(
    private readonly volumeFn: (shape: T) => number,
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(candidate: T): boolean {
    const value = this.volumeFn(candidate);
    return value >= this.min && value <= this.max;
  }
}


