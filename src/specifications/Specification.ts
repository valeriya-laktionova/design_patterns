export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

export class AndSpecification<T> implements Specification<T> {
  constructor(private readonly left: Specification<T>, private readonly right: Specification<T>) {}

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

export class OrSpecification<T> implements Specification<T> {
  constructor(private readonly left: Specification<T>, private readonly right: Specification<T>) {}

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

export class NotSpecification<T> implements Specification<T> {
  constructor(private readonly spec: Specification<T>) {}

  public isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

export type MetricType = 'area' | 'perimeter' | 'volume';

export class MetricRangeSpecification<T> implements Specification<T> {
  constructor(
    private readonly metricFn: (shape: T) => number,
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(candidate: T): boolean {
    const value = this.metricFn(candidate);
    return value >= this.min && value <= this.max;
  }
}


