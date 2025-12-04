import { Shape } from '../entities/Shape';
import type { Specification } from './Specification';

export class ByIdSpecification<T extends Shape> implements Specification<T> {
  constructor(private readonly id: string) {}

  public isSatisfiedBy(candidate: T): boolean {
    return candidate.id === this.id;
  }
}


